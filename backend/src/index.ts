import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import progressRoutes from "./routes/progress.routes";
import classRoutes from "./routes/class.routes";
import schoolRoutes from "./routes/school.routes";
import prisma from "./config/prisma";
import { authenticate } from "./middleware/auth";
import * as aiController from "./controllers/ai.controller";
import { generateSocraticResponse } from "./services/ai.service";
import { isMessageForbidden } from "./services/filter.service";

// Create a new chat session (wrapper)
const createChatSession = async (req: any, res: any) => {
  try {
    const { title, subject, topic } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const session = await prisma.chatSession.create({
      data: {
        studentId,
        title: title || "New Chat Session",
        subject,
        topic,
      },
    });

    res.status(201).json({ session });
  } catch (error: any) {
    console.error("Create session failed:", error);
    res.status(500).json({ error: "Failed to create chat session" });
  }
};

// Get all sessions for a student (wrapper)
const getStudentSessions = async (req: any, res: any) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const sessions = await prisma.chatSession.findMany({
      where: { studentId },
      include: {
        chatHistories: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { lastAccessedAt: "desc" },
    });

    res.json({ sessions });
  } catch (error: any) {
    console.error("Get sessions failed:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Get session details (wrapper)
const getSessionDetails = async (req: any, res: any) => {
  try {
    const sessionId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const session = await prisma.chatSession.findUnique({
      where: { sessionId },
      include: { chatHistories: { orderBy: { createdAt: "asc" } } },
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json({ session });
  } catch (error: any) {
    console.error("Get session details failed:", error);
    res.status(500).json({ error: "Failed to fetch session details" });
  }
};

// Delete a chat session (wrapper)
const deleteChatSession = async (req: any, res: any) => {
  try {
    const sessionId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const session = await prisma.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    // Delete the session using the correct field
    await prisma.chatSession.delete({
      where: { sessionId },
    });

    res.json({ message: "Session deleted successfully" });
  } catch (error: any) {
    console.error("Delete session failed:", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};

// Chat wrapper - inline logic
const chatWrapper = async (req: any, res: any) => {
  console.log("[WRAPPER] START");
  try {
    console.log("[WRAPPER] Inlining chat logic");
    const { sessionId, message } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    if (!sessionId || !message) {
      res.status(400).json({ error: "sessionId and message are required" });
      return;
    }

    console.log("[WRAPPER] Checking session");
    // Verify session belongs to student
    const session = await prisma.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    console.log("[WRAPPER] Checking forbidden");
    // 1. Prohibited Topic Filter
    const isForbidden = await isMessageForbidden(message);
    if (isForbidden) {
      res.status(403).json({ error: "Message contains prohibited content" });
      return;
    }

    console.log("[WRAPPER] Saving user message");
    // Save user message (use session.id as foreign key)
    await prisma.chatHistory.create({
      data: {
        sessionId: session.id,
        studentId,
        message,
        sender: "USER",
      },
    });

    console.log("[WRAPPER] Generating response");
    // 2. Generate Socratic Response
    const { response: aiResponse, model } = await generateSocraticResponse(
      message,
      sessionId,
    );

    console.log("[WRAPPER] Generated response, length:", aiResponse.length);

    // Save AI response (use session.id as foreign key)
    await prisma.chatHistory.create({
      data: {
        sessionId: session.id,
        studentId,
        message: aiResponse,
        sender: "AI",
        modelUsed: model,
      },
    });

    // Update session last accessed time
    await prisma.chatSession.update({
      where: { sessionId },
      data: { lastAccessedAt: new Date() },
    });

    console.log("[WRAPPER] Sending response");
    res.json({
      response: aiResponse,
      modelUsed: model,
      sessionId,
    });
  } catch (error: any) {
    console.log(
      "[WRAPPER] ERROR CAUGHT:",
      error?.message || JSON.stringify(error),
    );
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || "Chat failed" });
    }
  }
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const startedAt = Date.now();
  const requestBody = ["POST", "PUT", "PATCH"].includes(req.method)
    ? req.body
    : undefined;

  console.log(
    `[${new Date().toISOString()}] -> ${req.method} ${req.originalUrl}`,
  );
  if (requestBody !== undefined) {
    console.log("Body:", requestBody);
  }

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    console.log(
      `[${new Date().toISOString()}] <- ${req.method} ${req.originalUrl} ${res.statusCode} (${durationMs}ms)`,
    );
  });

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/users", userRoutes);
app.use("/api/progress", progressRoutes);

// Logging middleware for chat endpoint
const logChatEndpoint = (req: any, res: any, next: any) => {
  console.log("[LOG-CHAT-ENDPOINT] Called");
  next();
};

// AI endpoints (direct registration with wrapper functions)
app.post("/api/ai/sessions", authenticate, createChatSession);
app.get("/api/ai/sessions", authenticate, getStudentSessions);
app.get("/api/ai/sessions/:sessionId", authenticate, getSessionDetails);
app.delete("/api/ai/sessions/:sessionId", authenticate, deleteChatSession);
app.post("/api/ai/chat", logChatEndpoint, authenticate, chatWrapper);
app.post("/api/ai/mental-health", authenticate, aiController.checkMentalHealth);

// Direct test route
app.get("/api/ai-direct-test", authenticate, (req: any, res: any) => {
  res.json({ message: "Direct AI test route works!", userId: req.user?.id });
});

// Debug OpenRouter API test
app.post("/api/debug-openrouter", async (req: any, res: any) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl =
    process.env.OPENROUTER_BASE_URL || "https://api.openrouter.ai/api/v1";

  console.log("[DEBUG] Testing OpenRouter API...");
  console.log("[DEBUG] API Key exists:", !!apiKey);
  console.log("[DEBUG] Base URL:", baseUrl);

  if (!apiKey) {
    return res.status(400).json({ error: "OPENROUTER_API_KEY not configured" });
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Online Education Platform",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello, how are you?" },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    console.log(
      "[DEBUG] Response status:",
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[DEBUG] API Error:", errorText);
      return res
        .status(response.status)
        .json({ error: errorText, status: response.status });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "No response";
    console.log("[DEBUG] Success! Response:", aiResponse.substring(0, 100));

    return res.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error("[DEBUG] Error:", error);
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.use("/api/classes", classRoutes);
app.use("/api/schools", schoolRoutes);
app.get("/users/uuid-by-email", async (req, res) => {
  const email =
    typeof req.query.email === "string" ? req.query.email.trim() : "";

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  const student = await prisma.user.findFirst({
    where: { email, role: "STUDENT" },
    select: { id: true },
  });

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json({ id: student.id });
});

app.get("/api/users/uuid-by-email", async (req, res) => {
  const email =
    typeof req.query.email === "string" ? req.query.email.trim() : "";

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  const student = await prisma.user.findFirst({
    where: { email, role: "STUDENT" },
    select: { id: true },
  });

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json({ id: student.id });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Fallback API response",
    method: req.method,
    path: req.originalUrl,
  });
});

const server = app.listen(port, () => {
  console.log("Server is running on port " + port);
});

export default app;
