import { existsSync } from 'node:fs';
import { readdir, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

import { collectAgentEntries } from './agent-surface/collect-agent-entries.mjs';
import { parseApiSchemaRows } from './agent-surface/parse-api-schema.mjs';
import { splitMarkdownSections } from './agent-surface/parse-markdown-sections.mjs';
import { renderAgentMarkdown } from './agent-surface/render-agent-markdown.mjs';

const workspace = resolve('.');
const CHECK_MODE = process.argv.includes('--check');
const LLMS_ROOT = resolve(workspace, 'public/llms');

const entries = await collectAgentEntries(workspace);
const consistencyFailures = checkEntryConsistency(entries);

if (consistencyFailures.length > 0) {
  console.error(`Agent surface entry check failed:\n- ${consistencyFailures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  await generateOrCheck(entries);
}

async function generateOrCheck(allEntries) {
  const outputs = new Map();

  for (const entry of allEntries) {
    const context =
      entry.kind === 'home' ? { allEntries } : await buildComponentContext(entry, workspace);

    outputs.set(resolve(workspace, entry.markdownPath), renderAgentMarkdown(entry, context));
  }

  const staleOutputs = await findStaleOutputs(outputs);

  if (staleOutputs.length === 0 && (await allCurrent(outputs))) {
    console.log(`Agent surface Markdown mirrors are current (${outputs.size} files).`);
    return;
  }

  if (CHECK_MODE) {
    console.error(
      'Agent surface Markdown mirrors are stale. Run "node tools/generate-agent-surface.mjs".',
    );
    process.exitCode = 1;
    return;
  }

  for (const [outputPath, content] of outputs) {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, content, 'utf8');
  }

  for (const staleOutput of staleOutputs) {
    await rm(staleOutput);
  }

  console.log(`Generated ${outputs.size} agent surface Markdown files.`);
}

async function allCurrent(outputs) {
  for (const [outputPath, content] of outputs) {
    if (!existsSync(outputPath)) return false;
    if ((await readFile(outputPath, 'utf8')) !== content) return false;
  }

  return true;
}

async function buildComponentContext(entry, workspaceRoot) {
  if (entry.kind !== 'component') return {};

  const apiRows = entry.apiSchemaPath
    ? parseApiSchemaRows(await readFile(resolve(workspaceRoot, entry.apiSchemaPath), 'utf8'))
    : [];
  const sourceDocSections = entry.sourceDocPath
    ? splitMarkdownSections(await readFile(resolve(workspaceRoot, entry.sourceDocPath), 'utf8'))
    : new Map();

  return { apiRows, sourceDocSections };
}

async function findStaleOutputs(outputs) {
  if (!existsSync(LLMS_ROOT)) return [];

  const existingFiles = await collectMarkdownFiles(LLMS_ROOT);

  return existingFiles.filter((filePath) => !outputs.has(filePath));
}

async function collectMarkdownFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (dirEntry) => {
      const entryPath = resolve(root, dirEntry.name);

      if (dirEntry.isDirectory()) return collectMarkdownFiles(entryPath);
      return dirEntry.name.endsWith('.md') ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function checkEntryConsistency(allEntries) {
  const failures = [];

  checkUnique(allEntries, (entry) => entry.route, 'route', failures);
  checkUnique(allEntries, (entry) => entry.markdownPath, 'markdownPath', failures);
  checkUnique(allEntries, (entry) => `${entry.kind}/${entry.slug}`, 'kind/slug', failures);

  for (const entry of allEntries) {
    if (entry.kind === 'component' && !entry.publicImportName) {
      failures.push(`component "${entry.slug}" is missing publicImportName`);
    }

    if (entry.kind === 'component' && !entry.category) {
      failures.push(`component "${entry.slug}" is missing category`);
    }
  }

  return failures;
}

function checkUnique(list, keyFn, label, failures) {
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
