export interface ShikiHighlighter {
  codeToHtml(code: string, options: { lang: string; theme: string }): string;
  loadTheme(theme: unknown): Promise<void>;
}
