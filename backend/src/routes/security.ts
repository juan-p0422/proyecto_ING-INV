import { Router } from 'express';
import { z } from 'zod';
import { env } from '../config';
import { HttpError } from '../lib/http-error';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { getPublicIntegrityStatus } from '../security/checksum';
import { decryptText, encryptText } from '../security/crypto';

export const securityRouter = Router();

securityRouter.get('/integrity', (_req, res) => res.json(getPublicIntegrityStatus()));

securityRouter.post('/secure-notes', requireAuth, async (req, res, next) => {
  try {
    if (!env.APP_ENCRYPTION_KEY) throw new HttpError(503, 'El módulo de cifrado no está configurado.');
    const { text } = z.object({ text: z.string().trim().min(1).max(5000) }).parse(req.body);
    const encryptedPayload = JSON.stringify(encryptText(text, env.APP_ENCRYPTION_KEY));
    const note = await prisma.secureNote.create({
      data: { ownerId: req.user!.id, encryptedPayload },
      select: { id: true, createdAt: true },
    });
    return res.status(201).json(note);
  } catch (error) {
    return next(error);
  }
});

securityRouter.get('/secure-notes', requireAuth, async (req, res, next) => {
  try {
    if (!env.APP_ENCRYPTION_KEY) throw new HttpError(503, 'El módulo de cifrado no está configurado.');
    const notes = await prisma.secureNote.findMany({
      where: { ownerId: req.user!.id },
      select: { id: true, encryptedPayload: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    try {
      return res.json(notes.map((note) => ({
        id: note.id,
        text: decryptText(note.encryptedPayload, env.APP_ENCRYPTION_KEY),
        createdAt: note.createdAt,
      })));
    } catch {
      throw new HttpError(500, 'No fue posible descifrar una nota segura.');
    }
  } catch (error) {
    return next(error);
  }
});

