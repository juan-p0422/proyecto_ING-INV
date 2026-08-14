'use strict';

const fs = require('node:fs');
const path = require('node:path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const distDirectory = path.resolve(__dirname, '..', 'dist');

function findJavaScript(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return findJavaScript(absolute);
    return entry.isFile() && entry.name.endsWith('.js') ? [absolute] : [];
  });
}

if (!fs.existsSync(distDirectory)) {
  console.error('No existe frontend/dist. Ejecuta primero npm run build.');
  process.exit(1);
}

const files = findJavaScript(distDirectory);
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const result = JavaScriptObfuscator.obfuscate(source, {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    seed: 20260813,
    selfDefending: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
  });
  fs.writeFileSync(file, result.getObfuscatedCode(), 'utf8');
}

console.log(`Ofuscación educativa aplicada a ${files.length} archivo(s) JavaScript.`);
