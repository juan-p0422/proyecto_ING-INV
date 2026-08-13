import { prisma } from './prisma';
import { HttpError } from './http-error';

export async function requireCourseMember(courseId: string, userId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: { course: true }
  });
  if (!enrollment) throw new HttpError(403, 'No eres integrante de este curso.');
  return enrollment;
}

export async function requireCourseTeacher(courseId: string, userId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new HttpError(404, 'Curso no encontrado.');
  if (course.teacherId !== userId) throw new HttpError(403, 'Solo el docente propietario puede administrar este curso.');
  return course;
}
