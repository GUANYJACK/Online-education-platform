"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMentalHealth = exports.deleteChatSession = exports.chat = exports.getSessionDetails = exports.getStudentSessions = exports.createChatSession = void 0;
const ai_service_1 = require("../services/ai.service");
const filter_service_1 = require("../services/filter.service");
const prisma_1 = __importDefault(require("../config/prisma"));
// Create a new chat session
const createChatSession = async (req, res) => {
    try {
        const { title, subject, topic } = req.body;
        const studentId = req.user?.id;
        if (!studentId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const session = await prisma_1.default.chatSession.create({
            data: {
                studentId,
                title: title || 'New Chat Session',
                subject,
                topic
            }
        });
        res.status(201).json({ session });
    }
    catch (error) {
        console.error('Create session failed:', error);
        res.status(500).json({ error: 'Failed to create chat session' });
    }
};
exports.createChatSession = createChatSession;
// Get all sessions for a student
const getStudentSessions = async (req, res) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const sessions = await prisma_1.default.chatSession.findMany({
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
    }
    catch (error) {
        console.error('Get sessions failed:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
};
exports.getStudentSessions = getStudentSessions;
// Get session details with conversation history
const getSessionDetails = async (req, res) => {
    try {
        const sessionId = Array.isArray(req.params.sessionId)
            ? req.params.sessionId[0]
            : req.params.sessionId;
        const studentId = req.user?.id;
        if (!studentId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: sessionId },
            include: { chatHistories: { orderBy: { createdAt: 'asc' } } }
        });
        if (!session || session.studentId !== studentId) {
            res.status(404).json({ error: 'Session not found' });
            return;
        }
        res.json({ session });
    }
    catch (error) {
        console.error('Get session details failed:', error);
        res.status(500).json({ error: 'Failed to fetch session details' });
    }
};
exports.getSessionDetails = getSessionDetails;
// Send message in a chat session with memory
const chat = async (req, res) => {
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
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: sessionId }
        });
        if (!session || session.studentId !== studentId) {
            res.status(404).json({ error: 'Session not found' });
            return;
        }
        // 1. Prohibited Topic Filter
        console.warn('[CHAT] About to check forbidden');
        const isForbidden = await (0, filter_service_1.isMessageForbidden)(message);
        if (isForbidden) {
            res.status(403).json({ error: 'Message contains prohibited content and has been blocked.' });
            return;
        }
        // Save user message
        console.warn('[CHAT] About to save user message');
        await prisma_1.default.chatHistory.create({
            data: {
                sessionId,
                studentId,
                message,
                sender: 'USER'
            }
        });
        console.warn('[CHAT] About to generate Socratic response');
        // 2. Generate Socratic Response using conversation history
        const { response: aiResponse, model } = await (0, ai_service_1.generateSocraticResponse)(message, sessionId);
        console.warn('[CHAT] Generated response');
        // Save AI response
        await prisma_1.default.chatHistory.create({
            data: {
                sessionId,
                studentId,
                message: aiResponse,
                sender: 'AI',
                modelUsed: model
            }
        });
        // Update session last accessed time
        await prisma_1.default.chatSession.update({
            where: { id: sessionId },
            data: { lastAccessedAt: new Date() }
        });
        console.warn('[CHAT] About to send response');
        res.json({
            response: aiResponse,
            modelUsed: model,
            sessionId
        });
    }
    catch (error) {
        console.log('[CHAT] ===== CAUGHT ERROR IN CATCH BLOCK =====');
        console.error('[CHAT] Full error object:', error);
        console.error('[CHAT] Error message:', error?.message);
        console.error('[CHAT] Error stack:', error?.stack);
        res.status(500).json({ error: error?.message || 'AI processing failed' });
    }
};
exports.chat = chat;
// Delete a chat session
const deleteChatSession = async (req, res) => {
    try {
        const sessionId = Array.isArray(req.params.sessionId)
            ? req.params.sessionId[0]
            : req.params.sessionId;
        const studentId = req.user?.id;
        if (!studentId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: sessionId }
        });
        if (!session || session.studentId !== studentId) {
            res.status(404).json({ error: 'Session not found' });
            return;
        }
        await prisma_1.default.chatSession.delete({
            where: { id: sessionId }
        });
        res.json({ message: 'Session deleted successfully' });
    }
    catch (error) {
        console.error('Delete session failed:', error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
};
exports.deleteChatSession = deleteChatSession;
const checkMentalHealth = async (req, res) => {
    try {
        // Placeholder mental health analysis - in MVP we return a safe default
        res.json({ emotionPolarity: 'NEUTRAL', riskLevel: 'LOW', keywords: [] });
    }
    catch (error) {
        res.status(500).json({ error: 'Mental health check failed' });
    }
};
exports.checkMentalHealth = checkMentalHealth;
