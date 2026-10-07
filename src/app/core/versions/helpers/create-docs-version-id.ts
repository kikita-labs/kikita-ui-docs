/** Docs are versioned by the major of the installed `@kikita-labs/ui`, e.g. `1.8.0` -> `v1`. */
export function createDocsVersionId(packageVersion: string): string {
  return `v${packageVersion.split('.')[0]}`;
}
