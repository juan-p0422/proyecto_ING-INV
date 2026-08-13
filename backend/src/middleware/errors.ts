import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { HttpError } from '../lib/http-error';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Recurso no encontrado.' });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) return res.status(400).json({ message: 'Datos inválidos.', issues: error.flatten() });
  if (error instanceof HttpError) return res.status(error.status).json({ message: error.message });
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return res.status(409).json({ message: 'Ya existe un registro con esos datos.' });
  }
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ message: 'El cuerpo JSON no es válido.' });
  console.error(error);
  return res.status(500).json({ message: 'Error interno del servidor.' });
}
