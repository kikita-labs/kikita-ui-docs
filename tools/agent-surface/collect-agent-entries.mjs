import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

/**
 * Derives the agent surface entry list from `DOCS_REGISTRY` inputs: component/foundation/resource
 * docs manifests, API schema files, sibling library docs, and the installed package version.
 *
 * Parses `.docs-manifest.ts` source text with the same regex approach as
 * `tools/generate-example-sources.mjs` instead of importing the TypeScript modules, so this stays a
 * plain Node script with no Angular/TypeScript compilation step and never risks evaluating a
 * `loadPage`/`loadPlayground` dynamic import. See `tools/agent-surface/agent-doc-entry.ts` for the
 * output shape.
 *
 * @returns {Promise<import('./agent-doc-entry.js').AgentDocEntry[]>}
 */
export async function collectAgentEntries(workspace = resolve('.')) {
  const packageName = '@kikita-labs/ui';
  const packageVersion = await readInstalledPackageVersion(workspace, packageName);
  const entries = [];

  entries.push(await collectHomeEntry(workspace, packageName, packageVersion));
  entries.push(...(await collectFoundationEntries(workspace, packageName, packageVersion)));
  entries.push(...(await collectComponentEntries(workspace, packageName, packageVersion)));
  entries.push(...(await collectResourceEntries(workspace, packageName, packageVersion)));

  return entries;
}

async function readInstalledPackageVersion(workspace, packageName) {
  const packageJsonPath = resolve(workspace, 'node_modules', packageName, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  return packageJson.version;
}

async function collectHomeEntry(workspace, packageName, packageVersion) {
  const manifestPath = resolve(workspace, 'src/app/pages/home/home.docs-manifest.ts');
  const source = await readFile(manifestPath, 'utf8');

  return {
    kind: 'home',
    slug: 'home',
    label: matchRequired(source, /\blabel:\s*'([^']+)'/, manifestPath),
    description: matchRequired(source, /\bdescription:\s*'([^']+)'/, manifestPath),
    route: '/',
    markdownPath: 'public/llms/index.md',
    htmlUrlPath: '/',
    status: 'available',
    packageName,
    packageVersion,
    sourceDocPath: null,
    publicImportName: null,
    category: null,
    exampleIds: [],
    apiSchemaPath: null,
    hasPlayground: false,
  };
}

async function collectFoundationEntries(workspace, packageName, packageVersion) {
  const root = resolve(workspace, 'src/app/pages/foundations');
  const slugs = await listFeatureSlugs(root);

  return Promise.all(
    slugs.map(async (slug) => {
      const manifestPath = resolve(root, slug, `${slug}.docs-manifest.ts`);
      const source = await readFile(manifestPath, 'utf8');

      return {
        kind: 'foundation',
        slug,
        label: matchRequired(source, /\blabel:\s*'([^']+)'/, manifestPath),
        description: matchRequired(source, /\bdescription:\s*'([^']+)'/, manifestPath),
        route: `/foundations/${slug}`,
        markdownPath: `public/llms/foundations/${slug}.md`,
        htmlUrlPath: `/foundations/${slug}`,
        status: 'available',
        packageName,
        packageVersion,
        sourceDocPath: null,
        publicImportName: null,
        category: null,
        exampleIds: [],
        apiSchemaPath: null,
        hasPlayground: false,
      };
    }),
  );
}

async function collectComponentEntries(workspace, packageName, packageVersion) {
  const root = resolve(workspace, 'src/app/pages/components');
  const slugs = await listFeatureSlugs(root);

  return Promise.all(
    slugs.map(async (slug) => {
      const featureRoot = resolve(root, slug);
      const manifestPath = resolve(featureRoot, `${slug}.docs-manifest.ts`);
      const source = await readFile(manifestPath, 'utf8');
      const status = matchRequired(source, /\bstatus:\s*'([^']+)'/, manifestPath);
      const apiSchemaPath = resolve(featureRoot, `${slug}.api-schema.ts`);
      const sourceDocPath = resolve(workspace, '../kikita-ui/docs', `${slug}.md`);

      return {
        kind: 'component',
        slug,
        label: matchRequired(source, /\blabel:\s*'([^']+)'/, manifestPath),
        description: matchRequired(source, /\bdescription:\s*'([^']+)'/, manifestPath),
        route: `/components/${slug}`,
        markdownPath: `public/llms/components/${slug}.md`,
        htmlUrlPath: `/components/${slug}`,
        status,
        packageName,
        packageVersion,
        sourceDocPath: existsSync(sourceDocPath) ? toPosixRelative(workspace, sourceDocPath) : null,
        publicImportName: matchRequired(source, /\bimportName:\s*'([^']+)'/, manifestPath),
        category: matchRequired(source, /\bcategory:\s*'([^']+)'/, manifestPath),
        exampleIds: matchExampleIds(source),
        apiSchemaPath: existsSync(apiSchemaPath) ? toPosixRelative(workspace, apiSchemaPath) : null,
        hasPlayground: /\bloadPlayground:/.test(source),
      };
    }),
  );
}

async function collectResourceEntries(workspace, packageName, packageVersion) {
  const pagesRoot = resolve(workspace, 'src/app/pages');
  const excluded = new Set(['components', 'foundations', 'home', 'draft', 'not-found']);
  const entries = await readdir(pagesRoot, { withFileTypes: true });
  const resourceSlugs = entries
    .filter((entry) => entry.isDirectory() && !excluded.has(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const resources = [];

  for (const slug of resourceSlugs) {
    const manifestPath = resolve(pagesRoot, slug, `${slug}.docs-manifest.ts`);

    if (!existsSync(manifestPath)) continue;

    const source = await readFile(manifestPath, 'utf8');

    if (matchRequired(source, /\bkind:\s*'([^']+)'/, manifestPath) !== 'resource') continue;

    resources.push({
      kind: 'resource',
      slug,
      label: matchRequired(source, /\blabel:\s*'([^']+)'/, manifestPath),
      description: matchRequired(source, /\bdescription:\s*'([^']+)'/, manifestPath),
      route: `/${slug}`,
      markdownPath: `public/llms/resources/${slug}.md`,
      htmlUrlPath: `/${slug}`,
      status: 'available',
      packageName,
      packageVersion,
      sourceDocPath: null,
      publicImportName: null,
      category: null,
      exampleIds: matchExampleIds(source),
      apiSchemaPath: null,
      hasPlayground: false,
    });
  }

  return resources;
}

async function listFeatureSlugs(root) {
  const entries = await readdir(root, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function matchExampleIds(source) {
  const match = source.match(/\bexampleIds:\s*\[([\s\S]*?)\]/);

  if (!match) return [];

  return [...match[1].matchAll(/'([^']+)'/g)].map((idMatch) => idMatch[1]);
}

function matchRequired(source, pattern, filePath) {
  const match = source.match(pattern);

  if (!match) {
    throw new Error(`Could not find pattern ${pattern} in ${filePath}.`);
  }

  return match[1];
}

function toPosixRelative(workspace, absolutePath) {
  return relative(workspace, absolutePath).replaceAll('\\', '/');
}
