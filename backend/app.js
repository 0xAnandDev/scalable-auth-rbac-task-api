import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger.js';
import router from './routes/index.js';
import swaggerSpecs from './docs/swagger.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import ApiError from './utils/ApiError.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Apply request compression
app.use(compression());

// Parse incoming request body as JSON
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Set up HTTP Request Logging with Morgan combined with Winston
const morganStream = {
  write: (message) => logger.info(message.trim()),
};
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream: morganStream }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter);

// Mount Versioned Routes
app.use('/api', router);

// Mount API Documentation Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Handle unknown route URLs (404 Resource Not Found)
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Centralized error handling middleware
app.use(errorMiddleware);

export default app;
