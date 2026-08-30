import { inject, Service } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { type CodeTabLanguage } from './code-tab-language';

interface ShikiHighlighter {
  codeToHtml(code: string, options: { lang: string; theme: string }): string;
  loadTheme(theme: unknown): Promise<void>;
}

interface ShikiTokenColorSetting {
  scope?: string | readonly string[];
  settings?: { foreground?: string };
}

interface ShikiThemeLike {
  tokenColors?: readonly ShikiTokenColorSetting[];
}

// github-light's generic "variable" scope (#e36209) has a 3.49:1 contrast ratio against
// its white background -- below the 4.5:1 WCAG AA minimum -- and fails automated a11y
// checks on any code sample using a plain identifier (e.g. a class field declaration).
// Darken it in place after load; every other rule in the upstream theme stays untouched.
const LOW_CONTRAST_FOREGROUND_OVERRIDES_BY_THEME: Readonly<Record<string, Record<string, string>>> =
  {
    'github-light': { '#e36209': '#c2410c' },
  };

function fixLowContrastTokenColors(themeId: string, theme: unknown): unknown {
  const overrides = LOW_CONTRAST_FOREGROUND_OVERRIDES_BY_THEME[themeId];

  if (!overrides) {
    return theme;
  }

  for (const rule of (theme as ShikiThemeLike).tokenColors ?? []) {
    const foreground = rule.settings?.foreground?.toLowerCase();
    const replacement = foreground && overrides[foreground];

    if (replacement && rule.settings) {
      rule.settings.foreground = replacement;
    }
  }

  return theme;
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
