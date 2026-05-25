# Backend API Documentation

Base URL: `http://localhost:3000/api`
https://online-education-platform-backend-kappa.vercel.app/api/

## Authentication

All protected routes require an `Authorization` header with a Bearer token:
`Authorization: Bearer <Your_JWT_Token>`

### 1. Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123",
    "role": "STUDENT" // Available Roles: STUDENT, PARENT, TEACHER, SCHOOL_ADMIN
  }
  ```
- **Success Response**: `201 Created` - `{ "message": "User registered successfully", "userId": "uuid" }`

### 2. Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK` - `{ "token": "jwt-token", "user": { ... } }`

---

## Users

### 1. Get Student UUID by Email
- **URL**: `/users/uuid-by-email?email=student@example.com`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK` - `{ "id": "student-uuid" }`

### 1. Get Profile
- **URL**: `/users/profile`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK` - User object

### 2. Bind Child (Parent Only)
- **URL**: `/users/bind-child`
- **Method**: `POST`
- **Auth**: Required (Role: `PARENT`)
- **Body**: 
  ```json
  { "childId": "uuid-of-student" }
  ```
- **Success Response**: `200 OK` - `{ "message": "Child bound successfully" }`

---

## School Management

### 1. Get All Schools
- **URL**: `/schools`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK` - Array of schools

### 2. Create School
- **URL**: `/schools`
- **Method**: `POST`
- **Auth**: Required (Role: `SCHOOL_ADMIN`)
- **Body**: 
  ```json
  { "name": "No.1 High School", "code": "HS001" }
  ```
- **Success Response**: `201 Created` - School object

---

## Class Management

### 1. Create Class
- **URL**: `/classes`
- **Method**: `POST`
- **Auth**: Required (Role: `TEACHER`, `SCHOOL_ADMIN`)
- **Body**: 
  ```json
  { "name": "Math 101", "code": "MATH101", "schoolId": "school-uuid" }
  ```
- **Success Response**: `201 Created` - Class object

### 2. Join Class
- **URL**: `/classes/join`
- **Method**: `POST`
- **Auth**: Required (Role: `STUDENT`)
- **Body**: 
  ```json
  { "classCode": "MATH101" }
  ```
- **Success Response**: `200 OK` - `{ "message": "Successfully joined the class" }`

### 3. Get Class Students
- **URL**: `/classes/:classId/students`
- **Method**: `GET`
- **Auth**: Required (Role: `TEACHER`, `SCHOOL_ADMIN`)
- **Success Response**: `200 OK` - Array of student user objects

### 4. Remove Student from Class
- **URL**: `/classes/:classId/students/:studentId`
- **Method**: `DELETE`
- **Auth**: Required (Role: `TEACHER`, `SCHOOL_ADMIN`)
- **Success Response**: `200 OK` - `{ "message": "Student removed from class" }`

---

## Learning Progress

### 1. Update Progress
- **URL**: `/progress/update`
- **Method**: `POST`
- **Auth**: Required
- **Body**: 
  ```json
  {
    "studentId": "uuid",
    "knowledgePointId": "uuid",
    "mastery": "PARTIAL", // UNMASTERED, PARTIAL, MASTERED
    "studyTimeSeconds": 300
  }
  ```
- **Success Response**: `200 OK` - Updated progress object

### 2. Get Student Progress
- **URL**: `/progress/:studentId`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK` - Array of progress objects (includes knowledge point/chapter details)

---

## AI & Socratic Tutoring (Session-Based with Memory)

All AI endpoints maintain conversation history. Each session stores the last 10 messages for context-aware responses.

### 1. Create Chat Session
- **URL**: `/ai/sessions`
- **Method**: `POST`
- **Auth**: Required
- **Body**: 
  ```json
  {
    "title": "Algebra Help",
    "subject": "Mathematics",
    "topic": "Quadratic Equations"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "session": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sessionId": "uuid-string",
      "studentId": "student-id",
      "title": "Algebra Help",
      "subject": "Mathematics",
      "topic": "Quadratic Equations",
      "createdAt": "2026-05-25T10:30:00Z",
      "updatedAt": "2026-05-25T10:30:00Z"
    }
  }
  ```

### 2. Get All Student Sessions
- **URL**: `/ai/sessions`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "sessions": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "sessionId": "uuid-string",
        "studentId": "student-id",
        "title": "Algebra Help",
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

### 3. Get Session Details with Full History
- **URL**: `/ai/sessions/:sessionId`
- **Method**: `GET`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "session": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "sessionId": "uuid-string",
      "studentId": "student-id",
      "title": "Algebra Help",
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
        }
      ]
    }
  }
  ```

### 4. Send Message in Session (Automatic Context Memory)
- **URL**: `/ai/chat`
- **Method**: `POST`
- **Auth**: Required
- **Body**: 
  ```json
  {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "message": "So the general form is ax² + bx + c = 0?"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "response": "Perfect! You've got it. Now, what do you think 'a', 'b', and 'c' represent in that equation?",
    "modelUsed": "gpt-4o-mini",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
- **Error Response**: `403 Forbidden` (Content Filtering)
  ```json
  {
    "error": "Message contains prohibited content and has been blocked."
  }
  ```

### 5. Delete Chat Session
- **URL**: `/ai/sessions/:sessionId`
- **Method**: `DELETE`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Session deleted successfully"
  }
  ```

### 6. Mental Health Check (Placeholder)
- **URL**: `/ai/mental-health`
- **Method**: `POST`
- **Auth**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "emotionPolarity": "NEUTRAL",
    "riskLevel": "LOW",
    "keywords": []
  }
  ```

---

## AI Chatbot Features

- **Session-Based Memory**: Each session maintains separate conversations
- **Context-Aware Responses**: Last 10 messages automatically included for coherent responses
- **Socratic Method**: AI guides learning through questioning
- **Content Filtering**: Automatically blocks prohibited topics
- **Multi-Model Support**: Configurable AI model (OpenRouter)
- **User Isolation**: Students can only access their own sessions

For detailed API documentation, see [SOCRATIC_CHATBOT.md](./SOCRATIC_CHATBOT.md)
For frontend integration examples, see [CHATBOT_FRONTEND_INTEGRATION.md](./CHATBOT_FRONTEND_INTEGRATION.md)
