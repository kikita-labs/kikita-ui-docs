import { resolve } from 'node:path';

import { collectAgentEntries } from './agent-surface/collect-agent-entries.mjs';

const workspace = resolve('.');
const entries = await collectAgentEntries(workspace);
const failures = [];

checkUnique(entries, (entry) => entry.route, 'route');
checkUnique(entries, (entry) => entry.markdownPath, 'markdownPath');
checkUnique(entries, (entry) => `${entry.kind}/${entry.slug}`, 'kind/slug');

for (const entry of entries) {
  if (entry.kind === 'component' && !entry.publicImportName) {
    failures.push(`component "${entry.slug}" is missing publicImportName`);
  }

  if (entry.kind === 'component' && !entry.category) {
    failures.push(`component "${entry.slug}" is missing category`);
  }
}

if (failures.length > 0) {
  console.error(`Agent surface entry check failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  const byKind = entries.reduce((counts, entry) => {
    counts[entry.kind] = (counts[entry.kind] ?? 0) + 1;
    return counts;
  }, {});

  console.log(
    `Agent surface entries are consistent (${entries.length} total: ${Object.entries(byKind)
      .map(([kind, count]) => `${count} ${kind}`)
      .join(', ')}).`,
  );
}

function checkUnique(list, keyFn, label) {
  const seen = new Map();

  for (const entry of list) {
    const key = keyFn(entry);

    if (seen.has(key)) {
      failures.push(`duplicate ${label} "${key}" (${seen.get(key)} and ${entry.slug})`);
    } else {
      seen.set(key, entry.slug);
    }
  }
}
