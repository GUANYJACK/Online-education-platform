"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const school_routes_1 = __importDefault(require("./routes/school.routes"));
const class_routes_1 = __importDefault(require("./routes/class.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
const system_routes_1 = __importDefault(require("./routes/system.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    const startedAt = Date.now();
    const requestBody = ['POST', 'PUT', 'PATCH'].includes(req.method) ? req.body : undefined;
    console.log(`[${new Date().toISOString()}] -> ${req.method} ${req.originalUrl}`);
    if (requestBody !== undefined) {
        console.log('Body:', requestBody);
    }
    res.on('finish', () => {
        const durationMs = Date.now() - startedAt;
        console.log(`[${new Date().toISOString()}] <- ${req.method} ${req.originalUrl} ${res.statusCode} (${durationMs}ms)`);
    });
    next();
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/schools', school_routes_1.default);
app.use('/api/classes', class_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/progress', progress_routes_1.default);
app.use('/api/system', system_routes_1.default);
app.use('/api/subscription', subscription_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
exports.default = app;
