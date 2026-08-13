import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import { EnrollmentRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireCourseMember } from '../lib/course-access';
import { requireAuth } from '../middleware/auth';

export const coursesRouter = Router();
coursesRouter.use(requireAuth);

const courseIdSchema = z.string().min(1).max(64);
const teacherSelect = { id: true, name: true, email: true, role: true } as const;

coursesRouter.get('/', async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user!.id },
      include: {
        course: {
          include: {
            teacher: { select: teacherSelect },
            _count: { select: { enrollments: true, assignments: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(enrollments.map(({ roleInCourse, course }) => ({
      ...course,
      membershipRole: roleInCourse,
      memberCount: course._count.enrollments,
      assignmentCount: course._count.assignments,
      _count: undefined
    })));
  } catch (error) {
    return next(error);
  }
});

coursesRouter.post('/', async (req, res, next) => {
  try {
    if (req.user!.role !== 'TEACHER') return res.status(403).json({ message: 'Solo los docentes pueden crear cursos.' });
    const data = z.object({
      title: z.string().trim().min(3).max(120),
      description: z.string().trim().max(2000).default(''),
      color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#315f72')
    }).parse(req.body);
    const code = randomBytes(6).toString('base64url').slice(0, 8).toUpperCase();
    const course = await prisma.course.create({
      data: {
        ...data,
        code,
        teacherId: req.user!.id,
        enrollments: { create: { userId: req.user!.id, roleInCourse: EnrollmentRole.TEACHER } }
      },
      include: { teacher: { select: teacherSelect } }
    });
    return res.status(201).json(course);
  } catch (error) {
    return next(error);
  }
});

coursesRouter.post('/join', async (req, res, next) => {
  try {
    const { code } = z.object({
      code: z.string().trim().min(4).max(20).transform((value) => value.toUpperCase())
    }).parse(req.body);
    const course = await prisma.course.findUnique({ where: { code } });
    if (!course) return res.status(404).json({ message: 'Código de curso no válido.' });

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: req.user!.id, courseId: course.id } },
      update: {},
      create: { userId: req.user!.id, courseId: course.id, roleInCourse: EnrollmentRole.STUDENT }
    });
    return res.status(201).json({ ...course, membershipRole: enrollment.roleInCourse });
  } catch (error) {
    return next(error);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    const courseId = courseIdSchema.parse(req.params.id);
    const membership = await requireCourseMember(courseId, req.user!.id);
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        teacher: { select: teacherSelect },
        _count: { select: { enrollments: true, announcements: true, assignments: true } }
      }
    });
    if (!course) return res.status(404).json({ message: 'Curso no encontrado.' });
    return res.json({ ...course, membershipRole: membership.roleInCourse });
  } catch (error) {
    return next(error);
  }
});

coursesRouter.get('/:id/members', async (req, res, next) => {
  try {
    const courseId = courseIdSchema.parse(req.params.id);
    await requireCourseMember(courseId, req.user!.id);
    const members = await prisma.enrollment.findMany({
      where: { courseId },
      select: {
        id: true,
        roleInCourse: true,
        createdAt: true,
        user: { select: teacherSelect }
      },
      orderBy: { createdAt: 'asc' }
    });
    return res.json(members);
  } catch (error) {
    return next(error);
  }
});
