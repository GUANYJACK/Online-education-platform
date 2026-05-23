"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMentalHealth = exports.chat = void 0;
const ai_service_1 = require("../services/ai.service");
const filter_service_1 = require("../services/filter.service");
const prisma_1 = __importDefault(require("../config/prisma"));
const chat = async (req, res) => {
    try {
        const { studentId, message, context } = req.body;
        // 1. Prohibited Topic Filter
        const isForbidden = await (0, filter_service_1.isMessageForbidden)(message);
        if (isForbidden) {
            res.status(403).json({ error: 'Message contains prohibited content and has been blocked.' });
            return;
        }
        // Save user message
        await prisma_1.default.chatHistory.create({
            data: { studentId, message, sender: 'USER' }
        });
        // 2. Generate Socratic Response using actively configured AI Model
        const { response: aiResponse, model } = await (0, ai_service_1.generateSocraticResponse)(message, context);
        // Save AI response
        await prisma_1.default.chatHistory.create({
            data: { studentId, message: aiResponse, sender: 'AI', modelUsed: model }
        });
        res.json({ response: aiResponse, modelUsed: model });
    }
    catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
};
exports.chat = chat;
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
