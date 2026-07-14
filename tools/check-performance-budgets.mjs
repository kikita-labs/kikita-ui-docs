import { readFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';

const workspace = resolve('.');
const statsPath = resolve(workspace, 'dist/kikita-ui-docs/stats.json');
const baselinePath = resolve(workspace, 'tools/performance-baseline.json');
const [stats, baseline] = await Promise.all([readJson(statsPath), readJson(baselinePath)]);
const outputs = Object.entries(stats.outputs ?? {}).map(([path, output]) => ({ path, ...output }));

const main = findSingleOutput(outputs, (output) => /^main-[^.]+\.js$/.test(basename(output.path)));
const styles = findSingleOutput(outputs, (output) =>
  /^styles-[^.]+\.css$/.test(basename(output.path)),
);
const lazyJavaScript = outputs.filter(
  (output) => extname(output.path) === '.js' && /^chunk-[^.]+\.js$/.test(basename(output.path)),
);
const routeChunks = outputs
  .filter((output) => output.entryPoint?.replaceAll('\\', '/').startsWith('src/app/pages/'))
  .sort((left, right) => right.bytes - left.bytes);
const shikiThemeChunks = outputs.filter((output) =>
  Object.keys(output.inputs ?? {}).some((input) =>
    /@shikijs[\\/+].*themes|shiki[\\/+].*themes/.test(input),
  ),
);

const metrics = {
  initialJavaScriptBytes: main.bytes,
  initialCssBytes: styles.bytes,
  initialTotalBytes: main.bytes + styles.bytes,
  lazyJavaScriptChunks: lazyJavaScript.length,
  largestRouteChunkBytes: routeChunks[0]?.bytes ?? 0,
  largestRouteChunks: routeChunks.slice(0, 5).map((output) => ({
    bytes: output.bytes,
    entryPoint: output.entryPoint,
    file: basename(output.path),
  })),
  shikiThemeChunks: shikiThemeChunks.length,
};

const failures = Object.entries(baseline.limits).flatMap(([metric, limit]) =>
  metrics[metric] > limit ? [`${metric}: ${metrics[metric]} exceeds ${limit}`] : [],
);

if (failures.length > 0) {
  console.error(`Performance budget check failed:\n- ${failures.join('\n- ')}`);
  console.error(JSON.stringify(metrics, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Performance budgets passed.\n${JSON.stringify(metrics, null, 2)}`);
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read ${path}. Run a production build first.`, { cause: error });
  }
}

function findSingleOutput(candidates, predicate) {
  const matches = candidates.filter(predicate);

  if (matches.length !== 1) {
    throw new Error(`Expected one matching build output, received ${matches.length}.`);
  }

  return matches[0];
}
