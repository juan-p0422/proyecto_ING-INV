import { Router } from 'express';
import { SubmissionStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireCourseMember, requireCourseTeacher } from '../lib/course-access';
import { HttpError } from '../lib/http-error';
import { requireAuth } from '../middleware/auth';

export const courseAssignmentsRouter = Router({ mergeParams: true });
export const assignmentsRouter = Router();
courseAssignmentsRouter.use(requireAuth);
assignmentsRouter.use(requireAuth);

const idSchema = z.string().min(1).max(64);
const studentSelect = { id: true, name: true, email: true, role: true } as const;

courseAssignmentsRouter.get('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: idSchema }).parse(req.params);
    const membership = await requireCourseMember(courseId, req.user!.id);
    const assignments = await prisma.assignment.findMany({
      where: { courseId },
      include: membership.roleInCourse === 'TEACHER'
        ? { _count: { select: { submissions: true } } }
        : { submissions: { where: { studentId: req.user!.id } } },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(assignments);
  } catch (error) {
    return next(error);
  }
});

courseAssignmentsRouter.post('/', async (req, res, next) => {
  try {
    const { courseId } = z.object({ courseId: idSchema }).parse(req.params);
    await requireCourseTeacher(courseId, req.user!.id);
    const data = z.object({
      title: z.string().trim().min(1).max(160),
      description: z.string().trim().max(10000).default(''),
      dueDate: z.coerce.date().optional().nullable()
    }).parse(req.body);
    const assignment = await prisma.assignment.create({ data: { ...data, courseId } });
    return res.status(201).json(assignment);
  } catch (error) {
    return next(error);
  }
});

assignmentsRouter.get('/:id', async (req, res, next) => {
  try {
    const assignmentId = idSchema.parse(req.params.id);
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { course: { select: { id: true, title: true, teacherId: true } } }
    });
    if (!assignment) return res.status(404).json({ message: 'Tarea no encontrada.' });
    const membership = await requireCourseMember(assignment.courseId, req.user!.id);
    const submissions = await prisma.submission.findMany({
      where: {
        assignmentId,
        ...(membership.roleInCourse === 'STUDENT' ? { studentId: req.user!.id } : {})
      },
      include: membership.roleInCourse === 'TEACHER' ? { student: { select: studentSelect } } : undefined,
      orderBy: { submittedAt: 'desc' }
    });
    return res.json({ ...assignment, submissions });
  } catch (error) {
    return next(error);
  }
});

assignmentsRouter.post('/:id/submit', async (req, res, next) => {
  try {
    if (req.user!.role !== 'STUDENT') throw new HttpError(403, 'Solo los estudiantes pueden entregar tareas.');
    const assignmentId = idSchema.parse(req.params.id);
    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) return res.status(404).json({ message: 'Tarea no encontrada.' });
    const membership = await requireCourseMember(assignment.courseId, req.user!.id);
    if (membership.roleInCourse !== 'STUDENT') throw new HttpError(403, 'Debes estar inscrito como estudiante para entregar esta tarea.');
    const { content } = z.object({ content: z.string().trim().min(1).max(20000) }).parse(req.body);
    const submission = await prisma.submission.upsert({
      where: { assignmentId_studentId: { assignmentId, studentId: req.user!.id } },
      update: {
        content,
        status: SubmissionStatus.SUBMITTED,
        grade: null,
        feedback: null,
        submittedAt: new Date()
      },
      create: { assignmentId, studentId: req.user!.id, content }
    });
    return res.status(201).json(submission);
  } catch (error) {
    return next(error);
  }
});
