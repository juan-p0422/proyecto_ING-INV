import { app } from './app';
import { env } from './config';
import { prisma } from './lib/prisma';

const server = app.listen(env.PORT, '0.0.0.0', () => console.log(`EduRoom API en puerto ${env.PORT}`));

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

