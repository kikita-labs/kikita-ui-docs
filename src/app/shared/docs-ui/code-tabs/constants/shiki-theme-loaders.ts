export const SHIKI_THEME_MODULE_LOADER_BY_NAME: Readonly<
  Record<string, () => Promise<{ default: unknown }>>
> = {
  'dark-plus': () => import('shiki/themes/dark-plus.mjs'),
  dracula: () => import('shiki/themes/dracula.mjs'),
  'github-dark-default': () => import('shiki/themes/github-dark-default.mjs'),
  'github-dark-high-contrast': () => import('shiki/themes/github-dark-high-contrast.mjs'),
  'github-light': () => import('shiki/themes/github-light.mjs'),
  'github-light-high-contrast': () => import('shiki/themes/github-light-high-contrast.mjs'),
  'light-plus': () => import('shiki/themes/light-plus.mjs'),
  'min-light': () => import('shiki/themes/min-light.mjs'),
};
