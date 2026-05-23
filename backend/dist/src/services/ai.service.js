"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSocraticResponse = exports.getActiveAIModel = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getActiveAIModel = async () => {
    const config = await prisma_1.default.systemConfig.findUnique({
        where: { key: 'ACTIVE_AI_MODEL' }
    });
    return config?.value || process.env.DEFAULT_AI_MODEL || 'CLAUDE';
};
exports.getActiveAIModel = getActiveAIModel;
const callClaude = async (req) => {
    console.log('Calling Claude API...');
    return `[Claude] Socratic response to: "${req.message}". Why do you think that happens?`;
};
const callOpenAI = async (req) => {
    console.log('Calling OpenAI API...');
    return `[OpenAI] Socratic response to: "${req.message}". What is the logical next step?`;
};
const callOpenRouter = async (req) => {
    console.log('Calling OpenRouter API...');
    return `[OpenRouter] Socratic response to: "${req.message}". Can you explain your reasoning?`;
};
const callDeepSeek = async (req) => {
    console.log('Calling DeepSeek API...');
    return `[DeepSeek] Socratic response to: "${req.message}". How does this connect to what we learned?`;
};
const generateSocraticResponse = async (userMessage, context) => {
    const activeModel = await (0, exports.getActiveAIModel)();
    const req = { message: userMessage, context };
    let response = '';
    switch (activeModel.toUpperCase()) {
        case 'OPENAI':
            response = await callOpenAI(req);
            break;
        case 'OPENROUTER':
            response = await callOpenRouter(req);
            break;
        case 'DEEPSEEK':
            response = await callDeepSeek(req);
            break;
        case 'CLAUDE':
        default:
            response = await callClaude(req);
            break;
    }
    return { response, model: activeModel };
};
exports.generateSocraticResponse = generateSocraticResponse;
