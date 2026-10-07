/**
 * Absolute URL of a page inside the build that is being rendered, used for `rel="canonical"`.
 * Every prerendered page is a directory index, and GitHub Pages redirects `/page` to `/page/`, so
 * the canonical URL is the slash form: it is the final URL that answers 200 without a redirect.
 */
export function createDocsCanonicalUrl(origin: string, baseHref: string, pagePath: string): string {
  const base = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
  const page = pagePath.replace(/^\/+|\/+$/g, '');

  return `${origin}${base}${page ? `${page}/` : ''}`;
}
