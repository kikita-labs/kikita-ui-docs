import { DOCUMENT, PLATFORM_ID, Service, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DEFAULT_KUI_THEME, createKuiTheme, createKuiThemeStyleSheet } from '@kikita-labs/ui';
import {
  DOCS_CODE_THEME_OPTIONS,
  DOCS_DEFAULT_CODE_THEME_ID_BY_MODE,
  findDocsCodeThemeOption,
} from './docs-code-theme';
import { DocsThemeMode } from './docs-theme-mode';
import {
  DOCS_CODE_THEME_STORAGE_KEY,
  DOCS_SEED_COLORS_STORAGE_KEY,
  DOCS_THEME_STORAGE_KEY,
} from './docs-theme-storage-key';

const KUI_THEME_STYLE_ID = 'kui-theme';

export const DOCS_DEFAULT_SEED_COLORS = {
  primary: '#5b4fe0',
  neutral: '#8f8a80',
  success: '#3f9463',
  warning: '#9a7b2c',
  danger: '#c4443f',
  info: '#3782ad',
} as const;

export type DocsSeedColorName = keyof typeof DOCS_DEFAULT_SEED_COLORS;
export type DocsSeedColors = Readonly<Record<DocsSeedColorName, string>>;
export type DocsCodeThemeIdByMode = Readonly<Record<DocsThemeMode, string>>;

@Service()
export class DocsThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly modeSignal = signal(this.readInitialMode());
  private readonly seedColorsSignal = signal<DocsSeedColors>(this.readInitialSeedColors());
  private readonly codeThemeIdByModeSignal = signal(this.readInitialCodeThemeIdByMode());

  readonly mode = this.modeSignal.asReadonly();
  readonly seedColors = this.seedColorsSignal.asReadonly();
  readonly codeThemeIdByMode = this.codeThemeIdByModeSignal.asReadonly();
  readonly codeThemeId = computed(() => this.codeThemeIdByMode()[this.mode()]);
  readonly isDark = computed(() => this.mode() === DocsThemeMode.Dark);
  readonly toggleLabel = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );
  readonly currentLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));

  constructor() {
    effect(() => {
      this.applyMode(this.mode());
    });

    effect(() => {
      this.applySeedColors(this.seedColors());
    });

    effect(() => {
      this.applyCodeThemeIdByMode(this.codeThemeIdByMode());
    });
  }

  toggle(): void {
    this.modeSignal.update((mode) =>
      mode === DocsThemeMode.Dark ? DocsThemeMode.Light : DocsThemeMode.Dark,
    );
  }

  setSeedColor(name: DocsSeedColorName, seed: string): void {
    const nextSeedColors: DocsSeedColors = {
      ...this.seedColors(),
      [name]: seed,
    };

    if (!this.canCreateTheme(nextSeedColors)) {
      return;
    }

    this.seedColorsSignal.set(nextSeedColors);
  }

  resetSeedColors(): void {
    this.seedColorsSignal.set(DOCS_DEFAULT_SEED_COLORS);
  }

  setCodeThemeId(id: string): void {
    const option = DOCS_CODE_THEME_OPTIONS.find((candidate) => candidate.id === id);

    if (!option) {
      return;
    }

    const mode = option.type === 'dark' ? DocsThemeMode.Dark : DocsThemeMode.Light;

    this.codeThemeIdByModeSignal.update((byMode) => ({ ...byMode, [mode]: id }));
  }

  resetCodeThemeId(): void {
    const mode = this.mode();

    this.codeThemeIdByModeSignal.update((byMode) => ({
      ...byMode,
      [mode]: DOCS_DEFAULT_CODE_THEME_ID_BY_MODE[mode],
    }));
  }

  private readInitialMode(): DocsThemeMode {
    if (!this.isBrowser) {
      return DocsThemeMode.Light;
    }

    const storedMode = this.readStoredMode();

    if (this.isThemeMode(storedMode)) {
      return storedMode;
    }

    const prefersDark =
      this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

    return prefersDark ? DocsThemeMode.Dark : DocsThemeMode.Light;
  }

  private applyMode(mode: DocsThemeMode): void {
    const root = this.document.documentElement;

    root.dataset['kuiTheme'] = mode;
    root.style.colorScheme = mode;

    if (this.isBrowser) {
      try {
        this.document.defaultView?.localStorage.setItem(DOCS_THEME_STORAGE_KEY, mode);
      } catch {
        return;
      }
    }
  }

  private applySeedColors(seedColors: DocsSeedColors): void {
    if (!this.isBrowser) {
      return;
    }

    const theme = this.createTheme(seedColors);
    const existingStyle = this.document.getElementById(KUI_THEME_STYLE_ID);
    const style = existingStyle ?? this.document.createElement('style');

    style.id = KUI_THEME_STYLE_ID;
    style.textContent = createKuiThemeStyleSheet(theme);

    if (!existingStyle) {
      this.document.head.appendChild(style);
    }

    try {
      this.document.defaultView?.localStorage.setItem(
        DOCS_SEED_COLORS_STORAGE_KEY,
        JSON.stringify(seedColors),
      );
    } catch {
      return;
    }
  }

  private readInitialSeedColors(): DocsSeedColors {
    if (!this.isBrowser) {
      return DOCS_DEFAULT_SEED_COLORS;
    }

    const storedSeedColors = this.readStoredSeedColors();

    return storedSeedColors ?? DOCS_DEFAULT_SEED_COLORS;
  }

  private readInitialCodeThemeIdByMode(): DocsCodeThemeIdByMode {
    if (!this.isBrowser) {
      return DOCS_DEFAULT_CODE_THEME_ID_BY_MODE;
    }

    try {
      const storedValue = this.document.defaultView?.localStorage.getItem(
        DOCS_CODE_THEME_STORAGE_KEY,
      );

      if (!storedValue) {
        return DOCS_DEFAULT_CODE_THEME_ID_BY_MODE;
      }

      const parsedValue: unknown = JSON.parse(storedValue);

      return {
        [DocsThemeMode.Light]: this.resolveStoredCodeThemeId(parsedValue, DocsThemeMode.Light),
        [DocsThemeMode.Dark]: this.resolveStoredCodeThemeId(parsedValue, DocsThemeMode.Dark),
      };
    } catch {
      return DOCS_DEFAULT_CODE_THEME_ID_BY_MODE;
    }
  }

  private resolveStoredCodeThemeId(parsedValue: unknown, mode: DocsThemeMode): string {
    const fallback = DOCS_DEFAULT_CODE_THEME_ID_BY_MODE[mode];

    if (typeof parsedValue !== 'object' || parsedValue === null) {
      return fallback;
    }

    const storedId = (parsedValue as Record<string, unknown>)[mode];

    if (typeof storedId !== 'string') {
      return fallback;
    }

    const option = findDocsCodeThemeOption(storedId);
    const expectedType = mode === DocsThemeMode.Dark ? 'dark' : 'light';

    return option.id === storedId && option.type === expectedType ? storedId : fallback;
  }

  private applyCodeThemeIdByMode(byMode: DocsCodeThemeIdByMode): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      this.document.defaultView?.localStorage.setItem(
        DOCS_CODE_THEME_STORAGE_KEY,
        JSON.stringify(byMode),
      );
    } catch {
      return;
    }
  }

  private readStoredMode(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(DOCS_THEME_STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private readStoredSeedColors(): DocsSeedColors | null {
    try {
      const storedValue = this.document.defaultView?.localStorage.getItem(
        DOCS_SEED_COLORS_STORAGE_KEY,
      );

      if (!storedValue) {
        return null;
      }

      const parsedValue: unknown = JSON.parse(storedValue);

      if (!this.isSeedColorRecord(parsedValue)) {
        return null;
      }

      return parsedValue;
    } catch {
      return null;
    }
  }

  private isThemeMode(value: string | null | undefined): value is DocsThemeMode {
    return value === DocsThemeMode.Light || value === DocsThemeMode.Dark;
  }

  private canCreateTheme(seedColors: DocsSeedColors): boolean {
    try {
      this.createTheme(seedColors);

      return true;
    } catch {
      return false;
    }
  }

  private createTheme(seedColors: DocsSeedColors) {
    return createKuiTheme({
      ...DEFAULT_KUI_THEME,
      seeds: {
        ...DEFAULT_KUI_THEME.seeds,
        color: seedColors,
      },
    });
  }

  private isSeedColorRecord(value: unknown): value is DocsSeedColors {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const record = value as Record<DocsSeedColorName, unknown>;

    return (
      (Object.keys(DOCS_DEFAULT_SEED_COLORS) as DocsSeedColorName[]).every(
        (name) => typeof record[name] === 'string',
      ) && this.canCreateTheme(record as DocsSeedColors)
    );
  }
}
