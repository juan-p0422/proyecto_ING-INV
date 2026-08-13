import { PrismaClient, Role, EnrollmentRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Demo1234!', 12);
  const teacher = await prisma.user.upsert({
    where: { email: 'docente@eduroom.local' },
    update: {},
    create: { name: 'Docente Demo', email: 'docente@eduroom.local', passwordHash, role: Role.TEACHER }
  });
  const course = await prisma.course.upsert({
    where: { code: 'DEMO2026' },
    update: {},
    create: { title: 'Introducción a EduRoom', description: 'Curso de demostración del entorno académico.', code: 'DEMO2026', color: '#315f72' }
  });
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: teacher.id, courseId: course.id } },
    update: {},
    create: { userId: teacher.id, courseId: course.id, role: EnrollmentRole.TEACHER }
  });
}

main().finally(async () => prisma.$disconnect());

