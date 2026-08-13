import { Router } from 'express';
import { SubmissionStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireCourseTeacher } from '../lib/course-access';
import { requireAuth } from '../middleware/auth';

export const submissionsRouter = Router();
submissionsRouter.use(requireAuth);

submissionsRouter.patch('/:id/grade', async (req, res, next) => {
  try {
    const submissionId = z.string().min(1).max(64).parse(req.params.id);
    const data = z.object({
      grade: z.number().min(0).max(100),
      feedback: z.string().trim().max(10000).optional().nullable()
    }).parse(req.body);
    const existing = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { assignment: { select: { courseId: true } } }
    });
    if (!existing) return res.status(404).json({ message: 'Entrega no encontrada.' });
    await requireCourseTeacher(existing.assignment.courseId, req.user!.id);
    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { ...data, status: SubmissionStatus.GRADED },
      include: { student: { select: { id: true, name: true, email: true, role: true } } }
    });
    return res.json(submission);
  } catch (error) {
    return next(error);
  }
});
