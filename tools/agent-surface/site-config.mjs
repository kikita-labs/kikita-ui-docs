/**
 * The deployed production origin, used to build absolute URLs in `llms.txt`/`llms-full.txt`.
 * `.github/workflows/deploy.yml` publishes to GitHub Pages with
 * `--base-href "/${{ github.event.repository.name }}/"`, and this origin is live (verified via
 * `curl https://kikita-labs.github.io/kikita-ui-docs/` returning 200), so absolute canonical URLs
 * are used per `.local-notes/AGENT-SURFACE-SSR-MCP-PLAN.md` Phase 5 ("switch to absolute canonical
 * URLs only when production origin is known").
 */
export const SITE_BASE_URL = 'https://kikita-labs.github.io/kikita-ui-docs';

export function toSiteUrl(sitePath) {
  return `${SITE_BASE_URL}${sitePath}`;
}

export function markdownPathToUrl(markdownPath) {
  return toSiteUrl(markdownPath.replace(/^public/, ''));
}
