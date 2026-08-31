import { inject, Service } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { SHIKI_LANGUAGE_BY_TAB, SHIKI_THEME_MODULE_LOADER_BY_NAME } from '../constants';
import { fixLowContrastTokenColors } from '../helpers';
import { type ShikiHighlighter } from '../interfaces';
import { type CodeTabLanguage } from '../types';

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
    await highlighter.loadTheme(fixLowContrastTokenColors(themeName, themeModule.default));
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
