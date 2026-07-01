import { Router } from 'express';
import { register, login, getMe } from '../../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../../validators/auth.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

// Public Routes
router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);

// Authenticated User Routes
router.get('/me', protect, getMe);

export default router;
