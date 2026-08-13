import 'dotenv/config';
import {
  EnrollmentRole,
  PrismaClient,
  Role,
  SubmissionStatus
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Demo1234!', 12);
  const teacher = await prisma.user.upsert({
    where: { email: 'docente@eduroom.local' },
    update: { name: 'Docente Demo', passwordHash, role: Role.TEACHER },
    create: {
      name: 'Docente Demo',
      email: 'docente@eduroom.local',
      passwordHash,
      role: Role.TEACHER
    }
  });
  const student = await prisma.user.upsert({
    where: { email: 'estudiante@eduroom.local' },
    update: { name: 'Estudiante Demo', passwordHash, role: Role.STUDENT },
    create: {
      name: 'Estudiante Demo',
      email: 'estudiante@eduroom.local',
      passwordHash,
      role: Role.STUDENT
    }
  });

  const course = await prisma.course.upsert({
    where: { code: 'DEMO2026' },
    update: { teacherId: teacher.id },
    create: {
      title: 'Introducción a EduRoom',
      description: 'Curso de demostración del entorno académico.',
      code: 'DEMO2026',
      color: '#315f72',
      teacherId: teacher.id
    }
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: teacher.id, courseId: course.id } },
    update: { roleInCourse: EnrollmentRole.TEACHER },
    create: { userId: teacher.id, courseId: course.id, roleInCourse: EnrollmentRole.TEACHER }
  });
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: course.id } },
    update: { roleInCourse: EnrollmentRole.STUDENT },
    create: { userId: student.id, courseId: course.id, roleInCourse: EnrollmentRole.STUDENT }
  });

  await prisma.announcement.upsert({
    where: { id: 'seed-announcement-welcome' },
    update: {},
    create: {
      id: 'seed-announcement-welcome',
      courseId: course.id,
      authorId: teacher.id,
      title: 'Bienvenida',
      content: 'Revisa la primera actividad y publica tus dudas en los comentarios.'
    }
  });
  const assignment = await prisma.assignment.upsert({
    where: { id: 'seed-assignment-introduction' },
    update: {},
    create: {
      id: 'seed-assignment-introduction',
      courseId: course.id,
      title: 'Presentación inicial',
      description: 'Describe tus objetivos para este curso.',
      dueDate: new Date('2027-01-31T23:59:59.000Z')
    }
  });
  const submission = await prisma.submission.upsert({
    where: { assignmentId_studentId: { assignmentId: assignment.id, studentId: student.id } },
    update: {},
    create: {
      assignmentId: assignment.id,
      studentId: student.id,
      content: 'Quiero comprender el diseño de plataformas educativas.',
      status: SubmissionStatus.SUBMITTED
    }
  });
  await prisma.comment.upsert({
    where: { id: 'seed-comment-question' },
    update: {},
    create: {
      id: 'seed-comment-question',
      courseId: course.id,
      assignmentId: assignment.id,
      authorId: student.id,
      content: '¿La entrega puede incluir ejemplos?'
    }
  });
  await prisma.attachment.upsert({
    where: { id: 'seed-attachment-submission' },
    update: {},
    create: {
      id: 'seed-attachment-submission',
      ownerId: student.id,
      courseId: course.id,
      assignmentId: assignment.id,
      submissionId: submission.id,
      fileName: 'objetivos.txt',
      fileUrl: 'https://example.invalid/eduroom-demo/objetivos.txt',
      mimeType: 'text/plain'
    }
  });

  console.log('Seed listo: docente@eduroom.local y estudiante@eduroom.local / Demo1234!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
