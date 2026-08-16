'use strict';

/**
 * Comprobaciones defensivas, secuenciales y de baja carga sobre EduRoom.
 * No realiza fuerza bruta, fuzzing, explotación, escaneo ni pruebas destructivas.
 * Crea dos cuentas y datos sintéticos; no imprime secretos ni identificadores.
 */

const BASE_URL = (process.env.EDUROOM_BASE_URL || 'https://eduroom-znb0.onrender.com').replace(/\/$/, '');
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const password = `Sec-${runId}-A1!`;
const results = [];
const state = {};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function check(name, method, path, { token, body, origin, expected } = {}) {
  const started = Date.now();
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(origin ? { Origin: origin } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    });
    const raw = await response.text();
    let data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
    const passed = response.status === expected;
    results.push({ control: name, expected, obtained: response.status, passed, ms: Date.now() - started });
    if (!passed) throw new Error(`${name}: HTTP ${response.status}; esperado ${expected}; cuerpo ${raw.slice(0, 200)}`);
    return { response, data };
  } catch (error) {
    if (!results.some((item) => item.control === name)) {
      results.push({ control: name, expected, obtained: 'ERROR', passed: false, ms: Date.now() - started });
    }
    throw error;
  }
}

async function run() {
  await check('Endpoint protegido sin token', 'GET', '/api/courses', { expected: 401 });
  await check('Token JWT inválido', 'GET', '/api/auth/me', { token: 'token-sintetico-invalido', expected: 401 });

  const integrity = await check('Estado de integridad', 'GET', '/api/security/integrity', { expected: 200 });
  assert(['verified', 'warning', 'unavailable'].includes(integrity.data.status), 'Estado de integridad fuera de contrato.');
  state.integrityStatus = integrity.data.status;

  const cors = await check('Origen CORS no permitido', 'GET', '/api/health', {
    origin: 'https://origen-no-permitido.invalid',
    expected: 200,
  });
  assert(!cors.response.headers.get('access-control-allow-origin'), 'El origen ajeno recibió Access-Control-Allow-Origin.');

  await check('Payload vacío rechazado', 'POST', '/api/auth/register', { body: {}, expected: 400 });

  const teacher = await check('Registro sintético docente', 'POST', '/api/auth/register', {
    body: {
      name: `Security Teacher ${runId}`,
      email: `security.teacher.${runId}@example.com`,
      password,
      role: 'TEACHER',
    },
    expected: 201,
  });
  assert(teacher.data.token, 'Registro docente sin token.');
  assert(!Object.hasOwn(teacher.data.user, 'passwordHash'), 'El registro expuso passwordHash.');
  state.teacherToken = teacher.data.token;

  const student = await check('Registro sintético estudiante', 'POST', '/api/auth/register', {
    body: {
      name: `Security Student ${runId}`,
      email: `security.student.${runId}@example.com`,
      password,
      role: 'STUDENT',
    },
    expected: 201,
  });
  assert(student.data.token, 'Registro estudiante sin token.');
  assert(!Object.hasOwn(student.data.user, 'passwordHash'), 'El registro expuso passwordHash.');
  state.studentToken = student.data.token;

  const profile = await check('Perfil sin passwordHash', 'GET', '/api/auth/me', {
    token: state.studentToken,
    expected: 200,
  });
  assert(!Object.hasOwn(profile.data, 'passwordHash'), 'El perfil expuso passwordHash.');

  const course = await check('Preparar curso sintético', 'POST', '/api/courses', {
    token: state.teacherToken,
    body: { title: `Security QA ${runId}`, description: 'Entorno sintético defensivo.', color: '#315f72' },
    expected: 201,
  });
  state.courseId = course.data.id;

  await check('Inscribir estudiante sintético', 'POST', '/api/courses/join', {
    token: state.studentToken,
    body: { code: course.data.code },
    expected: 201,
  });

  const assignment = await check('Preparar tarea sintética', 'POST', `/api/courses/${state.courseId}/assignments`, {
    token: state.teacherToken,
    body: { title: 'Tarea defensiva', description: 'Contenido sintético.', dueDate: null },
    expected: 201,
  });
  state.assignmentId = assignment.data.id;

  await check('Estudiante no puede crear tarea', 'POST', `/api/courses/${state.courseId}/assignments`, {
    token: state.studentToken,
    body: { title: 'Acción prohibida', description: '', dueDate: null },
    expected: 403,
  });

  const submission = await check('Preparar entrega sintética', 'POST', `/api/assignments/${state.assignmentId}/submit`, {
    token: state.studentToken,
    body: { content: `Entrega defensiva ${runId}` },
    expected: 201,
  });
  state.submissionId = submission.data.id;

  await check('Estudiante no puede calificar', 'PATCH', `/api/submissions/${state.submissionId}/grade`, {
    token: state.studentToken,
    body: { grade: 100, feedback: 'Acción que debe rechazarse.' },
    expected: 403,
  });
}

run()
  .then(() => {
    const passed = results.filter((item) => item.passed).length;
    console.table(results);
    console.log(JSON.stringify({
      baseUrl: BASE_URL,
      executedAt: new Date().toISOString(),
      controls: results.length,
      passed,
      failed: results.length - passed,
      integrityStatus: state.integrityStatus,
      corsInterpretation: 'El servidor respondió, pero no autorizó el origen ajeno mediante ACAO; el navegador aplica CORS.',
      dataHandling: 'Solo datos sintéticos; tokens, contraseña, código e identificadores omitidos.',
    }, null, 2));
    process.exitCode = 0;
  })
  .catch((error) => {
    console.table(results);
    console.error(`COMPROBACIÓN DEFENSIVA FALLIDA: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
