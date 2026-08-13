import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireCourseMember } from '../lib/course-access';
import { HttpError } from '../lib/http-error';
import { requireAuth } from '../middleware/auth';

export const commentsRouter = Router({ mergeParams: true });
commentsRouter.use(requireAuth);

const idSchema = z.string().min(1).max(64);
const authorSelect = { id: true, name: true, email: true, role: true } as const;

commentsRouter.get('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: idSchema }).parse(req.params);
    await requireCourseMember(courseId, req.user!.id);
    const query = z.object({ assignmentId: idSchema.optional() }).parse(req.query);
    const comments = await prisma.comment.findMany({
      where: { courseId, ...(query.assignmentId ? { assignmentId: query.assignmentId } : {}) },
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: 'asc' }
    });
    return res.json(comments);
  } catch (error) {
    return next(error);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: idSchema }).parse(req.params);
    await requireCourseMember(courseId, req.user!.id);
    const data = z.object({
      assignmentId: idSchema.optional().nullable(),
      content: z.string().trim().min(1).max(5000)
    }).parse(req.body);
    if (data.assignmentId) {
      const assignment = await prisma.assignment.findUnique({ where: { id: data.assignmentId }, select: { courseId: true } });
      if (!assignment || assignment.courseId !== courseId) {
        throw new HttpError(400, 'La tarea indicada no pertenece a este curso.');
      }
    }
    const comment = await prisma.comment.create({
      data: {
        courseId,
        assignmentId: data.assignmentId,
        authorId: req.user!.id,
        content: data.content
      },
      include: { author: { select: authorSelect } }
    });
    return res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
});
