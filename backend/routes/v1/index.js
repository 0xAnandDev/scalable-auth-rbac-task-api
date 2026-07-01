import { Router } from 'express';
import authRoutes from './auth.routes.js';
import taskRoutes from './task.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

// Mount specific v1 modular feature resources
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/health', healthRoutes);

export default router;
