/*
 * Validación final E2E de EduRoom en Render.
 *
 * - Usa únicamente datos sintéticos con identificadores únicos.
 * - Ejecuta las solicitudes de forma secuencial y sin reintentos.
 * - No imprime contraseñas, tokens JWT ni códigos de curso.
 *
 * Ejecución:
 *   node tests/render-final-e2e.js
 */

const BASE_URL = process.env.EDUROOM_BASE_URL || 'https://eduroom-znb0.onrender.com';
const REQUEST_TIMEOUT_MS = 30_000;
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const password = `Qa-${runId}-A1!`;

const state = {
  teacherEmail: `qa.teacher.${runId}@example.com`,
  studentEmail: `qa.student.${runId}@example.com`,
  teacherToken: '',
  studentToken: '',
  courseId: '',
  courseCode: '',
  assignmentId: '',
  submissionId: '',
};

const results = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function safePath(path) {
  return path
    .replace(/\/[a-z0-9]{20,}(?=\/|$)/gi, '/:id')
    .replace(/\/api\/courses\/[A-Z0-9]{6}(?=\/|$)/g, '/api/courses/:code');
}

async function request(name, method, path, { token, body, expected = [200] } = {}) {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const raw = await response.text();
    let data = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }
    }

    if (!expected.includes(response.status)) {
      const apiMessage = data && typeof data === 'object' ? data.error || data.message : '';
      throw new Error(`HTTP ${response.status}${apiMessage ? `: ${apiMessage}` : ''}`);
    }

    results.push({
      step: results.length + 1,
      name,
      method,
      path: safePath(path),
      status: response.status,
      durationMs: Date.now() - startedAt,
      result: 'APROBADO',
    });
    return data;
  } catch (error) {
    results.push({
      step: results.length + 1,
      name,
      method,
      path: safePath(path),
      status: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      durationMs: Date.now() - startedAt,
      result: 'FALLIDO',
      detail: error.message,
    });
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function run() {
  const health = await request('Comprobar salud', 'GET', '/api/health');
  assert(health?.status === 'ok', 'La respuesta de salud no indicó status=ok');

  const integrity = await request('Comprobar integridad', 'GET', '/api/security/integrity');
  assert(typeof integrity?.status === 'string', 'La respuesta de integridad no incluyó status');

  await request('Registrar docente', 'POST', '/api/auth/register', {
    expected: [201],
    body: { name: 'Docente QA Final', email: state.teacherEmail, password, role: 'TEACHER' },
  });

  await request('Registrar estudiante', 'POST', '/api/auth/register', {
    expected: [201],
    body: { name: 'Estudiante QA Final', email: state.studentEmail, password, role: 'STUDENT' },
  });

  const teacherLogin = await request('Iniciar sesión docente', 'POST', '/api/auth/login', {
    body: { email: state.teacherEmail, password },
  });
  state.teacherToken = teacherLogin.token;
  assert(state.teacherToken, 'El login docente no devolvió token');

  const course = await request('Crear curso', 'POST', '/api/courses', {
    expected: [201],
    token: state.teacherToken,
    body: {
      title: `Curso QA Final ${runId}`,
      description: 'Curso sintético para validación end-to-end en Render.',
      color: '#315f72',
    },
  });
  state.courseId = course.id;
  state.courseCode = course.code;
  assert(state.courseId && state.courseCode, 'El curso no devolvió id y código');

  const announcement = await request(
    'Crear anuncio',
    'POST',
    `/api/courses/${state.courseId}/announcements`,
    {
      expected: [201],
      token: state.teacherToken,
      body: {
        title: 'Aviso de validación final',
        content: `Anuncio de validación final ${runId}`,
      },
    },
  );
  assert(announcement?.id, 'El anuncio no devolvió id');

  const assignment = await request(
    'Crear tarea',
    'POST',
    `/api/courses/${state.courseId}/assignments`,
    {
      expected: [201],
      token: state.teacherToken,
      body: {
        title: `Tarea QA Final ${runId}`,
        description: 'Actividad sintética para validación end-to-end en Render.',
        dueDate: null,
      },
    },
  );
  state.assignmentId = assignment.id;
  assert(state.assignmentId, 'La tarea no devolvió id');

  const studentLogin = await request('Iniciar sesión estudiante', 'POST', '/api/auth/login', {
    body: { email: state.studentEmail, password },
  });
  state.studentToken = studentLogin.token;
  assert(state.studentToken, 'El login estudiante no devolvió token');

  const joinedCourse = await request('Unir estudiante al curso', 'POST', '/api/courses/join', {
    expected: [201],
    token: state.studentToken,
    body: { code: state.courseCode },
  });
  assert(joinedCourse?.id === state.courseId, 'La unión devolvió un curso distinto');

  const announcements = await request(
    'Consultar anuncio como estudiante',
    'GET',
    `/api/courses/${state.courseId}/announcements`,
    { token: state.studentToken },
  );
  assert(Array.isArray(announcements) && announcements.some((item) => item.id === announcement.id), 'El anuncio no fue visible para el estudiante');

  const assignments = await request(
    'Consultar tarea como estudiante',
    'GET',
    `/api/courses/${state.courseId}/assignments`,
    { token: state.studentToken },
  );
  assert(Array.isArray(assignments) && assignments.some((item) => item.id === state.assignmentId), 'La tarea no fue visible para el estudiante');

  const submission = await request(
    'Enviar entrega',
    'POST',
    `/api/assignments/${state.assignmentId}/submit`,
    {
      expected: [201],
      token: state.studentToken,
      body: { content: `Entrega sintética de validación final ${runId}` },
    },
  );
  state.submissionId = submission.id;
  assert(state.submissionId, 'La entrega no devolvió id');

  const comment = await request(
    'Crear comentario',
    'POST',
    `/api/courses/${state.courseId}/comments`,
    {
      expected: [201],
      token: state.studentToken,
      body: {
        assignmentId: state.assignmentId,
        content: `Comentario sintético de validación final ${runId}`,
      },
    },
  );
  assert(comment?.id, 'El comentario no devolvió id');

  const teacherRelogin = await request('Reingresar como docente', 'POST', '/api/auth/login', {
    body: { email: state.teacherEmail, password },
  });
  state.teacherToken = teacherRelogin.token;
  assert(state.teacherToken, 'El segundo login docente no devolvió token');

  const review = await request(
    'Revisar entrega como docente',
    'GET',
    `/api/assignments/${state.assignmentId}`,
    { token: state.teacherToken },
  );
  assert(
    Array.isArray(review?.submissions) && review.submissions.some((item) => item.id === state.submissionId),
    'La entrega no apareció en la revisión docente',
  );

  const graded = await request(
    'Calificar entrega',
    'PATCH',
    `/api/submissions/${state.submissionId}/grade`,
    {
      token: state.teacherToken,
      body: { grade: 95, feedback: 'Validación automática final aprobada.' },
    },
  );
  assert(graded?.grade === 95 && graded?.status === 'GRADED', 'La entrega no quedó calificada con 95 puntos');

  const studentView = await request(
    'Confirmar calificación como estudiante',
    'GET',
    `/api/assignments/${state.assignmentId}`,
    { token: state.studentToken },
  );
  assert(
    Array.isArray(studentView?.submissions)
      && studentView.submissions.some((item) => item.id === state.submissionId && item.grade === 95),
    'La calificación no fue visible para el estudiante',
  );

  const comments = await request(
    'Confirmar comentario',
    'GET',
    `/api/courses/${state.courseId}/comments`,
    { token: state.teacherToken },
  );
  assert(Array.isArray(comments) && comments.some((item) => item.id === comment.id), 'El comentario no fue visible para el docente');

  return { health, integrity };
}

function printSummary(extra = {}) {
  console.table(results);
  const passed = results.filter((item) => item.result === 'APROBADO').length;
  const failed = results.length - passed;
  console.log(JSON.stringify({
    baseUrl: BASE_URL,
    executedAt: new Date().toISOString(),
    runId,
    requests: results.length,
    passed,
    failed,
    integrityStatus: extra.integrity?.status || null,
  }, null, 2));
}

run()
  .then((extra) => {
    printSummary(extra);
    process.exitCode = 0;
  })
  .catch((error) => {
    printSummary();
    console.error(`Validación final fallida: ${error.message}`);
    process.exitCode = 1;
  });
