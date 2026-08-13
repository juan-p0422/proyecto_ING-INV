import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config';

type TokenPayload = { sub: string; email: string; role: 'STUDENT' | 'TEACHER' };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const [scheme, token] = req.headers.authorization?.split(' ') ?? [];
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Autenticación requerida.' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}
