import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { env } from '../config';

export const authRouter = Router();
const credentials = z.object({ email: z.string().email().transform((v) => v.toLowerCase()), password: z.string().min(8).max(72) });

function issueToken(user: { id: string; email: string; role: string }) {
  return jwt.sign({ email: user.email, role: user.role }, env.JWT_SECRET, { subject: user.id, expiresIn: env.JWT_EXPIRES_IN } as SignOptions);
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const data = credentials.extend({ name: z.string().trim().min(2).max(80) }).parse(req.body);
    if (await prisma.user.findUnique({ where: { email: data.email } })) return res.status(409).json({ message: 'El correo ya está registrado.' });
    const user = await prisma.user.create({ data: { name: data.name, email: data.email, passwordHash: await bcrypt.hash(data.password, 12) }, select: { id: true, name: true, email: true, role: true } });
    return res.status(201).json({ token: issueToken(user), user });
  } catch (error) { next(error); }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const data = credentials.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ message: 'Credenciales incorrectas.' });
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json({ token: issueToken(safeUser), user: safeUser });
  } catch (error) { next(error); }
});

