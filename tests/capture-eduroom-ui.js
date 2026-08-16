'use strict';

/**
 * Captura únicamente la interfaz propia de EduRoom en Render.
 * No abre, autentica ni automatiza Google Classroom.
 */

const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const BASE_URL = (process.env.EDUROOM_BASE_URL || 'https://eduroom-znb0.onrender.com').replace(/\/$/, '');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'evidence', 'ui', 'eduroom');
const BROWSER_CHANNEL = process.env.EDUROOM_BROWSER_CHANNEL || 'chrome';
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const password = `Ui-${runId}-A1!`;
const viewports = [
  { name: '1280x720', width: 1280, height: 720, device: 'desktop' },
  { name: '768x1024', width: 768, height: 1024, device: 'tablet' },
  { name: '390x844', width: 390, height: 844, device: 'mobile' },
];

const artifacts = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function api(method, route, { token, body, expected = [200] } = {}) {
  const response = await fetch(`${BASE_URL}${route}`, {
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
  const data = raw ? JSON.parse(raw) : null;
  if (!expected.includes(response.status)) {
    throw new Error(`${method} ${route}: HTTP ${response.status}; esperado ${expected.join('/')}; ${raw.slice(0, 200)}`);
  }
  return data;
}

async function prepareScenario() {
  const teacherRegistration = await api('POST', '/api/auth/register', {
    expected: [201],
    body: { name: 'Docente Evidencia', email: `ui.teacher.${runId}@example.com`, password, role: 'TEACHER' },
  });
  const studentRegistration = await api('POST', '/api/auth/register', {
    expected: [201],
    body: { name: 'Estudiante Evidencia', email: `ui.student.${runId}@example.com`, password, role: 'STUDENT' },
  });
  const course = await api('POST', '/api/courses', {
    token: teacherRegistration.token,
    expected: [201],
    body: {
      title: 'Diseño de experiencias educativas',
      description: 'Curso sintético preparado para evidencia visual académica.',
      color: '#315f72',
    },
  });
  await api('POST', '/api/courses/join', {
    token: studentRegistration.token,
    expected: [201],
    body: { code: course.code },
  });
  await api('POST', `/api/courses/${course.id}/announcements`, {
    token: teacherRegistration.token,
    expected: [201],
    body: { title: 'Bienvenida al curso', content: 'Este anuncio utiliza contenido sintético para la evidencia visual.' },
  });
  const assignment = await api('POST', `/api/courses/${course.id}/assignments`, {
    token: teacherRegistration.token,
    expected: [201],
    body: {
      title: 'Mapa de experiencia de aprendizaje',
      description: 'Describe el flujo principal y justifica dos decisiones de diseño.',
      dueDate: null,
    },
  });
  const submission = await api('POST', `/api/assignments/${assignment.id}/submit`, {
    token: studentRegistration.token,
    expected: [201],
    body: { content: 'Entrega sintética: mapa, decisiones y reflexión final.' },
  });
  await api('POST', `/api/courses/${course.id}/comments`, {
    token: studentRegistration.token,
    expected: [201],
    body: { assignmentId: assignment.id, content: 'Comentario sintético para la comparación visual.' },
  });
  return {
    teacher: teacherRegistration,
    student: studentRegistration,
    course,
    assignment,
    submission,
  };
}

async function newAuthenticatedContext(browser, viewport, auth) {
  const context = await browser.newContext({ viewport, colorScheme: 'light', locale: 'es-MX' });
  await context.addInitScript((data) => {
    localStorage.setItem('eduroom_token', data.token);
    localStorage.setItem('eduroom_user', JSON.stringify(data.user));
  }, auth);
  return context;
}

async function preparePage(page) {
  await page.addStyleTag({ content: `
    *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
    .course-code strong { filter: blur(7px) !important; user-select: none !important; }
    .member-row div > span { filter: blur(6px) !important; user-select: none !important; }
  ` });
}

async function shot(page, viewportName, flow, route, ready) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator(ready).first().waitFor({ state: 'visible', timeout: 30_000 });
  await preparePage(page);
  await page.waitForTimeout(300);
  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
  const fileName = `${flow}-${viewportName}.png`;
  await page.screenshot({ path: path.join(OUTPUT_DIR, fileName), fullPage: false, animations: 'disabled' });
  artifacts.push({ flow, viewport: viewportName, file: `evidence/ui/eduroom/${fileName}`, source: BASE_URL, layout });
}

async function captureBeforeGrade(browser, viewport, scenario) {
  const publicContext = await browser.newContext({ viewport, colorScheme: 'light', locale: 'es-MX' });
  const publicPage = await publicContext.newPage();
  await shot(publicPage, viewport.name, 'login', '/login', 'h2:text-is("Inicia sesión")');
  await publicContext.close();

  const teacherContext = await newAuthenticatedContext(browser, viewport, scenario.teacher);
  const teacherPage = await teacherContext.newPage();
  await shot(teacherPage, viewport.name, 'dashboard', '/dashboard', '#courses-title');
  await shot(teacherPage, viewport.name, 'course-stream', `/courses/${scenario.course.id}/stream`, '#stream-title');
  await shot(teacherPage, viewport.name, 'classwork', `/courses/${scenario.course.id}/classwork`, '#classwork-title');
  await shot(teacherPage, viewport.name, 'people', `/courses/${scenario.course.id}/people`, '#people-title');
  await shot(teacherPage, viewport.name, 'assignment-detail', `/assignments/${scenario.assignment.id}`, 'h1:text-is("Mapa de experiencia de aprendizaje")');
  await shot(teacherPage, viewport.name, 'integrity', '/dashboard', '.integrity-panel');
  await teacherContext.close();

  const studentContext = await newAuthenticatedContext(browser, viewport, scenario.student);
  const studentPage = await studentContext.newPage();
  await shot(studentPage, viewport.name, 'assignment-submission', `/assignments/${scenario.assignment.id}`, '.work-panel');
  await studentContext.close();
}

async function captureAfterGrade(browser, viewport, scenario) {
  const studentContext = await newAuthenticatedContext(browser, viewport, scenario.student);
  const page = await studentContext.newPage();
  await shot(page, viewport.name, 'assignment-graded', `/assignments/${scenario.assignment.id}`, '.grade-summary');
  await studentContext.close();
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const scenario = await prepareScenario();
  const browser = await chromium.launch({ channel: BROWSER_CHANNEL, headless: true });
  try {
    for (const viewport of viewports) await captureBeforeGrade(browser, viewport, scenario);

    const graded = await api('PATCH', `/api/submissions/${scenario.submission.id}/grade`, {
      token: scenario.teacher.token,
      body: { grade: 95, feedback: 'Retroalimentación sintética: estructura clara y decisiones justificadas.' },
    });
    assert(graded.status === 'GRADED', 'La entrega no quedó calificada antes de capturar el resultado.');

    for (const viewport of viewports) await captureAfterGrade(browser, viewport, scenario);
  } finally {
    await browser.close();
  }

  await fs.writeFile(path.join(OUTPUT_DIR, 'capture-manifest.json'), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    source: BASE_URL,
    browserChannel: BROWSER_CHANNEL,
    syntheticDataOnly: true,
    googleClassroomAutomated: false,
    artifacts,
  }, null, 2)}\n`, 'utf8');
  console.log(`Capturas creadas: ${artifacts.length}`);
  console.log(`Directorio: ${OUTPUT_DIR}`);
  console.log('Google Classroom no fue abierto ni automatizado.');
}

main().catch((error) => {
  console.error(`CAPTURA FALLIDA: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
