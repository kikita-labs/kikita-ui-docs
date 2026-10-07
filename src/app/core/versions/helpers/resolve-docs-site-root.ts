/**
 * Derives the site root from the build's base href. An archived build is served from
 * `<site root><version id>/`, the latest build from the site root itself.
 */
export function resolveDocsSiteRoot(baseHref: string, versionId: string): string {
  const base = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
  const versionSuffix = `/${versionId}/`;

  return base.endsWith(versionSuffix) ? base.slice(0, -versionId.length - 1) : base;
}
