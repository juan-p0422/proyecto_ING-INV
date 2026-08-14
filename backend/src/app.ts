import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { rateLimit } from 'express-rate-limit';
import { env } from './config';
import { authRouter } from './routes/auth';
import { coursesRouter } from './routes/courses';
import { announcementsRouter } from './routes/announcements';
import { assignmentsRouter, courseAssignmentsRouter } from './routes/assignments';
import { submissionsRouter } from './routes/submissions';
import { commentsRouter } from './routes/comments';
import { errorHandler, notFound } from './middleware/errors';
import { securityRouter } from './routes/security';

export const app = express();
app.set('trust proxy', 1);
app.use(helmet());
const corsOrigins = env.CORS_ORIGIN
  .split(',')
  .map((value) => value.trim())
  .map((value) => value === 'self' ? process.env.RENDER_EXTERNAL_URL : value)
  .filter((value): value is string => Boolean(value));
app.use(cors({ origin: corsOrigins, credentials: false }));
app.use(express.json({ limit: '100kb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: 'draft-8', legacyHeaders: false }), authRouter);
app.use('/api/courses/:courseId/announcements', announcementsRouter);
app.use('/api/courses/:courseId/assignments', courseAssignmentsRouter);
app.use('/api/courses/:courseId/comments', commentsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/submissions', submissionsRouter);
app.get('/api/health', (_req, res) => res.json({
  status: 'ok',
  uptime: Number(process.uptime().toFixed(3)),
  timestamp: new Date().toISOString(),
  environment: env.NODE_ENV,
}));
app.use('/api/security', securityRouter);

if (env.NODE_ENV === 'production') {
  const frontendDist = [
    process.env.FRONTEND_DIST_PATH ? path.resolve(process.env.FRONTEND_DIST_PATH) : null,
    path.resolve(process.cwd(), 'frontend/dist'),
    path.resolve(process.cwd(), '../frontend/dist'),
    path.resolve(__dirname, '../../../frontend/dist'),
  ].filter((candidate): candidate is string => Boolean(candidate))
    .find((candidate) => existsSync(path.join(candidate, 'index.html')))
    ?? path.resolve(__dirname, '../../../frontend/dist');
  app.use(express.static(frontendDist));
  app.get(/^\/(?!api(?:\/|$)).*/, (_req, res, next) => {
    res.sendFile(path.join(frontendDist, 'index.html'), (error) => error ? next(error) : undefined);
  });
}

app.use(notFound);
app.use(errorHandler);
