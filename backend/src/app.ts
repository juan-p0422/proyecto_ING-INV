import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { env } from './config';
import { authRouter } from './routes/auth';
import { coursesRouter } from './routes/courses';
import { errorHandler, notFound } from './middleware/errors';

export const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN.split(',').map((value) => value.trim()), credentials: false }));
app.use(express.json({ limit: '100kb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: 'draft-8', legacyHeaders: false }), authRouter);
app.use('/api/courses', coursesRouter);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'eduroom-api' }));
app.use(notFound);
app.use(errorHandler);

