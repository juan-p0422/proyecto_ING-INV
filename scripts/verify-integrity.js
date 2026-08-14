'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(projectRoot, 'integrity-manifest.json');

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function isTemporary(name) {
  return name.startsWith('.') || name.endsWith('~') || /\.(tmp|temp|swp)$/i.test(name);
}

function collectFiles(directory, extensions) {
  if (!fs.existsSync(directory)) return [];
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || isTemporary(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...collectFiles(absolute, extensions));
    else if (entry.isFile() && extensions.includes(path.extname(entry.name).toLowerCase())) result.push(absolute);
  }
  return result;
}

function sha256(absolutePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
}

if (!fs.existsSync(manifestPath)) {
  console.error('No existe integrity-manifest.json. Ejecuta npm run integrity:generate.');
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (error) {
  console.error(`El manifest no es JSON válido: ${error instanceof Error ? error.message : 'error desconocido'}`);
  process.exit(1);
}

if (manifest.version !== 1 || manifest.algorithm !== 'sha256' || !Array.isArray(manifest.files) || !Array.isArray(manifest.scopes)) {
  console.error('El formato de integrity-manifest.json no es compatible.');
  process.exit(1);
}

const expected = new Map(manifest.files.map((entry) => [entry.path, entry]));
const currentPaths = manifest.scopes.flatMap((scope) =>
  collectFiles(path.join(projectRoot, scope.root), scope.extensions).map((absolute) => toPosix(path.relative(projectRoot, absolute))),
);
const current = new Set(currentPaths);
const modified = [];
const missing = [];
const added = [];

for (const [relativePath, entry] of expected) {
  const absolutePath = path.resolve(projectRoot, relativePath);
  if (!absolutePath.startsWith(`${projectRoot}${path.sep}`) || !fs.existsSync(absolutePath)) {
    missing.push(relativePath);
    continue;
  }
  if (sha256(absolutePath) !== entry.sha256) modified.push(relativePath);
}

for (const relativePath of current) {
  if (!expected.has(relativePath)) added.push(relativePath);
}

function printGroup(label, files) {
  if (!files.length) return;
  console.error(`${label} (${files.length}):`);
  for (const file of files.sort()) console.error(`  - ${file}`);
}

if (modified.length || missing.length || added.length) {
  console.error('Verificación de integridad fallida.');
  printGroup('Modificados', modified);
  printGroup('Faltantes', missing);
  printGroup('Nuevos', added);
  process.exit(1);
}

console.log(`Integridad verificada: ${expected.size} archivos coinciden con el manifest.`);

