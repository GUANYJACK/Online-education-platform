"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const system_controller_1 = require("../controllers/system.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Routes for ADMIN to manage system AI settings
router.get('/config', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), system_controller_1.getSystemConfig);
router.put('/config', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), system_controller_1.updateSystemConfig);
// Routes for ADMIN to manage forbidden keywords
router.get('/keywords', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), system_controller_1.getForbiddenKeywords);
router.post('/keywords', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), system_controller_1.createForbiddenKeyword);
router.delete('/keywords/:id', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), system_controller_1.deleteForbiddenKeyword);
exports.default = router;
