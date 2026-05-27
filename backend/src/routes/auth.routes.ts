import { Router } from 'express';
import { register, login, selectRole } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/select-role', selectRole);

export default router;
