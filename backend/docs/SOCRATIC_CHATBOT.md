# Socratic Chatbot API - Session-Based Memory System

## Overview

The Socratic Chatbot is a session-based conversational AI tutor that maintains conversation context across multiple messages. It uses OpenRouter API (configurable) to provide Socratic method-based tutoring responses.

### Key Features

- **Session Management**: Create and manage separate conversation sessions
- **Conversation Memory**: Maintains last 10 messages for context-aware responses
- **Socratic Teaching**: Asks clarifying questions to guide learning
- **Content Filtering**: Filters prohibited topics automatically
- **Multi-Model Support**: Configurable AI model routing (OpenRouter, Claude, OpenAI, DeepSeek)

---

## API Endpoints

### 1. Create Chat Session

Create a new conversation session for a student.

**Endpoint:** `POST /api/ai/sessions`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Math Algebra Help",
  "subject": "Mathematics",
  "topic": "Quadratic Equations"
}
```

**Response (201 Created):**
```json
{
  "session": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "sessionId": "uuid-string",
    "studentId": "student-id",
    "title": "Math Algebra Help",
    "subject": "Mathematics",
    "topic": "Quadratic Equations",
    "createdAt": "2026-05-25T10:30:00Z",
    "updatedAt": "2026-05-25T10:30:00Z"
  }
}
```

---

### 2. Get All Student Sessions

Retrieve all chat sessions for the authenticated student.

**Endpoint:** `GET /api/ai/sessions`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "sessions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sessionId": "uuid-string",
      "studentId": "student-id",
      "title": "Math Algebra Help",
      "subject": "Mathematics",
      "topic": "Quadratic Equations",
      "createdAt": "2026-05-25T10:30:00Z",
      "lastAccessedAt": "2026-05-25T11:45:00Z",
      "chatHistories": [
        {
          "id": "msg-id",
          "message": "What is a quadratic equation?",
          "sender": "USER",
          "createdAt": "2026-05-25T11:45:00Z"
        }
      ]
    }
  ]
}
```

---

### 3. Get Session Details with History

Retrieve full conversation history for a specific session.

**Endpoint:** `GET /api/ai/sessions/:sessionId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "session": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "sessionId": "uuid-string",
    "studentId": "student-id",
    "title": "Math Algebra Help",
    "subject": "Mathematics",
    "topic": "Quadratic Equations",
    "createdAt": "2026-05-25T10:30:00Z",
    "lastAccessedAt": "2026-05-25T11:45:00Z",
    "chatHistories": [
      {
        "id": "msg-1",
        "message": "What is a quadratic equation?",
        "sender": "USER",
        "createdAt": "2026-05-25T10:31:00Z"
      },
      {
        "id": "msg-2",
        "message": "Great question! Think about what makes an equation 'quadratic'. What do you notice about equations with x²?",
        "sender": "AI",
        "modelUsed": "gpt-4o-mini",
        "createdAt": "2026-05-25T10:32:00Z"
      },
      {
        "id": "msg-3",
        "message": "It has x squared as the highest power?",
        "sender": "USER",
        "createdAt": "2026-05-25T10:33:00Z"
      },
      {
        "id": "msg-4",
        "message": "Exactly! And what about the general form? Can you think of how we'd write that mathematically?",
        "sender": "AI",
        "modelUsed": "gpt-4o-mini",
        "createdAt": "2026-05-25T10:34:00Z"
      }
    ]
  }
}
```

---

### 4. Send Message in Session (With Memory)

Send a user message to the chatbot. The system automatically includes the last 10 messages as context.

**Endpoint:** `POST /api/ai/chat`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "So the general form is ax² + bx + c = 0?"
}
```

**Response (200 OK):**
```json
{
  "response": "Perfect! You've got it. Now, what do you think 'a', 'b', and 'c' represent in that equation? Can you give me an example with real numbers?",
  "modelUsed": "gpt-4o-mini",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Responses:**

```json
// 403 Forbidden - Prohibited content
{
  "error": "Message contains prohibited content and has been blocked."
}

// 404 Not Found - Session doesn't exist
{
  "error": "Session not found"
}

// 400 Bad Request - Missing required fields
{
  "error": "sessionId and message are required"
}

// 500 Internal Server Error - AI API failed
{
  "error": "AI processing failed"
}
```

---

### 5. Delete Chat Session

Delete a chat session and all its messages.

**Endpoint:** `DELETE /api/ai/sessions/:sessionId`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "message": "Session deleted successfully"
}
```

---

## Data Models

### ChatSession
```typescript
{
  id: string;                    // Unique database ID
  sessionId: string;             // Human-readable session identifier
  studentId: string;             // Student who owns this session
  title: string;                 // Session title (e.g., "Algebra Help")
  subject?: string;              // Subject area (e.g., "Mathematics")
  topic?: string;                // Specific topic (e.g., "Quadratic Equations")
  chatHistories: ChatHistory[];  // Array of messages
  createdAt: DateTime;           // Session creation time
  updatedAt: DateTime;           // Last updated time
  lastAccessedAt: DateTime;      // Last message timestamp
}
```

### ChatHistory
```typescript
{
  id: string;        // Message ID
  sessionId: string; // Associated session
  studentId: string; // Student who sent/received
  message: string;   // Message content
  sender: string;    // "USER" or "AI"
  modelUsed?: string;// AI model that generated response
  createdAt: DateTime;
}
```

---

## Configuration

### Environment Variables

```bash
# AI Model Configuration
DEFAULT_AI_MODEL="gpt-4o-mini"

# OpenRouter (Primary provider)
OPENROUTER_API_KEY="sk-or-v1-..."
OPENROUTER_BASE_URL="https://api.openrouter.ai"
OPENROUTER_SOCRATIC_MODEL="gpt-4o-mini"

# Enable mental health analysis (optional)
ENABLE_OPENROUTER_MENTAL="true"
```

### Supported Models

- **gpt-4o-mini** (via OpenRouter) - Default, cost-effective
- **gpt-4o** (via OpenRouter) - More powerful
- **claude-3-sonnet** (via OpenRouter) - Alternative
- Custom models available through OpenRouter

---

## How Memory Works

### Context Window
- **Window Size**: Last 10 messages per session
- **Update Frequency**: Real-time after each message
- **Scope**: Per conversation session

### Example Conversation Flow

```
Student: "What is x if x² + 5x + 6 = 0?"
  ↓ (sent to AI with 0 context messages)
AI:     "Great! Let's think about this together. 
         What's a good way to solve quadratic equations?"

Student: "Factoring?"
  ↓ (sent to AI with context of previous 2 messages)
AI:     "Good thinking! Can you try to factor x² + 5x + 6? 
         What two numbers multiply to 6 and add to 5?"

Student: "2 and 3!"
  ↓ (sent to AI with context of previous 4 messages)
AI:     "Excellent! So the factors are (x+2)(x+3) = 0. 
         What are the solutions for x?"
```

---

## Use Cases

### 1. Homework Help
- Students create sessions by subject/topic
- Ask questions about specific problems
- Receive Socratic guidance rather than direct answers

### 2. Concept Review
- Create sessions for reviewing chapters
- Maintain conversation context across Q&A
- Review past sessions for learning progress

### 3. Practice Sessions
- Create timed practice sessions
- Work through multiple problems with context
- Delete when complete

---

## Error Handling

### Content Filtering
If a message contains prohibited keywords, it's rejected:
```json
{
  "error": "Message contains prohibited content and has been blocked."
}
```

### Session Not Found
If the sessionId doesn't belong to the student:
```json
{
  "error": "Session not found"
}
```

### AI API Failures
If OpenRouter API fails:
```json
{
  "error": "AI processing failed"
}
```

---

## Best Practices

1. **Create sessions by topic**: Helps organize learning
2. **Reuse sessions**: Keep related questions in same session for better context
3. **Review conversation history**: Use GET endpoint to review learning
4. **Delete old sessions**: Clean up when done learning a topic

---

## Testing with cURL

### Create Session
```bash
curl -X POST http://localhost:3000/api/ai/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Algebra Practice",
    "subject": "Mathematics",
    "topic": "Quadratic Equations"
  }'
```

### Send Message
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID_HERE",
    "message": "What is a quadratic equation?"
  }'
```

### Get Sessions
```bash
curl -X GET http://localhost:3000/api/ai/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Future Enhancements

- [ ] Mental health sentiment analysis
- [ ] Knowledge point progress tracking integration
- [ ] Session export/save to PDF
- [ ] Multi-language support
- [ ] Custom AI personas (different teaching styles)
- [ ] Real-time typing indicators
- [ ] Message reactions and feedback
