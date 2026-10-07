import { type KuiThemeContrast } from '@kikita-labs/ui';

/**
 * Contrast profile of the docs site. `soft` draws quieter control borders; a visitor whose system
 * asks for more contrast still gets `strict` while no explicit choice is stored.
 */
export const DOCS_DEFAULT_CONTRAST = 'soft' satisfies KuiThemeContrast;

export const DOCS_CONTRAST_OPTIONS = [
  { id: 'strict', label: 'Strict' },
  { id: 'soft', label: 'Soft' },
] as const satisfies readonly { readonly id: KuiThemeContrast; readonly label: string }[];

export function parseDocsContrast(storedValue: string): KuiThemeContrast | null {
  return DOCS_CONTRAST_OPTIONS.find((option) => option.id === storedValue)?.id ?? null;
}
