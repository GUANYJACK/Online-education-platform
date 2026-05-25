import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import {
  chat,
  checkMentalHealth,
  createChatSession,
  getStudentSessions,
  getSessionDetails,
  deleteChatSession
} from '../controllers/ai.controller';

const router = Router();

router.use(authenticate);

// Test endpoint with auth
router.get('/test', (req: AuthRequest, res: Response) => {
  res.json({ message: 'AI routes are working!', userId: req.user?.id });
});

// Session management
router.post('/sessions', createChatSession);
router.get('/sessions', getStudentSessions);
router.get('/sessions/:sessionId', getSessionDetails);
router.delete('/sessions/:sessionId', deleteChatSession);

// Chat within a session
router.post('/chat', chat);

// Mental health check
router.post('/mental-health', checkMentalHealth);

export default router;
