import { Router } from 'express';

const router = Router();

/**
 * Health check endpoint for system monitoring.
 * GET /api/v1/health
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

export default router;
