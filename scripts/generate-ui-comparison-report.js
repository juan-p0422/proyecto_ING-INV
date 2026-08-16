'use strict';

/**
 * Genera un inventario de pares sin capturar ni automatizar Google Classroom.
 * Las referencias deben ser aportadas manualmente por el alumno, anonimizadas.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const eduroomDir = path.join(root, 'evidence', 'ui', 'eduroom');
const referenceDir = path.join(root, 'evidence', 'ui', 'google-classroom');
const output = path.join(root, 'evidence', 'ui', 'ui-comparison-inventory.md');
const viewports = ['desktop-1280x720', 'tablet-768x1024', 'mobile-390x844'];
const flows = [
  ['01-login', 'Login / inicio'],
  ['02-dashboard-cursos', 'Dashboard de cursos'],
  ['03-curso-tablon', 'Vista de curso / tablón'],
  ['04-trabajo-clase', 'Trabajo de clase'],
  ['05-personas', 'Personas / miembros'],
  ['06-detalle-tarea', 'Detalle de tarea'],
  ['07-entrega', 'Entrega'],
  ['08-calificacion-retroalimentacion', 'Calificación y retroalimentación'],
  ['09-integridad', 'Integridad de EduRoom'],
];

function exists(relative) {
  return fs.existsSync(path.join(root, relative));
}

fs.mkdirSync(path.dirname(output), { recursive: true });
const lines = [
  '# Inventario de evidencia para comparación UI',
  '',
  `Generado: ${new Date().toISOString()}`,
  '',
  '> Este inventario no obtiene contenido de Google Classroom. Las referencias deben ser capturas manuales propias, autorizadas y anonimizadas.',
  '',
  '| Flujo | Viewport | Referencia manual | EduRoom Render | Estado del par |',
  '|---|---|---|---|---|',
];

for (const [slug, label] of flows) {
  for (const viewport of viewports) {
    const edu = `evidence/ui/eduroom/${slug}--${viewport}.png`;
    const reference = `evidence/ui/google-classroom/${slug}--${viewport}.png`;
    const referenceApplicable = slug !== '09-integridad';
    const referenceState = referenceApplicable ? (exists(reference) ? 'Disponible' : 'Pendiente manual') : 'No aplica';
    const eduState = exists(edu) ? 'Disponible' : 'Pendiente';
    const pairState = eduState === 'Disponible' && (!referenceApplicable || referenceState === 'Disponible') ? 'Completo' : 'Incompleto';
    lines.push(`| ${label} | ${viewport} | ${referenceState} | ${eduState} | ${pairState} |`);
  }
}

lines.push('', `Referencias esperadas en: \`${path.relative(root, referenceDir).replaceAll('\\', '/')}\`.`);
lines.push(`Capturas EduRoom en: \`${path.relative(root, eduroomDir).replaceAll('\\', '/')}\`.`);
fs.writeFileSync(output, `${lines.join('\n')}\n`, 'utf8');
console.log(`Inventario generado: ${path.relative(root, output)}`);
