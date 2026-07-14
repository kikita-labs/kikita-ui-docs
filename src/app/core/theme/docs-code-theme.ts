import { DocsThemeMode } from './docs-theme-mode';

export type DocsCodeThemeType = 'light' | 'dark';

export interface DocsCodeThemeOption {
  readonly id: string;
  readonly label: string;
  readonly type: DocsCodeThemeType;
}

/** Curated themes keep user choice while avoiding one lazy chunk per Shiki catalog entry. */
export const DOCS_CODE_THEME_OPTIONS: readonly DocsCodeThemeOption[] = [
  { id: 'dark-plus', label: 'Dark Plus', type: 'dark' },
  { id: 'dracula', label: 'Dracula', type: 'dark' },
  { id: 'github-dark-default', label: 'GitHub Dark Default', type: 'dark' },
  { id: 'github-dark-high-contrast', label: 'GitHub Dark High Contrast', type: 'dark' },
  { id: 'github-light', label: 'GitHub Light', type: 'light' },
  { id: 'github-light-high-contrast', label: 'GitHub Light High Contrast', type: 'light' },
  { id: 'light-plus', label: 'Light Plus', type: 'light' },
  { id: 'min-light', label: 'Min Light', type: 'light' },
] as const;

export const DOCS_DEFAULT_CODE_THEME_ID_BY_MODE: Readonly<Record<DocsThemeMode, string>> = {
  [DocsThemeMode.Light]: 'github-light',
  [DocsThemeMode.Dark]: 'github-dark-default',
};

export function docsCodeThemeOptionsForMode(mode: DocsThemeMode): readonly DocsCodeThemeOption[] {
  const type: DocsCodeThemeType = mode === DocsThemeMode.Dark ? 'dark' : 'light';

  return DOCS_CODE_THEME_OPTIONS.filter((option) => option.type === type);
}

export function findDocsCodeThemeOption(id: string): DocsCodeThemeOption {
  return DOCS_CODE_THEME_OPTIONS.find((option) => option.id === id) ?? DOCS_CODE_THEME_OPTIONS[0];
}
