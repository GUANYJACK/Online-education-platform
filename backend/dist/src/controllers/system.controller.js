"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForbiddenKeyword = exports.createForbiddenKeyword = exports.getForbiddenKeywords = exports.updateSystemConfig = exports.getSystemConfig = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getSystemConfig = async (req, res) => {
    try {
        const configs = await prisma_1.default.systemConfig.findMany();
        // Convert array of key/value pairs to a config object
        const configMap = configs.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(configMap);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSystemConfig = getSystemConfig;
const updateSystemConfig = async (req, res) => {
    try {
        const { key, value } = req.body;
        const config = await prisma_1.default.systemConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });
        res.json(config);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateSystemConfig = updateSystemConfig;
const getForbiddenKeywords = async (req, res) => {
    try {
        const keywords = await prisma_1.default.forbiddenKeyword.findMany();
        res.json(keywords);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getForbiddenKeywords = getForbiddenKeywords;
const createForbiddenKeyword = async (req, res) => {
    try {
        const { word } = req.body;
        const keyword = await prisma_1.default.forbiddenKeyword.create({
            data: { word }
        });
        res.status(201).json(keyword);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createForbiddenKeyword = createForbiddenKeyword;
const deleteForbiddenKeyword = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.forbiddenKeyword.delete({
            where: { id: id }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteForbiddenKeyword = deleteForbiddenKeyword;
