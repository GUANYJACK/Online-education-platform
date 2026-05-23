"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controllers/subscription.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Routes for PARENTS or STUDENTS to view/manage subscription
router.get('/', auth_1.authenticate, subscription_controller_1.getSubscription);
router.post('/upgrade', auth_1.authenticate, subscription_controller_1.upgradeSubscription);
exports.default = router;
