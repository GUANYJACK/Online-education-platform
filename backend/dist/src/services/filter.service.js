"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMessageForbidden = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const isMessageForbidden = async (message) => {
    const forbiddenKeywords = await prisma_1.default.forbiddenKeyword.findMany();
    const lowerMessage = message.toLowerCase();
    for (const keyword of forbiddenKeywords) {
        if (lowerMessage.includes(keyword.word.toLowerCase())) {
            return true;
        }
    }
    return false;
};
exports.isMessageForbidden = isMessageForbidden;
