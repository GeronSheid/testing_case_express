import { Router } from 'express';
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  getMeController,
} from './auth.controller';
import { authenticateToken } from './auth.middleware';

const router = Router();

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController);
router.post('/logout', logoutController);

// Protected routes
router.get('/profile', authenticateToken, getMeController);


export default router;