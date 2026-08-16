'use strict';

/**
 * Smoke test secuencial y de baja carga para la instancia propia de EduRoom.
 * Crea datos sintéticos con un identificador único. No imprime tokens, contraseñas
 * ni códigos de curso y no ejecuta concurrencia, reintentos agresivos o carga.
 */

const BASE_URL = (process.env.EDUROOM_BASE_URL || 'https://eduroom-znb0.onrender.com').replace(/\/$/, '');
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const password = `Qa-${runId}-A1!`;
const teacher = { name: `QA Teacher ${runId}`, email: `qa.teacher.${runId}@example.com`, password, role: 'TEACHER' };
const student = { name: `QA Student ${runId}`, email: `qa.student.${runId}@example.com`, password, role: 'STUDENT' };

const results = [];
const state = {};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(name, method, path, { token, body, expected = [200] } = {}) {
  const started = Date.now();
  const displayPath = path.replace(/cm[a-z0-9]{10,}/gi, ':synthetic-id');
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    });
    const raw = await response.text();
    let data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
    const passed = expected.includes(response.status);
    results.push({ name, method, path: displayPath, status: response.status, expected: expected.join('/'), passed, ms: Date.now() - started });
    if (!passed) throw new Error(`${name}: HTTP ${response.status}; esperado ${expected.join('/')}; respuesta ${raw.slice(0, 300)}`);
    return data;
  } catch (error) {
    if (!results.some((item) => item.name === name)) {
      results.push({ name, method, path: displayPath, status: 'ERROR', expected: expected.join('/'), passed: false, ms: Date.now() - started });
    }
    throw error;
  }
}

async function run() {
  const health = await request('Health', 'GET', '/api/health');
  assert(health.status === 'ok' && health.service === 'eduroom-api', 'Health no contiene el contrato esperado.');

  const integrity = await request('Integridad', 'GET', '/api/security/integrity');
  assert(['verified', 'warning', 'unavailable'].includes(integrity.status), 'Estado de integridad desconocido.');
  state.integrityStatus = integrity.status;

  const teacherRegistration = await request('Registro docente', 'POST', '/api/auth/register', { body: teacher, expected: [201] });
  const studentRegistration = await request('Registro estudiante', 'POST', '/api/auth/register', { body: student, expected: [201] });
  assert(teacherRegistration.user.role === 'TEACHER', 'El registro docente devolvió un rol inesperado.');
  assert(studentRegistration.user.role === 'STUDENT', 'El registro estudiante devolvió un rol inesperado.');

  const teacherLogin = await request('Login docente', 'POST', '/api/auth/login', { body: { email: teacher.email, password } });
  const studentLogin = await request('Login estudiante', 'POST', '/api/auth/login', { body: { email: student.email, password } });
  state.teacherToken = teacherLogin.token;
  state.studentToken = studentLogin.token;
  assert(state.teacherToken && state.studentToken, 'Login sin token.');

  await request('Perfil docente', 'GET', '/api/auth/me', { token: state.teacherToken });
  await request('Perfil estudiante', 'GET', '/api/auth/me', { token: state.studentToken });
  await request('Cursos iniciales docente', 'GET', '/api/courses', { token: state.teacherToken });

  const course = await request('Crear curso', 'POST', '/api/courses', {
    token: state.teacherToken,
    body: { title: `Curso QA ${runId}`, description: 'Datos sintéticos de prueba automatizada.', color: '#315f72' },
    expected: [201],
  });
  state.courseId = course.id;
  assert(course.id && course.code, 'Curso sin id o código.');

  await request('Unir estudiante', 'POST', '/api/courses/join', {
    token: state.studentToken,
    body: { code: course.code },
    expected: [201],
  });
  await request('Detalle curso', 'GET', `/api/courses/${state.courseId}`, { token: state.teacherToken });
  const members = await request('Integrantes', 'GET', `/api/courses/${state.courseId}/members`, { token: state.teacherToken });
  assert(Array.isArray(members) && members.length === 2, 'Se esperaban dos integrantes sintéticos.');

  await request('Crear anuncio', 'POST', `/api/courses/${state.courseId}/announcements`, {
    token: state.teacherToken,
    body: { title: 'Aviso QA', content: `Ejecución sintética ${runId}` },
    expected: [201],
  });
  const announcements = await request('Listar anuncios', 'GET', `/api/courses/${state.courseId}/announcements`, { token: state.studentToken });
  assert(Array.isArray(announcements) && announcements.length >= 1, 'No se recuperó el anuncio creado.');

  const assignment = await request('Crear tarea', 'POST', `/api/courses/${state.courseId}/assignments`, {
    token: state.teacherToken,
    body: { title: 'Tarea QA', description: `Actividad sintética ${runId}`, dueDate: null },
    expected: [201],
  });
  state.assignmentId = assignment.id;
  await request('Listar tareas', 'GET', `/api/courses/${state.courseId}/assignments`, { token: state.studentToken });
  await request('Detalle tarea previo', 'GET', `/api/assignments/${state.assignmentId}`, { token: state.studentToken });

  const submission = await request('Enviar entrega', 'POST', `/api/assignments/${state.assignmentId}/submit`, {
    token: state.studentToken,
    body: { content: `Entrega sintética ${runId}` },
    expected: [201],
  });
  state.submissionId = submission.id;
  assert(submission.status === 'SUBMITTED', 'La entrega no quedó en SUBMITTED.');

  const graded = await request('Calificar entrega', 'PATCH', `/api/submissions/${state.submissionId}/grade`, {
    token: state.teacherToken,
    body: { grade: 95, feedback: 'Retroalimentación sintética de QA.' },
  });
  assert(graded.status === 'GRADED' && graded.grade === 95, 'La calificación no se persistió correctamente.');
  await request('Detalle tarea calificada', 'GET', `/api/assignments/${state.assignmentId}`, { token: state.studentToken });

  await request('Crear comentario', 'POST', `/api/courses/${state.courseId}/comments`, {
    token: state.studentToken,
    body: { assignmentId: state.assignmentId, content: `Comentario sintético ${runId}` },
    expected: [201],
  });
  const comments = await request('Listar comentarios', 'GET', `/api/courses/${state.courseId}/comments?assignmentId=${state.assignmentId}`, { token: state.teacherToken });
  assert(Array.isArray(comments) && comments.length >= 1, 'No se recuperó el comentario creado.');

  await request('Crear nota segura', 'POST', '/api/security/secure-notes', {
    token: state.studentToken,
    body: { text: `Nota cifrada sintética ${runId}` },
    expected: [201],
  });
  const notes = await request('Listar notas seguras', 'GET', '/api/security/secure-notes', { token: state.studentToken });
  assert(Array.isArray(notes) && notes.some((note) => note.text === `Nota cifrada sintética ${runId}`), 'No se recuperó la nota segura.');

  await request('Curso prohibido para estudiante', 'POST', '/api/courses', {
    token: state.studentToken,
    body: { title: 'No debe crearse', description: '', color: '#315f72' },
    expected: [403],
  });
}

run()
  .then(() => {
    const passed = results.filter((item) => item.passed).length;
    console.table(results);
    console.log(JSON.stringify({
      baseUrl: BASE_URL,
      executedAt: new Date().toISOString(),
      runId,
      requests: results.length,
      passed,
      failed: results.length - passed,
      integrityStatus: state.integrityStatus,
      note: 'Tokens, contraseña y código de curso fueron omitidos deliberadamente.',
    }, null, 2));
    process.exitCode = 0;
  })
  .catch((error) => {
    console.table(results);
    console.error(`SMOKE TEST FALLIDO: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
