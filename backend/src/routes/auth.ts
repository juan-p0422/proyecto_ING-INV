import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { env } from '../config';
import { requireAuth } from '../middleware/auth';

export const authRouter = Router();

const credentials = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72)
});

const safeUserSelect = { id: true, name: true, email: true, role: true, createdAt: true } as const;

function issueToken(user: { id: string; email: string; role: Role }) {
  return jwt.sign(
    { email: user.email, role: user.role },
    env.JWT_SECRET,
    { subject: user.id, expiresIn: env.JWT_EXPIRES_IN } as SignOptions
  );
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const data = credentials.extend({
      name: z.string().trim().min(2).max(80),
      role: z.nativeEnum(Role).default(Role.STUDENT)
    }).parse(req.body);

    if (await prisma.user.findUnique({ where: { email: data.email } })) {
      return res.status(409).json({ message: 'El correo ya está registrado.' });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: await bcrypt.hash(data.password, 12),
        role: data.role
      },
      select: safeUserSelect
    });
    return res.status(201).json({ token: issueToken(user), user });
  } catch (error) {
    return next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const data = credentials.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    return res.json({ token: issueToken(safeUser), user: safeUser });
  } catch (error) {
    return next(error);
  }
});

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id }, select: safeUserSelect });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    return res.json(user);
  } catch (error) {
    return next(error);
  }
});
