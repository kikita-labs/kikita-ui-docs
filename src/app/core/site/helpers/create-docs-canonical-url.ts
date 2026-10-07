/** Absolute URL of a page inside the build that is being rendered, used for `rel="canonical"`. */
export function createDocsCanonicalUrl(origin: string, baseHref: string, pagePath: string): string {
  const base = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;

  return `${origin}${base}${pagePath.replace(/^\/+/, '')}`;
}
