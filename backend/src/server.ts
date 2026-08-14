import { app } from './app';
import { env } from './config';
import { prisma } from './lib/prisma';
import { runDefensiveDiagnostics } from './security/antiDebug';
import { verifyBackendIntegrity } from './security/checksum';

let server: ReturnType<typeof app.listen> | undefined;

async function bootstrap() {
  runDefensiveDiagnostics();
  try {
    await verifyBackendIntegrity({ strict: env.STRICT_INTEGRITY, manifestPath: env.INTEGRITY_MANIFEST_PATH });
  } catch (error) {
    console.error(`[startup] ${error instanceof Error ? error.message : 'Fallo de integridad.'}`);
    await prisma.$disconnect();
    process.exitCode = 1;
    return;
  }
  server = app.listen(env.PORT, '0.0.0.0', () => console.log(`EduRoom API en puerto ${env.PORT}`));
}

async function shutdown() {
  if (!server) {
    await prisma.$disconnect();
    process.exit(0);
  }
  server.close(async () => { await prisma.$disconnect(); process.exit(0); });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

void bootstrap();
