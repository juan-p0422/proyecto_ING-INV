import { Router } from 'express';
import { EnrollmentRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

export const coursesRouter = Router();
coursesRouter.use(requireAuth);

coursesRouter.get('/', async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user!.id },
      include: { course: { include: { _count: { select: { enrollments: true } } } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(enrollments.map(({ role, course }) => ({ ...course, membershipRole: role, memberCount: course._count.enrollments, _count: undefined })));
  } catch (error) { next(error); }
});

coursesRouter.post('/', async (req, res, next) => {
  try {
    if (!['TEACHER', 'ADMIN'].includes(req.user!.role)) return res.status(403).json({ message: 'Solo docentes y administradores pueden crear cursos.' });
    const data = z.object({ title: z.string().trim().min(3).max(120), description: z.string().trim().max(500).optional(), color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#315f72') }).parse(req.body);
    const code = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase();
    const course = await prisma.course.create({
      data: { ...data, code, enrollments: { create: { userId: req.user!.id, role: EnrollmentRole.TEACHER } } }
    });
    res.status(201).json(course);
  } catch (error) { next(error); }
});

coursesRouter.post('/join', async (req, res, next) => {
  try {
    const { code } = z.object({ code: z.string().trim().min(4).max(20).transform((v) => v.toUpperCase()) }).parse(req.body);
    const course = await prisma.course.findUnique({ where: { code } });
    if (!course) return res.status(404).json({ message: 'Código de curso no válido.' });
    await prisma.enrollment.upsert({ where: { userId_courseId: { userId: req.user!.id, courseId: course.id } }, update: {}, create: { userId: req.user!.id, courseId: course.id } });
    res.status(201).json(course);
  } catch (error) { next(error); }
});

