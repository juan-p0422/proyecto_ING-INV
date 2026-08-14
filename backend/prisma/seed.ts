import 'dotenv/config';
import { EnrollmentRole, PrismaClient, Role, SubmissionStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const [teacherPasswordHash, studentPasswordHash] = await Promise.all([
    bcrypt.hash('Teacher123!', 12),
    bcrypt.hash('Student123!', 12),
  ]);

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@eduroom.local' },
    update: { name: 'Profesora Demo', passwordHash: teacherPasswordHash, role: Role.TEACHER },
    create: {
      name: 'Profesora Demo',
      email: 'teacher@eduroom.local',
      passwordHash: teacherPasswordHash,
      role: Role.TEACHER,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@eduroom.local' },
    update: { name: 'Estudiante Demo', passwordHash: studentPasswordHash, role: Role.STUDENT },
    create: {
      name: 'Estudiante Demo',
      email: 'student@eduroom.local',
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
    },
  });

  const course = await prisma.course.upsert({
    where: { code: 'AULA2026' },
    update: {
      title: 'Diseño de experiencias educativas',
      description: 'Curso preparado para la demostración presencial de EduRoom.',
      color: '#1b6b63',
      teacherId: teacher.id,
    },
    create: {
      title: 'Diseño de experiencias educativas',
      description: 'Curso preparado para la demostración presencial de EduRoom.',
      code: 'AULA2026',
      color: '#1b6b63',
      teacherId: teacher.id,
    },
  });

  await Promise.all([
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: teacher.id, courseId: course.id } },
      update: { roleInCourse: EnrollmentRole.TEACHER },
      create: { userId: teacher.id, courseId: course.id, roleInCourse: EnrollmentRole.TEACHER },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: student.id, courseId: course.id } },
      update: { roleInCourse: EnrollmentRole.STUDENT },
      create: { userId: student.id, courseId: course.id, roleInCourse: EnrollmentRole.STUDENT },
    }),
  ]);

  await prisma.announcement.upsert({
    where: { id: 'demo-announcement-welcome' },
    update: {
      courseId: course.id,
      authorId: teacher.id,
      title: 'Bienvenida al curso demo',
      content: 'Revisa la tarea de presentación y comparte tus dudas en los comentarios.',
    },
    create: {
      id: 'demo-announcement-welcome',
      courseId: course.id,
      authorId: teacher.id,
      title: 'Bienvenida al curso demo',
      content: 'Revisa la tarea de presentación y comparte tus dudas en los comentarios.',
    },
  });

  const assignment = await prisma.assignment.upsert({
    where: { id: 'demo-assignment-learning-goals' },
    update: {
      courseId: course.id,
      title: 'Mis objetivos de aprendizaje',
      description: 'Describe en un párrafo qué esperas aprender durante el curso.',
      dueDate: new Date('2027-01-31T23:59:59.000Z'),
    },
    create: {
      id: 'demo-assignment-learning-goals',
      courseId: course.id,
      title: 'Mis objetivos de aprendizaje',
      description: 'Describe en un párrafo qué esperas aprender durante el curso.',
      dueDate: new Date('2027-01-31T23:59:59.000Z'),
    },
  });

  await prisma.submission.upsert({
    where: { assignmentId_studentId: { assignmentId: assignment.id, studentId: student.id } },
    update: {
      content: 'Quiero aprender a diseñar plataformas educativas claras, seguras y accesibles.',
      status: SubmissionStatus.SUBMITTED,
      grade: null,
      feedback: null,
      submittedAt: new Date(),
    },
    create: {
      assignmentId: assignment.id,
      studentId: student.id,
      content: 'Quiero aprender a diseñar plataformas educativas claras, seguras y accesibles.',
      status: SubmissionStatus.SUBMITTED,
    },
  });

  await prisma.comment.upsert({
    where: { id: 'demo-comment-question' },
    update: {
      courseId: course.id,
      assignmentId: assignment.id,
      authorId: student.id,
      content: '¿Puedo complementar mi entrega con un ejemplo de interfaz?',
    },
    create: {
      id: 'demo-comment-question',
      courseId: course.id,
      assignmentId: assignment.id,
      authorId: student.id,
      content: '¿Puedo complementar mi entrega con un ejemplo de interfaz?',
    },
  });

  console.log('Seed demo listo.');
  console.log('Profesor: teacher@eduroom.local / Teacher123!');
  console.log('Estudiante: student@eduroom.local / Student123!');
  console.log(`Curso: ${course.title} / código ${course.code}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
