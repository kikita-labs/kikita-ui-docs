import { DocsThemeMode } from './docs-theme-mode';

export type DocsCodeThemeType = 'light' | 'dark';

export interface DocsCodeThemeOption {
  readonly id: string;
  readonly label: string;
  readonly type: DocsCodeThemeType;
}

export const DOCS_CODE_THEME_OPTIONS: readonly DocsCodeThemeOption[] = [
  { id: 'andromeeda', label: 'Andromeeda', type: 'dark' },
  { id: 'aurora-x', label: 'Aurora X', type: 'dark' },
  { id: 'ayu-dark', label: 'Ayu Dark', type: 'dark' },
  { id: 'ayu-light', label: 'Ayu Light', type: 'light' },
  { id: 'ayu-mirage', label: 'Ayu Mirage', type: 'dark' },
  { id: 'catppuccin-frappe', label: 'Catppuccin Frappe', type: 'dark' },
  { id: 'catppuccin-latte', label: 'Catppuccin Latte', type: 'light' },
  { id: 'catppuccin-macchiato', label: 'Catppuccin Macchiato', type: 'dark' },
  { id: 'catppuccin-mocha', label: 'Catppuccin Mocha', type: 'dark' },
  { id: 'dark-plus', label: 'Dark Plus', type: 'dark' },
  { id: 'dracula', label: 'Dracula', type: 'dark' },
  { id: 'dracula-soft', label: 'Dracula Soft', type: 'dark' },
  { id: 'everforest-dark', label: 'Everforest Dark', type: 'dark' },
  { id: 'everforest-light', label: 'Everforest Light', type: 'light' },
  { id: 'github-dark', label: 'GitHub Dark', type: 'dark' },
  { id: 'github-dark-default', label: 'GitHub Dark Default', type: 'dark' },
  { id: 'github-dark-dimmed', label: 'GitHub Dark Dimmed', type: 'dark' },
  { id: 'github-dark-high-contrast', label: 'GitHub Dark High Contrast', type: 'dark' },
  { id: 'github-light', label: 'GitHub Light', type: 'light' },
  { id: 'github-light-default', label: 'GitHub Light Default', type: 'light' },
  { id: 'github-light-high-contrast', label: 'GitHub Light High Contrast', type: 'light' },
  { id: 'gruvbox-dark-hard', label: 'Gruvbox Dark Hard', type: 'dark' },
  { id: 'gruvbox-dark-medium', label: 'Gruvbox Dark Medium', type: 'dark' },
  { id: 'gruvbox-dark-soft', label: 'Gruvbox Dark Soft', type: 'dark' },
  { id: 'gruvbox-light-hard', label: 'Gruvbox Light Hard', type: 'light' },
  { id: 'gruvbox-light-medium', label: 'Gruvbox Light Medium', type: 'light' },
  { id: 'gruvbox-light-soft', label: 'Gruvbox Light Soft', type: 'light' },
  { id: 'horizon', label: 'Horizon', type: 'dark' },
  { id: 'horizon-bright', label: 'Horizon Bright', type: 'light' },
  { id: 'houston', label: 'Houston', type: 'dark' },
  { id: 'kanagawa-dragon', label: 'Kanagawa Dragon', type: 'dark' },
  { id: 'kanagawa-lotus', label: 'Kanagawa Lotus', type: 'light' },
  { id: 'kanagawa-wave', label: 'Kanagawa Wave', type: 'dark' },
  { id: 'laserwave', label: 'Laserwave', type: 'dark' },
  { id: 'light-plus', label: 'Light Plus', type: 'light' },
  { id: 'material-theme', label: 'Material Theme', type: 'dark' },
  { id: 'material-theme-darker', label: 'Material Theme Darker', type: 'dark' },
  { id: 'material-theme-lighter', label: 'Material Theme Lighter', type: 'light' },
  { id: 'material-theme-ocean', label: 'Material Theme Ocean', type: 'dark' },
  { id: 'material-theme-palenight', label: 'Material Theme Palenight', type: 'dark' },
  { id: 'min-dark', label: 'Min Dark', type: 'dark' },
  { id: 'min-light', label: 'Min Light', type: 'light' },
  { id: 'monokai', label: 'Monokai', type: 'dark' },
  { id: 'night-owl', label: 'Night Owl', type: 'dark' },
  { id: 'night-owl-light', label: 'Night Owl Light', type: 'light' },
  { id: 'nord', label: 'Nord', type: 'dark' },
  { id: 'one-dark-pro', label: 'One Dark Pro', type: 'dark' },
  { id: 'one-light', label: 'One Light', type: 'light' },
  { id: 'plastic', label: 'Plastic', type: 'dark' },
  { id: 'poimandres', label: 'Poimandres', type: 'dark' },
  { id: 'red', label: 'Red', type: 'dark' },
  { id: 'rose-pine', label: 'Rosé Pine', type: 'dark' },
  { id: 'rose-pine-dawn', label: 'Rosé Pine Dawn', type: 'light' },
  { id: 'rose-pine-moon', label: 'Rosé Pine Moon', type: 'dark' },
  { id: 'slack-dark', label: 'Slack Dark', type: 'dark' },
  { id: 'slack-ochin', label: 'Slack Ochin', type: 'light' },
  { id: 'snazzy-light', label: 'Snazzy Light', type: 'light' },
  { id: 'solarized-dark', label: 'Solarized Dark', type: 'dark' },
  { id: 'solarized-light', label: 'Solarized Light', type: 'light' },
  { id: 'synthwave-84', label: 'Synthwave 84', type: 'dark' },
  { id: 'tokyo-night', label: 'Tokyo Night', type: 'dark' },
  { id: 'vesper', label: 'Vesper', type: 'dark' },
  { id: 'vitesse-black', label: 'Vitesse Black', type: 'dark' },
  { id: 'vitesse-dark', label: 'Vitesse Dark', type: 'dark' },
  { id: 'vitesse-light', label: 'Vitesse Light', type: 'light' },
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
