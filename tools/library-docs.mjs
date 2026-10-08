import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const LIBRARY_PACKAGE_NAME = '@kikita-labs/ui';
export const LIBRARY_REPO = 'kikita-labs/kikita-ui';

/** Version of the installed `@kikita-labs/ui` package, which also names the library release tag. */
export async function readInstalledLibraryVersion(workspace = resolve('.')) {
  const packageJsonPath = resolve(workspace, 'node_modules', LIBRARY_PACKAGE_NAME, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  return packageJson.version;
}

/**
 * Fetches a component's authored doc from the published library's GitHub release tag, which
 * always matches the installed `@kikita-labs/ui` version (`kikita-labs/kikita-ui` tags every
 * release `v<version>`). Returns `{ url: null, content: null }` when the library repo has no doc
 * for this slug (a 404 is expected, not an error). Any other fetch failure throws, since a silent
 * `null` there would make generated output look complete when it actually couldn't reach GitHub.
 *
 * Results are cached per process so several generators can share one fetch per doc.
 */
const docCache = new Map();

/**
 * Pages whose library doc is shared with sibling pages. The chart family is documented once in
 * `docs/chart.md`; each chart type has its own docs page, so those slugs read the shared doc.
 */
export const LIBRARY_DOC_ALIASES = {
  'bar-chart': 'chart',
  'line-chart': 'chart',
  'scatter-chart': 'chart',
  'donut-chart': 'chart',
};

/** The library doc name for a docs page slug: the alias when the doc is shared, else the slug. */
export function resolveLibraryDocSlug(slug) {
  return LIBRARY_DOC_ALIASES[slug] ?? slug;
}

export function fetchLibrarySourceDoc(packageVersion, pageSlug) {
  const slug = resolveLibraryDocSlug(pageSlug);
  const key = `${packageVersion}/${slug}`;

  if (!docCache.has(key)) {
    docCache.set(key, requestLibrarySourceDoc(packageVersion, slug));
  }

  return docCache.get(key);
}

async function requestLibrarySourceDoc(packageVersion, slug) {
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
