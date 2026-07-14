import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const workspace = resolve('.');
const sourceRoot = resolve(workspace, 'src/app');
const inventoryPath = resolve(workspace, '.local-notes/refactor/COMPONENT-INVENTORY.md');
const inventory = await readFile(inventoryPath, 'utf8');
const inventoryEntries = new Map(
  [...inventory.matchAll(/^- `([^`]+)` - `((?:src\/app\/)[^`]+\.ts)`/gm)].map((match) => [
    `${match[1]}|${match[2]}`,
    { className: match[1], path: match[2] },
  ]),
);
const actualEntries = new Map();

for (const path of await collectTypeScriptFiles(sourceRoot)) {
  const source = await readFile(path, 'utf8');
  const normalizedPath = relative(workspace, path).replaceAll('\\', '/');

  for (const match of source.matchAll(/@Component\s*\([\s\S]*?\)\s*export class\s+(\w+)/g)) {
    actualEntries.set(`${match[1]}|${normalizedPath}`, {
      className: match[1],
      path: normalizedPath,
    });
  }
}

const missing = [...actualEntries]
  .filter(([key]) => !inventoryEntries.has(key))
  .map(([, value]) => value);
const stale = [...inventoryEntries]
  .filter(([key]) => !actualEntries.has(key))
  .map(([, value]) => value);

if (missing.length > 0 || stale.length > 0) {
  console.error('Component inventory check failed.');
  if (missing.length > 0) console.error(`Missing: ${JSON.stringify(missing, null, 2)}`);
  if (stale.length > 0) console.error(`Stale: ${JSON.stringify(stale, null, 2)}`);
  process.exitCode = 1;
} else {
  console.log(
    `Component inventory check passed for ${actualEntries.size} Angular component classes.`,
  );
}

async function collectTypeScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);

      if (entry.isDirectory()) return collectTypeScriptFiles(path);
      return extname(path) === '.ts' && !path.endsWith('.spec.ts') ? [path] : [];
    }),
  );

  return files.flat();
}
