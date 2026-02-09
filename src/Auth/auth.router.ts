import { Router } from 'express';
import {
  registerController,
  loginController,
  refreshController,
} from './auth.controller';
import { authenticateToken } from './auth.middleware';

const router = Router();

// Публичные роуты (без авторизации)
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController);


export default router;