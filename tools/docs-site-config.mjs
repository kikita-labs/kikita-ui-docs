import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CONFIG_PATH = resolve('src/app/core/site/constants/docs-site-config.json');
const ARCHIVE_PATH = resolve('docs-archive.json');
const PACKAGE_JSON_PATH = resolve('node_modules/@kikita-labs/ui/package.json');

/**
 * Publication settings of this branch. `versionPathPrefix` is empty for the branch that
 * publishes the latest version at the site root, and `/<version id>` for a release branch
 * whose build is archived under that directory.
 */
export function readDocsSiteConfig() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));

  return {
    siteOrigin: config.siteOrigin,
    siteBasePath: config.siteBasePath,
    versionPathPrefix: config.versionPathPrefix,
  };
}

/** Points this branch at its own `/<version id>/` directory (used when cutting a release branch). */
export function writeVersionPathPrefix(versionPathPrefix) {
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));

  writeFileSync(
    CONFIG_PATH,
    `${JSON.stringify({ ...config, versionPathPrefix }, null, 2)}
`,
  );
}

export function readDocsArchive() {
  return JSON.parse(readFileSync(ARCHIVE_PATH, 'utf8')).archived;
}

/** Docs are versioned by the major of the installed `@kikita-labs/ui`: `1.8.0` -> `v1`. */
export function readDocsVersionId() {
  const { version } = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf8'));

  return `v${version.split('.')[0]}`;
}

/** Absolute origin plus the path this branch is published under, without a trailing slash. */
export function resolveSiteBaseUrl(config = readDocsSiteConfig()) {
  return `${config.siteOrigin}${config.siteBasePath}${config.versionPathPrefix}`;
}

/**
 * MCP package specifier that matches this branch: `@latest` for the latest docs, and the
 * `latest-<major>` maintenance tag for an archived major (npm rejects tag names that begin with a
 * number or `v`). Mirrors `createMcpPackageSpecifier` in `src/app/core/site`.
 */
export function resolveMcpPackageSpecifier(config = readDocsSiteConfig()) {
  const major = /^\/v(\d+)$/.exec(config.versionPathPrefix)?.[1];

  return `@kikita-labs/ui-mcp@${major ? `latest-${major}` : 'latest'}`;
}

/** Value for `ng build --base-href`. */
export function resolveBaseHref(config = readDocsSiteConfig()) {
  return `${config.siteBasePath}${config.versionPathPrefix}/`;
}
