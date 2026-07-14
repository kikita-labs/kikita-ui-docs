import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { DocsStorageService } from '@core/platform/storage';

import {
  DOCS_CODE_THEME_OPTIONS,
  DOCS_DEFAULT_CODE_THEME_ID_BY_MODE,
  findDocsCodeThemeOption,
} from './docs-code-theme';
import { DocsThemeMode } from './docs-theme-mode';
import { DocsThemeModeService } from './docs-theme-mode.service';
import { DOCS_CODE_THEME_STORAGE_KEY } from './docs-theme-storage-key';

export type DocsCodeThemeIdByMode = Readonly<Record<DocsThemeMode, string>>;

@Injectable({ providedIn: 'root' })
export class DocsCodeThemePreferenceService {
  private readonly modeService = inject(DocsThemeModeService);
  private readonly storage = inject(DocsStorageService);
  private readonly codeThemeIdByModeState = signal(this.readInitialPreference());

  public readonly codeThemeIdByMode = this.codeThemeIdByModeState.asReadonly();
  public readonly codeThemeId = computed(() => this.codeThemeIdByMode()[this.modeService.mode()]);

  constructor() {
    effect(() => {
      this.storage.write(DOCS_CODE_THEME_STORAGE_KEY, this.codeThemeIdByMode(), JSON.stringify);
    });
  }

  public set(id: string): void {
    const option = DOCS_CODE_THEME_OPTIONS.find((candidate) => candidate.id === id);

    if (!option) {
      return;
    }

    const mode = option.type === 'dark' ? DocsThemeMode.Dark : DocsThemeMode.Light;

    this.codeThemeIdByModeState.update((byMode) => ({ ...byMode, [mode]: id }));
  }

  public resetCurrentMode(): void {
    const mode = this.modeService.mode();

    this.codeThemeIdByModeState.update((byMode) => ({
      ...byMode,
      [mode]: DOCS_DEFAULT_CODE_THEME_ID_BY_MODE[mode],
    }));
  }

  private readInitialPreference(): DocsCodeThemeIdByMode {
    const storedPreference = this.storage.read(DOCS_CODE_THEME_STORAGE_KEY, (storedValue) => {
      try {
        const parsedValue: unknown = JSON.parse(storedValue);

        return this.resolvePreference(parsedValue);
      } catch {
        return null;
      }
    });

    if (storedPreference.ok && storedPreference.value !== null) {
      return storedPreference.value;
    }

    if (!storedPreference.ok && storedPreference.reason === 'invalid') {
      this.storage.remove(DOCS_CODE_THEME_STORAGE_KEY);
    }

    return DOCS_DEFAULT_CODE_THEME_ID_BY_MODE;
  }

  private resolvePreference(value: unknown): DocsCodeThemeIdByMode | null {
    if (typeof value !== 'object' || value === null) {
      return null;
    }

    const lightId = Reflect.get(value, DocsThemeMode.Light);
    const darkId = Reflect.get(value, DocsThemeMode.Dark);

    return {
      [DocsThemeMode.Light]: this.resolveId(lightId, DocsThemeMode.Light),
      [DocsThemeMode.Dark]: this.resolveId(darkId, DocsThemeMode.Dark),
    };
  }

  private resolveId(value: unknown, mode: DocsThemeMode): string {
    const fallback = DOCS_DEFAULT_CODE_THEME_ID_BY_MODE[mode];

    if (typeof value !== 'string') {
      return fallback;
    }

    const option = findDocsCodeThemeOption(value);
    const expectedType = mode === DocsThemeMode.Dark ? 'dark' : 'light';

    return option.id === value && option.type === expectedType ? value : fallback;
  }
}
