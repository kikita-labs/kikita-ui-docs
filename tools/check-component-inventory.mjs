import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const workspace = resolve('.');
const sourceRoot = resolve(workspace, 'src/app');
const actualEntries = new Map();
const duplicateEntries = [];

for (const path of await collectTypeScriptFiles(sourceRoot)) {
  const source = await readFile(path, 'utf8');
  const normalizedPath = relative(workspace, path).replaceAll('\\', '/');

  for (const match of source.matchAll(/@Component\s*\([\s\S]*?\)\s*export class\s+(\w+)/g)) {
    const key = `${match[1]}|${normalizedPath}`;

    if (actualEntries.has(key)) {
      duplicateEntries.push({ className: match[1], path: normalizedPath });
    }

    actualEntries.set(key, {
      className: match[1],
      path: normalizedPath,
    });
  }
}

if (duplicateEntries.length > 0) {
  console.error('Component inventory check failed.');
  console.error(`Duplicate entries: ${JSON.stringify(duplicateEntries, null, 2)}`);
  process.exitCode = 1;
} else {
  console.log(
    `Component inventory check passed for ${actualEntries.size} tracked Angular component classes.`,
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
