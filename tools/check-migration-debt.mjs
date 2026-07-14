import { readdir, readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const sourceRoot = resolve('src');
const allowedExtensions = new Set(['.html', '.scss', '.ts']);
const prohibited = [
  { label: 'Cyrillic or mojibake', pattern: /[\u0400-\u04ff]/ },
  { label: 'architecture TODO', pattern: /\b(?:TODO|FIXME)\b/ },
  { label: 'lint disable', pattern: /eslint-disable/ },
  { label: 'TypeScript suppression', pattern: /@ts-(?:expect-error|ignore|nocheck)/ },
];
const failures = [];

for (const path of await collectFiles(sourceRoot)) {
  const content = await readFile(path, 'utf8');

  for (const rule of prohibited) {
    if (rule.pattern.test(content)) {
      failures.push(`${path.slice(sourceRoot.length + 1)} contains ${rule.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Migration debt check failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(
    'Migration debt check passed: no TODO/FIXME, lint disable, or TypeScript suppression exists under src.',
  );
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(path);
      }

      return allowedExtensions.has(extname(path)) ? [path] : [];
    }),
  );

  return files.flat();
}
