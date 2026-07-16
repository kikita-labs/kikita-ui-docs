import { existsSync } from 'node:fs';
import { readdir, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

import { collectAgentEntries } from './agent-surface/collect-agent-entries.mjs';
import { parseApiSchemaRows } from './agent-surface/parse-api-schema.mjs';
import { splitMarkdownSections } from './agent-surface/parse-markdown-sections.mjs';
import { renderAgentManifest } from './agent-surface/render-agent-manifest.mjs';
import { renderAgentMarkdown } from './agent-surface/render-agent-markdown.mjs';
import { renderLlmsFullTxt, renderLlmsTxt } from './agent-surface/render-llms-txt.mjs';
import { renderMcpData } from './agent-surface/render-mcp-data.mjs';

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
  const contentByMarkdownPath = new Map();

  for (const entry of allEntries) {
    const context =
      entry.kind === 'home' ? { allEntries } : await buildEntryContext(entry, workspace);
    const content = renderAgentMarkdown(entry, context);

    outputs.set(resolve(workspace, entry.markdownPath), content);
    contentByMarkdownPath.set(entry.markdownPath, content);
  }

  outputs.set(resolve(workspace, 'public/llms.txt'), renderLlmsTxt(allEntries));
  outputs.set(
    resolve(workspace, 'public/llms-full.txt'),
    renderLlmsFullTxt(allEntries, contentByMarkdownPath),
  );
  outputs.set(
    resolve(workspace, 'public/llms/agent-manifest.json'),
    renderAgentManifest(allEntries),
  );
  outputs.set(
    resolve(workspace, 'mcp/generated/kikita-agent-data.json'),
    renderMcpData(allEntries, contentByMarkdownPath),
  );

  const staleOutputs = await findStaleOutputs(outputs);

  if (staleOutputs.length === 0 && (await allCurrent(outputs))) {
    console.log(`Agent surface is current (${outputs.size} files).`);
    return;
  }

  if (CHECK_MODE) {
    console.error('Agent surface is stale. Run "node tools/generate-agent-surface.mjs".');
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

  console.log(`Generated ${outputs.size} agent surface files.`);
}

async function allCurrent(outputs) {
  for (const [outputPath, content] of outputs) {
    if (!existsSync(outputPath)) return false;
    if ((await readFile(outputPath, 'utf8')) !== content) return false;
  }

  return true;
}

async function buildEntryContext(entry, workspaceRoot) {
  if (entry.kind === 'foundation') {
    return {
      foundationSections: await collectFoundationSections(entry, workspaceRoot),
    };
  }

  if (entry.kind === 'resource' && entry.slug === 'ai-support') {
    return {
      resourceSections: await collectResourceSections(entry, workspaceRoot),
    };
  }

  if (entry.kind !== 'component') return {};

  const apiRows = entry.apiSchemaPath
    ? parseApiSchemaRows(await readFile(resolve(workspaceRoot, entry.apiSchemaPath), 'utf8'))
    : [];
  const sourceDocSections = entry.sourceDocPath
    ? splitMarkdownSections(await readFile(resolve(workspaceRoot, entry.sourceDocPath), 'utf8'))
    : new Map();
  const exampleSources = await collectExampleSources(entry, workspaceRoot);

  return { apiRows, exampleSources, sourceDocSections };
}

async function collectExampleSources(entry, workspaceRoot) {
  const sourcePath = resolve(
    workspaceRoot,
    'src/app/generated/example-sources',
    `${entry.slug}.generated.ts`,
  );

  if (!existsSync(sourcePath)) return new Map();

  const sourceModule = await readFile(sourcePath, 'utf8');
  const objectSource = extractAssignedObject(sourceModule);

  if (!objectSource) return new Map();

  return new Map(Object.entries(evaluateGeneratedLiteral(objectSource)));
}

async function collectFoundationSections(entry, workspaceRoot) {
  const pageRoot = resolve(workspaceRoot, 'src/app/pages/foundations', entry.slug);

  return collectPageSections(
    resolve(pageRoot, `${entry.slug}-page.html`),
    resolve(pageRoot, `${entry.slug}-page.ts`),
    resolve(pageRoot, `${entry.slug}.docs-content.ts`),
  );
}

async function collectResourceSections(entry, workspaceRoot) {
  const pageRoot = resolve(workspaceRoot, 'src/app/pages', entry.slug);

  return collectPageSections(
    resolve(pageRoot, `${entry.slug}-page.html`),
    resolve(pageRoot, `${entry.slug}-page.ts`),
    resolve(pageRoot, `${entry.slug}.docs-content.ts`),
  );
}

async function collectPageSections(pageHtmlPath, pageTsPath, contentTsPath) {
  if (!existsSync(pageHtmlPath)) return [];

  const pageHtml = await readFile(pageHtmlPath, 'utf8');
  const pageTs = existsSync(pageTsPath) ? await readFile(pageTsPath, 'utf8') : '';
  const contentTs = existsSync(contentTsPath) ? await readFile(contentTsPath, 'utf8') : '';
  const propertyConstants = parseReadonlyPropertyConstants(pageTs);
  const exportedConstants = parseExportedArrayConstants(contentTs);
  const sections = [];
  const sectionPattern = /<app-doc-section\s+([\s\S]*?)>([\s\S]*?)<\/app-doc-section>/g;

  for (const match of pageHtml.matchAll(sectionPattern)) {
    const [, rawAttrs, body] = match;
    const heading = readHtmlAttribute(rawAttrs, 'heading');
    const description = readHtmlAttribute(rawAttrs, 'description');

    if (!heading) continue;

    sections.push({
      heading,
      description,
      codeTabs: readBoundArray(body, 'tabs', propertyConstants, exportedConstants),
      apiRows: readBoundArray(body, 'rows', propertyConstants, exportedConstants),
    });
  }

  return sections;
}

function readHtmlAttribute(rawAttrs, name) {
  const match = rawAttrs.match(new RegExp(`${name}="([^"]*)"`));

  return match?.[1] ?? '';
}

function readBoundArray(body, binding, propertyConstants, exportedConstants) {
  const match = body.match(new RegExp(`\\[${binding}\\]="([^"]+)"`));
  const propertyName = match?.[1];
  const constantName = propertyName ? propertyConstants.get(propertyName) : undefined;

  return constantName ? (exportedConstants.get(constantName) ?? []) : [];
}

function parseReadonlyPropertyConstants(source) {
  const constants = new Map();
  const propertyPattern =
    /(?:public|protected|private)?\s*readonly\s+(\w+)\s*=\s*([A-Z0-9_]+)\s*;/g;

  for (const match of source.matchAll(propertyPattern)) {
    constants.set(match[1], match[2]);
  }

  return constants;
}

function parseExportedArrayConstants(source) {
  const constants = new Map();
  const exportPattern = /export const ([A-Z0-9_]+)\s*=\s*\[/g;

  for (const match of source.matchAll(exportPattern)) {
    const arraySource = extractBracketLiteral(source, match.index + match[0].lastIndexOf('['));

    if (arraySource) {
      constants.set(match[1], evaluateGeneratedLiteral(arraySource));
    }
  }

  return constants;
}

function extractAssignedObject(source) {
  const assignmentIndex = source.indexOf('= {');

  if (assignmentIndex === -1) return undefined;

  return extractBracketLiteral(source, assignmentIndex + 2);
}

function extractBracketLiteral(source, startIndex) {
  const opener = source[startIndex];
  const closer = opener === '{' ? '}' : ']';
  let depth = 0;
  let quote = '';
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === quote) {
        quote = '';
      }

      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }

    if (character === opener) depth += 1;
    if (character === closer) depth -= 1;

    if (depth === 0) {
      return source.slice(startIndex, index + 1);
    }
  }

  return undefined;
}

function evaluateGeneratedLiteral(source) {
  return Function(`"use strict"; return (${source});`)();
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

    if (entry.kind === 'component' && entry.status === 'available' && !entry.sourceDocPath) {
      failures.push(`available component "${entry.slug}" is missing sourceDocPath`);
    }

    if (entry.kind === 'component' && entry.status === 'available' && !entry.apiSchemaPath) {
      failures.push(`available component "${entry.slug}" is missing apiSchemaPath`);
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
