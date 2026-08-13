import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireCourseMember, requireCourseTeacher } from '../lib/course-access';
import { requireAuth } from '../middleware/auth';

export const announcementsRouter = Router({ mergeParams: true });
announcementsRouter.use(requireAuth);

const authorSelect = { id: true, name: true, email: true, role: true } as const;

announcementsRouter.get('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: z.string().min(1).max(64) }).parse(req.params);
    await requireCourseMember(courseId, req.user!.id);
    const announcements = await prisma.announcement.findMany({
      where: { courseId },
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(announcements);
  } catch (error) {
    return next(error);
  }
});

announcementsRouter.post('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: z.string().min(1).max(64) }).parse(req.params);
    await requireCourseTeacher(courseId, req.user!.id);
    const data = z.object({
      title: z.string().trim().min(1).max(160),
      content: z.string().trim().min(1).max(10000)
    }).parse(req.body);
    const announcement = await prisma.announcement.create({
      data: { ...data, courseId, authorId: req.user!.id },
      include: { author: { select: authorSelect } }
    });
    return res.status(201).json(announcement);
  } catch (error) {
    return next(error);
  }
});
