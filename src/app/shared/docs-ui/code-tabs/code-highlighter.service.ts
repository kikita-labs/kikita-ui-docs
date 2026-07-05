import { Service, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeTabLanguage } from './code-tab-language';

interface ShikiHighlighter {
  codeToHtml(code: string, options: { lang: string; theme: string }): string;
}

const SHIKI_THEME = 'github-dark-default';

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

@Service()
export class CodeHighlighterService {
  private readonly sanitizer = inject(DomSanitizer);
  private highlighterPromise: Promise<ShikiHighlighter> | null = null;

  async highlight(code: string, language: CodeTabLanguage): Promise<SafeHtml> {
    const highlighter = await this.getHighlighter();
    const html = highlighter.codeToHtml(code, {
      lang: SHIKI_LANGUAGE_BY_TAB[language],
      theme: SHIKI_THEME,
    });

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private getHighlighter(): Promise<ShikiHighlighter> {
    this.highlighterPromise ??= this.createHighlighter();

    return this.highlighterPromise;
  }

  private async createHighlighter(): Promise<ShikiHighlighter> {
    const [core, engine, theme, bash, css, html, json, markdown, scss, typescript] =
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
      themes: [theme.default],
    });
  }
}
