import prisma from '../config/prisma';
import { getSystemPrompt } from '../config/prompts';

interface AIServiceRequest {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
  subject?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const getActiveAIModel = async (): Promise<string> => {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: 'ACTIVE_AI_MODEL' }
    });
    return config?.value || process.env.DEFAULT_AI_MODEL || 'gpt-4o-mini';
  } catch (error) {
    return process.env.DEFAULT_AI_MODEL || 'gpt-4o-mini';
  }
};

// Get conversation history for context (last 10 messages)
export const getConversationHistory = async (sessionId: string): Promise<ChatMessage[]> => {
  try {
    const messages = await prisma.chatHistory.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: -10, // Get last 10 messages
      select: { message: true, sender: true }
    });

    return messages.map(msg => ({
      role: msg.sender === 'USER' ? 'user' : 'assistant',
      content: msg.message
    }));
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
};

// OpenRouter API call with conversation context
const callOpenRouter = async (req: AIServiceRequest): Promise<string> => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://api.openrouter.ai/api/v1';
  const model = process.env.OPENROUTER_SOCRATIC_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const conversationHistory = (req.conversationHistory || []) as Array<{ role: 'user' | 'assistant'; content: string }>;
  const messages: ChatMessage[] = [
    ...conversationHistory,
    { role: 'user' as const, content: req.message }
  ];

  // Get system prompt based on subject
  const systemPrompt = getSystemPrompt(req.subject);

  try {
    console.log(`[AI Service] Calling OpenRouter with model: ${model}, subject: ${req.subject || 'default'}`);
    
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Online Education Platform'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: error
      });
      throw new Error(`OpenRouter API failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
    console.log('[AI Service] OpenRouter response received successfully');
    return aiResponse;
  } catch (error) {
    console.error('OpenRouter call failed:', {
      error: error instanceof Error ? error.message : error,
      timestamp: new Date().toISOString()
    });
    
    // Fallback: Return a demo response for testing
    console.log('[AI Service] Using demo/fallback response (network error)');
    return getLocalSocraticResponse(req.message, req.subject);
  }
};

// Local/demo Socratic response generator for when API is unavailable
const getLocalSocraticResponse = (message: string, subject?: string): string => {
  const responses = {
    mathematics: [
      "That's an interesting question about mathematics. Let me ask you back: What mathematical operations or concepts do you think might be involved here?",
      "I see you're working on a math problem. Before I help, can you tell me what you've already tried?",
      "In mathematics, it's important to understand the 'why' behind the answer. What do you think the first step should be?"
    ],
    science: [
      "That's a great scientific question! What do you already know about this topic that might help us explore it?",
      "In science, we often test ideas through observation. What could we observe to understand this better?",
      "Before I explain, can you tell me what you think might happen and why?"
    ],
    language_arts: [
      "That's an interesting literary question. What textual evidence can you find to support your thinking?",
      "Let's analyze this together. What specific words or phrases from the text stand out to you?",
      "Before drawing a conclusion, what do you notice about the author's word choices here?"
    ],
    default: [
      "That's a great question! What do you already know about this topic?",
      "I'm here to help you think through this. What's your initial thought on this?",
      "Let me ask you: What do you think the answer might be, and what makes you think that?",
      "I notice you're curious about that. Can you break this down into smaller parts?",
      "That's an interesting question! What connections can you make to things you already know?"
    ]
  };

  const subjectResponses = subject && subject.toLowerCase().includes('math') ? responses.mathematics 
    : subject && subject.toLowerCase().includes('science') ? responses.science
    : subject && subject.toLowerCase().includes('english') ? responses.language_arts
    : responses.default;

  const randomIdx = Math.floor(Math.random() * subjectResponses.length);
  return subjectResponses[randomIdx];
};

// Claude API call (placeholder)
const callClaude = async (req: AIServiceRequest): Promise<string> => {
  console.log('Claude integration not yet implemented');
  return `[Claude] Socratic response to: "${req.message}". Why do you think that happens?`;
};

// OpenAI API call (placeholder)
const callOpenAI = async (req: AIServiceRequest): Promise<string> => {
  console.log('OpenAI integration not yet implemented');
  return `[OpenAI] Socratic response to: "${req.message}". What is the logical next step?`;
};

// DeepSeek API call (placeholder)
const callDeepSeek = async (req: AIServiceRequest): Promise<string> => {
  console.log('DeepSeek integration not yet implemented');
  return `[DeepSeek] Socratic response to: "${req.message}". How does this connect to what we learned?`;
};

export const generateSocraticResponse = async (
  userMessage: string,
  sessionId?: string
): Promise<{ response: string; model: string }> => {
  const activeModel = await getActiveAIModel();

  // Get conversation history and subject if sessionId provided
  let conversationHistory: ChatMessage[] = [];
  let subject: string | undefined = undefined;
  
  if (sessionId) {
    try {
      const session = await prisma.chatSession.findUnique({
        where: { sessionId }
      });
      if (session) {
        conversationHistory = await getConversationHistory(session.id);
        subject = session.subject || undefined;
        console.log('[AI Service] Session subject:', subject);
      }
    } catch (error) {
      console.error('Error getting session details:', error);
    }
  }

  const req: AIServiceRequest = {
    message: userMessage,
    conversationHistory,
    subject
  };

  let response = '';

  try {
    console.log('[AI Service] Generating response with model:', activeModel);
    switch (activeModel.toLowerCase()) {
      case 'openrouter':
      case 'gpt-4o-mini':
      case 'claude':
        response = await callOpenRouter(req);
        break;
      case 'openai':
        response = await callOpenAI(req);
        break;
      case 'deepseek':
        response = await callDeepSeek(req);
        break;
      default:
        response = await callOpenRouter(req);
        break;
    }
    
    if (!response) {
      throw new Error('No response generated from AI service');
    }
    
    console.log('[AI Service] Response generated successfully, length:', response.length);
  } catch (error) {
    console.error('AI generation failed:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }

  return { response, model: activeModel };
};
