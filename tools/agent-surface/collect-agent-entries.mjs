import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const LIBRARY_REPO = 'kikita-labs/kikita-ui';

/**
 * Derives the agent surface entry list from `DOCS_REGISTRY` inputs: component/foundation/resource
 * docs manifests, API schema files, the published library's release docs, and the installed
 * package version.
 *
 * Parses `.docs-manifest.ts` source text with the same regex approach as
 * `tools/generate-example-sources.mjs` instead of importing the TypeScript modules, so this stays a
 * plain Node script with no Angular/TypeScript compilation step and never risks evaluating a
 * `loadPage`/`loadPlayground` dynamic import. See `tools/agent-surface/agent-doc-entry.ts` for the
 * output shape.
 *
 * Component source docs come from the library's GitHub release tag matching the installed
 * `@kikita-labs/ui` version (`raw.githubusercontent.com/${LIBRARY_REPO}/v<version>/docs/<slug>.md`),
 * never from a local sibling checkout -- this repo must build and generate on its own, with only
 * network access to the public library repo.
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
    sourceDocUrl: null,
    sourceDocContent: null,
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
        sourceDocUrl: null,
        sourceDocContent: null,
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
      const sourceDoc = await fetchLibrarySourceDoc(packageVersion, slug);

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
        sourceDocUrl: sourceDoc.url,
        sourceDocContent: sourceDoc.content,
        publicImportName: matchRequired(source, /\bimportName:\s*'([^']+)'/, manifestPath),
        category: matchRequired(source, /\bcategory:\s*'([^']+)'/, manifestPath),
        exampleIds: matchExampleIds(source),
        apiSchemaPath: existsSync(apiSchemaPath) ? toPosixRelative(workspace, apiSchemaPath) : null,
        hasPlayground: /\bloadPlayground:/.test(source),
      };
    }),
  );
}

/**
 * Fetches a component's authored doc from the published library's GitHub release tag, which
 * always matches the installed `@kikita-labs/ui` version (`kikita-labs/kikita-ui` tags every
 * release `v<version>`). Returns `{ url: null, content: null }` when the library repo has no doc
 * for this slug (a 404 is expected, not an error). Any other fetch failure throws, since a silent
 * `null` there would make the agent surface look complete when it actually couldn't reach GitHub.
 */
async function fetchLibrarySourceDoc(packageVersion, slug) {
  const tag = `v${packageVersion}`;
  const rawUrl = `https://raw.githubusercontent.com/${LIBRARY_REPO}/${tag}/docs/${slug}.md`;
  const response = await fetch(rawUrl);

  if (response.status === 404) {
    return { url: null, content: null };
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${rawUrl}: ${response.status} ${response.statusText}`);
  }

  return {
    url: `https://github.com/${LIBRARY_REPO}/blob/${tag}/docs/${slug}.md`,
    content: await response.text(),
  };
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
      route: `/resources/${slug}`,
      markdownPath: `public/llms/resources/${slug}.md`,
      htmlUrlPath: `/resources/${slug}`,
      status: 'available',
      packageName,
      packageVersion,
      sourceDocUrl: null,
      sourceDocContent: null,
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
