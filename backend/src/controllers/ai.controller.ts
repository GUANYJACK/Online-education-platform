import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { generateSocraticResponse, getConversationHistory } from '../services/ai.service';
import { isMessageForbidden } from '../services/filter.service';
import prisma from '../config/prisma';

// Create a new chat session
export const createChatSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, subject, topic } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const session = await prisma.chatSession.create({
      data: {
        studentId,
        title: title || 'New Chat Session',
        subject,
        topic
      }
    });

    res.status(201).json({ session });
  } catch (error: any) {
    console.error('Create session failed:', error);
    res.status(500).json({ error: 'Failed to create chat session' });
  }
};

// Get all sessions for a student
export const getStudentSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const sessions = await prisma.chatSession.findMany({
      where: { studentId },
      include: {
        chatHistories: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { lastAccessedAt: 'desc' }
    });

    res.json({ sessions });
  } catch (error: any) {
    console.error('Get sessions failed:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

// Get session details with conversation history
export const getSessionDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sessionId = Array.isArray(req.params.sessionId) 
      ? req.params.sessionId[0] 
      : req.params.sessionId;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { chatHistories: { orderBy: { createdAt: 'asc' } } }
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    res.json({ session });
  } catch (error: any) {
    console.error('Get session details failed:', error);
    res.status(500).json({ error: 'Failed to fetch session details' });
  }
};

// Send message in a chat session with memory
export const chat = async (req: AuthRequest, res: Response): Promise<void> => {
  console.warn('[CHAT] WARNING LOG - Handler starting');
  console.error('[CHAT] ERROR LOG - Handler starting');
  try {
    console.warn('[CHAT] In try block');
    const { sessionId, message } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    if (!sessionId || !message) {
      res.status(400).json({ error: 'sessionId and message are required' });
      return;
    }

    // Verify session belongs to student
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId }
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    // 1. Prohibited Topic Filter
    console.warn('[CHAT] About to check forbidden');
    const isForbidden = await isMessageForbidden(message);
    if (isForbidden) {
      res.status(403).json({ error: 'Message contains prohibited content and has been blocked.' });
      return;
    }

    // Save user message
    console.warn('[CHAT] About to save user message');
    await prisma.chatHistory.create({
      data: {
        sessionId,
        studentId,
        message,
        sender: 'USER'
      }
    });
    
    console.warn('[CHAT] About to generate Socratic response');

    // 2. Generate Socratic Response using conversation history
    const { response: aiResponse, model } = await generateSocraticResponse(message, sessionId);
    
    console.warn('[CHAT] Generated response');

    // Save AI response
    await prisma.chatHistory.create({
      data: {
        sessionId,
        studentId,
        message: aiResponse,
        sender: 'AI',
        modelUsed: model
      }
    });

    // Update session last accessed time
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { lastAccessedAt: new Date() }
    });

    console.warn('[CHAT] About to send response');
    res.json({
      response: aiResponse,
      modelUsed: model,
      sessionId
    });
  } catch (error: any) {
    console.log('[CHAT] ===== CAUGHT ERROR IN CATCH BLOCK =====');
    console.error('[CHAT] Full error object:', error);
    console.error('[CHAT] Error message:', error?.message);
    console.error('[CHAT] Error stack:', error?.stack);
    res.status(500).json({ error: error?.message || 'AI processing failed' });
  }
};

// Delete a chat session
export const deleteChatSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sessionId = Array.isArray(req.params.sessionId) 
      ? req.params.sessionId[0] 
      : req.params.sessionId;
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId }
    });

    if (!session || session.studentId !== studentId) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    await prisma.chatSession.delete({
      where: { id: sessionId }
    });

    res.json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    console.error('Delete session failed:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

export const checkMentalHealth = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Placeholder mental health analysis - in MVP we return a safe default
    res.json({ emotionPolarity: 'NEUTRAL', riskLevel: 'LOW', keywords: [] });
  } catch (error: any) {
    res.status(500).json({ error: 'Mental health check failed' });
  }
};
