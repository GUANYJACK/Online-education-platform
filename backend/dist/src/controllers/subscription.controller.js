"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeSubscription = exports.getSubscription = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getSubscription = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user?.id },
            select: { subscriptionPlan: true }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ plan: user.subscriptionPlan });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSubscription = getSubscription;
const upgradeSubscription = async (req, res) => {
    try {
        // This is a placeholder for the Freemium MVP
        // In a real app, you would integrate Stripe/Paypal here.
        const { plan } = req.body;
        if (plan !== 'BASIC' && plan !== 'PREMIUM') {
            res.status(400).json({ error: 'Invalid subscription plan' });
            return;
        }
        const user = await prisma_1.default.user.update({
            where: { id: req.user?.id },
            data: { subscriptionPlan: plan }
        });
        res.json({ message: 'Subscription updated successfully', plan: user.subscriptionPlan });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.upgradeSubscription = upgradeSubscription;
