import { inject, Service } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { type CodeTabLanguage } from './code-tab-language';

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

@Service()
export class CodeHighlighterService {
  private readonly sanitizer = inject(DomSanitizer);
  private highlighterPromise: Promise<ShikiHighlighter> | null = null;
  private readonly loadedThemeNames = new Set<string>(['github-dark-default']);

  public async highlight(
    code: string,
    language: CodeTabLanguage,
    codeThemeId: string,
  ): Promise<SafeHtml> {
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

    const loadThemeModule = SHIKI_THEME_MODULE_LOADER_BY_NAME[themeName];

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
