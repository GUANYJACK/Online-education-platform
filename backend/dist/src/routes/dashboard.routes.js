"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Routes for Teachers
router.get('/teacher', auth_1.authenticate, (0, auth_1.authorizeRole)(['TEACHER']), dashboard_controller_1.getTeacherDashboard);
// Routes for Admins
router.get('/admin', auth_1.authenticate, (0, auth_1.authorizeRole)(['SCHOOL_ADMIN']), dashboard_controller_1.getSchoolAdminDashboard);
exports.default = router;
