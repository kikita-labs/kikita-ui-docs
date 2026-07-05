import { DOCUMENT, PLATFORM_ID, Service, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DocsThemeMode } from './docs-theme-mode';
import { DOCS_THEME_STORAGE_KEY } from './docs-theme-storage-key';

@Service()
export class DocsThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly modeSignal = signal(this.readInitialMode());

  readonly mode = this.modeSignal.asReadonly();
  readonly isDark = computed(() => this.mode() === DocsThemeMode.Dark);
  readonly toggleLabel = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );
  readonly currentLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));

  constructor() {
    effect(() => {
      this.applyMode(this.mode());
    });
  }

  toggle(): void {
    this.modeSignal.update((mode) =>
      mode === DocsThemeMode.Dark ? DocsThemeMode.Light : DocsThemeMode.Dark,
    );
  }

  private readInitialMode(): DocsThemeMode {
    if (!this.isBrowser) {
      return DocsThemeMode.Light;
    }

    const storedMode = this.readStoredMode();

    if (this.isThemeMode(storedMode)) {
      return storedMode;
    }

    const prefersDark = this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

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

  private readStoredMode(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(DOCS_THEME_STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private isThemeMode(value: string | null | undefined): value is DocsThemeMode {
    return value === DocsThemeMode.Light || value === DocsThemeMode.Dark;
  }
}
