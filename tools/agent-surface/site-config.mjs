import { resolveMcpPackageSpecifier, resolveSiteBaseUrl } from '../docs-site-config.mjs';

/**
 * Absolute URL this branch is published under, used to build absolute links in
 * `llms.txt`/`llms-full.txt` and the MCP bundle. It comes from the shared publication config
 * (`docs-site-config.json`), so an archived version links to its own `/<version id>/` copy
 * instead of the latest docs at the site root.
 */
export const SITE_BASE_URL = resolveSiteBaseUrl();

export function toSiteUrl(sitePath) {
  return `${SITE_BASE_URL}${sitePath}`;
}

export function markdownPathToUrl(markdownPath) {
  return toSiteUrl(markdownPath.replace(/^public/, ''));
}

/**
 * Resolves the `{{siteUrl}}` and `{{mcpPackage}}` tokens used in version-dependent page text,
 * matching `resolveDocsSiteTokens` in `src/app/core/site`.
 */
export function resolveSiteTokens(text) {
  return text
    .replaceAll('{{siteUrl}}', SITE_BASE_URL)
    .replaceAll('{{mcpPackage}}', resolveMcpPackageSpecifier());
}
