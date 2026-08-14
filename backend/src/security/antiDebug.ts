type AntiDebugReport = {
  production: boolean;
  suspiciousVariables: string[];
};

const monitoredVariables = ['NODE_OPTIONS', 'VSCODE_INSPECTOR_OPTIONS', 'NODE_INSPECT_RESUME_ON_START'];

/**
 * Demostración defensiva y no destructiva. Solo registra señales ambientales;
 * no termina procesos, no modifica el sistema y no bloquea el desarrollo.
 */
export function runDefensiveDiagnostics(): AntiDebugReport {
  const production = process.env.NODE_ENV === 'production';
  const suspiciousVariables = monitoredVariables.filter((name) => {
    const value = process.env[name];
    if (!value) return false;
    return name !== 'NODE_OPTIONS' || /--inspect|--debug|--require/i.test(value);
  });

  if (!production) console.warn('[anti-debug] NODE_ENV no es production; diagnóstico educativo sin bloqueo.');
  for (const name of suspiciousVariables) console.warn(`[anti-debug] Variable de instrumentación detectada: ${name}.`);
  return { production, suspiciousVariables };
}
