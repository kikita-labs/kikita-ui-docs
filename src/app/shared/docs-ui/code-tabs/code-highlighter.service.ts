import { Service, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeTabLanguage } from './code-tab-language';

interface ShikiHighlighter {
  codeToHtml(code: string, options: { lang: string; theme: string }): string;
  loadTheme(theme: unknown): Promise<void>;
}

const SHIKI_LANGUAGE_BY_TAB: Record<CodeTabLanguage, string> = {
  bash: 'bash',
  css: 'css',
  html: 'angular-html',
  json: 'json',
  md: 'markdown',
  scss: 'scss',
  text: 'text',
  ts: 'typescript',
};

const THEME_MODULE_LOADER_BY_NAME: Record<string, () => Promise<{ default: unknown }>> = {
  andromeeda: () => import('shiki/themes/andromeeda.mjs'),
  'aurora-x': () => import('shiki/themes/aurora-x.mjs'),
  'ayu-dark': () => import('shiki/themes/ayu-dark.mjs'),
  'ayu-light': () => import('shiki/themes/ayu-light.mjs'),
  'ayu-mirage': () => import('shiki/themes/ayu-mirage.mjs'),
  'catppuccin-frappe': () => import('shiki/themes/catppuccin-frappe.mjs'),
  'catppuccin-latte': () => import('shiki/themes/catppuccin-latte.mjs'),
  'catppuccin-macchiato': () => import('shiki/themes/catppuccin-macchiato.mjs'),
  'catppuccin-mocha': () => import('shiki/themes/catppuccin-mocha.mjs'),
  'dark-plus': () => import('shiki/themes/dark-plus.mjs'),
  dracula: () => import('shiki/themes/dracula.mjs'),
  'dracula-soft': () => import('shiki/themes/dracula-soft.mjs'),
  'everforest-dark': () => import('shiki/themes/everforest-dark.mjs'),
  'everforest-light': () => import('shiki/themes/everforest-light.mjs'),
  'github-dark': () => import('shiki/themes/github-dark.mjs'),
  'github-dark-default': () => import('shiki/themes/github-dark-default.mjs'),
  'github-dark-dimmed': () => import('shiki/themes/github-dark-dimmed.mjs'),
  'github-dark-high-contrast': () => import('shiki/themes/github-dark-high-contrast.mjs'),
  'github-light': () => import('shiki/themes/github-light.mjs'),
  'github-light-default': () => import('shiki/themes/github-light-default.mjs'),
  'github-light-high-contrast': () => import('shiki/themes/github-light-high-contrast.mjs'),
  'gruvbox-dark-hard': () => import('shiki/themes/gruvbox-dark-hard.mjs'),
  'gruvbox-dark-medium': () => import('shiki/themes/gruvbox-dark-medium.mjs'),
  'gruvbox-dark-soft': () => import('shiki/themes/gruvbox-dark-soft.mjs'),
  'gruvbox-light-hard': () => import('shiki/themes/gruvbox-light-hard.mjs'),
  'gruvbox-light-medium': () => import('shiki/themes/gruvbox-light-medium.mjs'),
  'gruvbox-light-soft': () => import('shiki/themes/gruvbox-light-soft.mjs'),
  horizon: () => import('shiki/themes/horizon.mjs'),
  'horizon-bright': () => import('shiki/themes/horizon-bright.mjs'),
  houston: () => import('shiki/themes/houston.mjs'),
  'kanagawa-dragon': () => import('shiki/themes/kanagawa-dragon.mjs'),
  'kanagawa-lotus': () => import('shiki/themes/kanagawa-lotus.mjs'),
  'kanagawa-wave': () => import('shiki/themes/kanagawa-wave.mjs'),
  laserwave: () => import('shiki/themes/laserwave.mjs'),
  'light-plus': () => import('shiki/themes/light-plus.mjs'),
  'material-theme': () => import('shiki/themes/material-theme.mjs'),
  'material-theme-darker': () => import('shiki/themes/material-theme-darker.mjs'),
  'material-theme-lighter': () => import('shiki/themes/material-theme-lighter.mjs'),
  'material-theme-ocean': () => import('shiki/themes/material-theme-ocean.mjs'),
  'material-theme-palenight': () => import('shiki/themes/material-theme-palenight.mjs'),
  'min-dark': () => import('shiki/themes/min-dark.mjs'),
  'min-light': () => import('shiki/themes/min-light.mjs'),
  monokai: () => import('shiki/themes/monokai.mjs'),
  'night-owl': () => import('shiki/themes/night-owl.mjs'),
  'night-owl-light': () => import('shiki/themes/night-owl-light.mjs'),
  nord: () => import('shiki/themes/nord.mjs'),
  'one-dark-pro': () => import('shiki/themes/one-dark-pro.mjs'),
  'one-light': () => import('shiki/themes/one-light.mjs'),
  plastic: () => import('shiki/themes/plastic.mjs'),
  poimandres: () => import('shiki/themes/poimandres.mjs'),
  red: () => import('shiki/themes/red.mjs'),
  'rose-pine': () => import('shiki/themes/rose-pine.mjs'),
  'rose-pine-dawn': () => import('shiki/themes/rose-pine-dawn.mjs'),
  'rose-pine-moon': () => import('shiki/themes/rose-pine-moon.mjs'),
  'slack-dark': () => import('shiki/themes/slack-dark.mjs'),
  'slack-ochin': () => import('shiki/themes/slack-ochin.mjs'),
  'snazzy-light': () => import('shiki/themes/snazzy-light.mjs'),
  'solarized-dark': () => import('shiki/themes/solarized-dark.mjs'),
  'solarized-light': () => import('shiki/themes/solarized-light.mjs'),
  'synthwave-84': () => import('shiki/themes/synthwave-84.mjs'),
  'tokyo-night': () => import('shiki/themes/tokyo-night.mjs'),
  vesper: () => import('shiki/themes/vesper.mjs'),
  'vitesse-black': () => import('shiki/themes/vitesse-black.mjs'),
  'vitesse-dark': () => import('shiki/themes/vitesse-dark.mjs'),
  'vitesse-light': () => import('shiki/themes/vitesse-light.mjs'),
};

@Service()
export class CodeHighlighterService {
  private readonly sanitizer = inject(DomSanitizer);
  private highlighterPromise: Promise<ShikiHighlighter> | null = null;
  private readonly loadedThemeNames = new Set<string>(['github-dark-default']);

  async highlight(code: string, language: CodeTabLanguage, codeThemeId: string): Promise<SafeHtml> {
    const highlighter = await this.getHighlighter();

    await this.ensureThemeLoaded(highlighter, codeThemeId);

    const html = highlighter.codeToHtml(code, {
      lang: SHIKI_LANGUAGE_BY_TAB[language],
      theme: codeThemeId,
    });

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private async ensureThemeLoaded(highlighter: ShikiHighlighter, themeName: string): Promise<void> {
    if (this.loadedThemeNames.has(themeName)) {
      return;
    }

    const loadThemeModule = THEME_MODULE_LOADER_BY_NAME[themeName];

    if (!loadThemeModule) {
      return;
    }

    const themeModule = await loadThemeModule();
    await highlighter.loadTheme(themeModule.default);
    this.loadedThemeNames.add(themeName);
  }

  private getHighlighter(): Promise<ShikiHighlighter> {
    this.highlighterPromise ??= this.createHighlighter();

    return this.highlighterPromise;
  }

  private async createHighlighter(): Promise<ShikiHighlighter> {
    const [core, engine, defaultTheme, bash, css, html, json, markdown, scss, typescript] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
        import('shiki/themes/github-dark-default.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/angular-html.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/markdown.mjs'),
        import('shiki/langs/scss.mjs'),
        import('shiki/langs/typescript.mjs'),
      ]);

    return core.createHighlighterCore({
      engine: engine.createJavaScriptRegexEngine(),
      langs: [
        bash.default,
        css.default,
        html.default,
        json.default,
        markdown.default,
        scss.default,
        typescript.default,
      ],
      themes: [defaultTheme.default],
    });
  }
}
