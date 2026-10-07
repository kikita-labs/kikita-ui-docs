import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

import { readDocsArchive, readDocsSiteConfig, readDocsVersionId } from './docs-site-config.mjs';

/**
 * Builds the complete GitHub Pages site from the latest build and the archived version
 * builds, then writes the files that belong to the whole site: `versions.json`, `sitemap.xml`,
 * and the `404.html` fallback. `actions/deploy-pages` replaces the entire site on every
 * deployment, so every archived version has to be present in this one output directory.
 */
const config = readDocsSiteConfig();
const latestDir = resolve(readOption('--latest') ?? 'dist/kikita-ui-docs/browser');
const archivesDir = resolve(readOption('--archives') ?? '.tmp/archives');
const outDir = resolve(readOption('--out') ?? '_site');
const latestId = readDocsVersionId();
const archived = readDocsArchive();

if (config.versionPathPrefix !== '') {
  throw new Error('The site can only be assembled on the branch that publishes the latest docs.');
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(latestDir, outDir, { recursive: true });

for (const entry of archived) {
  await copyArchivedVersion(entry);
}

const versions = [
  versionEntry(latestId, 'latest', `${config.siteBasePath}/`),
  ...[...archived]
    .sort((left, right) => majorOf(right.id) - majorOf(left.id))
    .map((entry) => versionEntry(entry.id, entry.status, `${config.siteBasePath}/${entry.id}/`)),
];

await writeFile(join(outDir, 'versions.json'), `${JSON.stringify(versions, null, 2)}\n`);
await writeFile(join(outDir, 'sitemap.xml'), await renderSitemap(latestDir));
await cp(join(outDir, 'index.html'), join(outDir, '404.html'));

console.log(
  `Assembled ${outDir}: ${versions.map((version) => version.id).join(', ')} ` +
    `(latest ${latestId}).`,
);

async function copyArchivedVersion(entry) {
  const source = join(archivesDir, entry.id);
  const expectedBase = `${config.siteBasePath}/${entry.id}/`;

  try {
    await stat(join(source, 'index.html'));
  } catch {
    throw new Error(`Archived version ${entry.id} is missing ${join(source, 'index.html')}.`);
  }

  const html = await readFile(join(source, 'index.html'), 'utf8');

  if (!html.includes(`<base href="${expectedBase}"`)) {
    throw new Error(`Archived version ${entry.id} was not built with --base-href ${expectedBase}.`);
  }

  await cp(source, join(outDir, entry.id), { recursive: true });
}

function versionEntry(id, status, path) {
  return { id, label: id, path, status };
}

function majorOf(id) {
  return Number.parseInt(id.slice(1), 10);
}

/** Lists every prerendered page of the latest build; archived versions stay out of the sitemap. */
async function renderSitemap(directory) {
  const files = await listFiles(directory);
  const routes = files
    .map((file) => relative(directory, file).split(sep).join('/'))
    .filter((path) => path === 'index.html' || path.endsWith('/index.html'))
    .map((path) => path.slice(0, -'index.html'.length))
    .sort();
  const urls = routes.map(
    (route) => `${config.siteOrigin}${config.siteBasePath}/${route.replace(/\/$/, '')}`,
  );
  const entries = urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory() ? listFiles(join(directory, entry.name)) : [join(directory, entry.name)],
    ),
  );

  return nested.flat();
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function readOption(name) {
  const index = process.argv.indexOf(name);

  return index === -1 ? undefined : process.argv[index + 1];
}
