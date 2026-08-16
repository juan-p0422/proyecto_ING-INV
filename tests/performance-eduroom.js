'use strict';

/**
 * Medición ligera de la página pública de EduRoom.
 * Realiza una sola navegación, no inicia sesión y no automatiza Google Classroom.
 */

const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const BASE_URL = (process.env.EDUROOM_BASE_URL || 'https://eduroom-znb0.onrender.com').replace(/\/$/, '');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'evidence', 'performance', 'eduroom');
const VIEWPORT = { width: 1280, height: 720 };

function round(value, digits = 2) {
  return Number.isFinite(value) ? Number(value.toFixed(digits)) : null;
}

function bytes(value) {
  return Number.isFinite(value) && value >= 0 ? Math.round(value) : null;
}

async function launchBrowser() {
  const requestedChannel = process.env.EDUROOM_BROWSER_CHANNEL;
  const attempts = requestedChannel
    ? [{ channel: requestedChannel, label: requestedChannel }]
    : [
        { label: 'playwright-chromium' },
        { channel: 'chrome', label: 'chrome' },
        { channel: 'msedge', label: 'msedge' },
      ];
  const errors = [];
  for (const attempt of attempts) {
    try {
      return {
        browser: await chromium.launch({ headless: true, ...(attempt.channel ? { channel: attempt.channel } : {}) }),
        browserMode: attempt.label,
      };
    } catch (error) {
      errors.push(`${attempt.label}: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`);
    }
  }
  throw new Error(`No fue posible iniciar Chromium. ${errors.join(' | ')}`);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const runStartedAt = new Date();
  const runId = runStartedAt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const jsonName = `eduroom-performance-${runId}.json`;
  const screenshotName = `eduroom-performance-${runId}.png`;
  const { browser, browserMode } = await launchBrowser();
  const context = await browser.newContext({ viewport: VIEWPORT, locale: 'es-MX', colorScheme: 'light' });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send('Performance.enable');
  let response;
  const wallStart = performance.now();

  try {
    response = await page.goto(BASE_URL, { waitUntil: 'load', timeout: 60_000 });
    await page.waitForTimeout(1_500);
    const wallClockNavigationMs = performance.now() - wallStart;
    const pageMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const byInitiatorType = resources.reduce((counts, entry) => {
        const key = entry.initiatorType || 'other';
        counts[key] = (counts[key] || 0) + 1;
        return counts;
      }, {});
      const memory = performance.memory
        ? {
            jsHeapUsedBytes: performance.memory.usedJSHeapSize,
            jsHeapTotalBytes: performance.memory.totalJSHeapSize,
            jsHeapLimitBytes: performance.memory.jsHeapSizeLimit,
          }
        : null;
      return {
        navigation: navigation ? {
          domContentLoadedMs: navigation.domContentLoadedEventEnd - navigation.startTime,
          loadTimeMs: navigation.loadEventEnd - navigation.startTime,
          responseStartMs: navigation.responseStart - navigation.startTime,
          transferSizeBytes: navigation.transferSize,
          encodedBodySizeBytes: navigation.encodedBodySize,
        } : null,
        resources: {
          resourceEntries: resources.length,
          approximateRequestCountIncludingDocument: resources.length + 1,
          transferSizeBytes: resources.reduce((total, entry) => total + (entry.transferSize || 0), 0),
          encodedBodySizeBytes: resources.reduce((total, entry) => total + (entry.encodedBodySize || 0), 0),
          byInitiatorType,
        },
        memory,
        dom: {
          elementCount: document.getElementsByTagName('*').length,
          documentTitle: document.title,
        },
      };
    });
    const cdpResponse = await client.send('Performance.getMetrics');
    const cdp = Object.fromEntries(cdpResponse.metrics.map(({ name, value }) => [name, value]));
    await page.screenshot({ path: path.join(OUTPUT_DIR, screenshotName), fullPage: false, animations: 'disabled' });

    const navigationTransfer = pageMetrics.navigation?.transferSizeBytes || 0;
    const result = {
      schemaVersion: 1,
      measuredAt: new Date().toISOString(),
      target: BASE_URL,
      scope: 'Página pública, una navegación, sin autenticación',
      browser: {
        engine: 'Chromium',
        version: browser.version(),
        launchMode: browserMode,
        viewport: VIEWPORT,
      },
      response: {
        status: response ? response.status() : null,
        ok: response ? response.ok() : null,
      },
      metrics: {
        loadTimeMs: round(pageMetrics.navigation?.loadTimeMs),
        domContentLoadedMs: round(pageMetrics.navigation?.domContentLoadedMs),
        responseStartMs: round(pageMetrics.navigation?.responseStartMs),
        wallClockNavigationAndSettlingMs: round(wallClockNavigationMs),
        approximateResourceCount: pageMetrics.resources.approximateRequestCountIncludingDocument,
        resourceEntriesExcludingDocument: pageMetrics.resources.resourceEntries,
        approximateTransferredBytes: bytes(navigationTransfer + pageMetrics.resources.transferSizeBytes),
        approximateEncodedBodyBytes: bytes((pageMetrics.navigation?.encodedBodySizeBytes || 0) + pageMetrics.resources.encodedBodySizeBytes),
        jsHeapUsedBytes: bytes(cdp.JSHeapUsedSize ?? pageMetrics.memory?.jsHeapUsedBytes),
        jsHeapTotalBytes: bytes(cdp.JSHeapTotalSize ?? pageMetrics.memory?.jsHeapTotalBytes),
        domElementCount: pageMetrics.dom.elementCount,
        cdpNodeCount: bytes(cdp.Nodes),
        cdpDocumentCount: bytes(cdp.Documents),
        resourcesByInitiatorType: pageMetrics.resources.byInitiatorType,
      },
      artifacts: {
        screenshot: `evidence/performance/eduroom/${screenshotName}`,
        json: `evidence/performance/eduroom/${jsonName}`,
      },
      limitations: [
        'Medición puntual del cliente; no representa memoria ni rendimiento de los servidores de Render.',
        'Los tamaños transferidos pueden ser cero o parciales por caché, políticas del navegador o ausencia de Timing-Allow-Origin.',
        'El heap JavaScript es una aproximación específica de Chromium y puede variar entre ejecuciones.',
        'La espera adicional de 1500 ms permite estabilización visual y solo aparece en wallClockNavigationAndSettlingMs.',
        'No se realizó carga masiva, autenticación, interacción de usuario ni automatización de Google Classroom.',
      ],
    };
    await fs.writeFile(path.join(OUTPUT_DIR, jsonName), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`MEDICIÓN FALLIDA: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
