import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

import { resolveBaseHref, resolveSiteBaseUrl } from './docs-site-config.mjs';

/**
 * Verifies that a production build can be served from the sub-path it was built for:
 * every prerendered page carries the expected `<base href>` and its own canonical URL, no
 * reference escapes the base path, and every referenced asset or internal page exists.
 */
const outputDir = resolve(readOption('--dir') ?? 'dist/kikita-ui-docs/browser');
const baseHref = readOption('--base-href') ?? resolveBaseHref();
const siteBaseUrl = readOption('--site-url') ?? resolveSiteBaseUrl();
/** App-shell copies that are not canonical pages and carry no canonical link. */
const NON_PAGE_FILES = new Set(['404.html', 'index.csr.html']);
/** Demo links rendered inside component examples; they are sample data, not site navigation. */
const DEMO_HREFS = new Set(['/components', '/users/nikita.png']);
const failures = [];
const htmlFiles = await listFiles(outputDir, (file) => file.endsWith('.html'));

if (htmlFiles.length === 0) {
  fail(`No HTML files found in ${outputDir}. Run a production build first.`);
}

for (const file of htmlFiles) {
  await checkHtmlFile(file);
}

await checkAbsoluteUrls('llms.txt');
await checkAbsoluteUrls('llms-full.txt');

if (failures.length > 0) {
  console.error(
    `Versioned output check failed (${baseHref}):\n- ${failures.slice(0, 40).join('\n- ')}`,
  );

  if (failures.length > 40) {
    console.error(`...and ${failures.length - 40} more.`);
  }

  process.exitCode = 1;
} else {
  console.log(`Versioned output is valid for ${baseHref} (${htmlFiles.length} HTML files).`);
}

async function checkHtmlFile(file) {
  const html = await readFile(file, 'utf8');
  const name = relative(outputDir, file).split(sep).join('/');
  const baseMatch = /<base href="([^"]*)"/.exec(html);

  if (baseMatch?.[1] !== baseHref) {
    fail(`${name}: <base href> is "${baseMatch?.[1]}", expected "${baseHref}".`);
  }

  if (!NON_PAGE_FILES.has(name)) {
    checkCanonical(name, html);
  }

  for (const [, reference] of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    await checkReference(name, reference);
  }
}

function checkCanonical(name, html) {
  const route = name === 'index.html' ? '' : dirname(name);
  const expected = `${siteBaseUrl}/${route === '.' ? '' : route}`;
  const match = /<link rel="canonical" href="([^"]*)"/.exec(html);

  if (!match) {
    fail(`${name}: missing <link rel="canonical">.`);
  } else if (match[1] !== expected) {
    fail(`${name}: canonical is "${match[1]}", expected "${expected}".`);
  }
}

async function checkReference(name, reference) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(reference)) {
    return;
  }

  const path = reference.split(/[?#]/)[0];

  if (DEMO_HREFS.has(path)) {
    return;
  }

  const isBaseRelative = path.startsWith('/') ? path.startsWith(baseHref) : true;

  if (!isBaseRelative) {
    fail(`${name}: "${reference}" escapes the base path ${baseHref}.`);
    return;
  }

  const sitePath = path.startsWith('/') ? path.slice(baseHref.length) : path;

  if (!(await targetExists(sitePath))) {
    fail(`${name}: "${reference}" does not resolve to a file in the build.`);
  }
}

async function targetExists(sitePath) {
  const target = resolve(outputDir, sitePath);

  if (target !== outputDir && !target.startsWith(`${outputDir}${sep}`)) {
    return false;
  }

  try {
    const details = await stat(target);

    return details.isFile() || (await isFile(join(target, 'index.html')));
  } catch {
    return false;
  }
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function checkAbsoluteUrls(fileName) {
  let content;

  try {
    content = await readFile(join(outputDir, fileName), 'utf8');
  } catch {
    fail(`${fileName} is missing from the build.`);
    return;
  }

  const origin = new URL(siteBaseUrl).origin;
  const siteRoot = `${origin}/${siteBaseUrl.split('/')[3]}`;

  for (const [url] of content.matchAll(/https:\/\/[^\s)>"']+/g)) {
    if (url.startsWith(siteRoot) && url !== siteBaseUrl && !url.startsWith(`${siteBaseUrl}/`)) {
      fail(`${fileName}: "${url}" is outside ${siteBaseUrl}/.`);
    }
  }
}

async function listFiles(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);

      return entry.isDirectory() ? listFiles(path, predicate) : predicate(path) ? [path] : [];
    }),
  );

  return nested.flat();
}

function readOption(name) {
  const index = process.argv.indexOf(name);

  return index === -1 ? undefined : process.argv[index + 1];
}

function fail(message) {
  failures.push(message);
}
