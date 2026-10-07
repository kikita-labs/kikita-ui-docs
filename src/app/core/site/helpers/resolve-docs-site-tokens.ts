import type { DocsSiteTokenValues } from '../interfaces';

/** Replaces the `{{siteUrl}}` and `{{mcpPackage}}` tokens used in version-dependent doc text. */
export function resolveDocsSiteTokens(text: string, values: DocsSiteTokenValues): string {
  return text
    .replaceAll('{{siteUrl}}', values.siteUrl)
    .replaceAll('{{mcpPackage}}', values.mcpPackage);
}
