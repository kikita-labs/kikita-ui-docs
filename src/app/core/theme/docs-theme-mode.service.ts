import { effect, inject, Injectable, signal } from '@angular/core';

import { DocsMediaService } from '@core/platform/media';
import { DocsStorageService } from '@core/platform/storage';

import { DocsThemeMode } from './docs-theme-mode';
import { DOCS_THEME_STORAGE_KEY } from './docs-theme-storage-key';

@Injectable({ providedIn: 'root' })
export class DocsThemeModeService {
  private readonly media = inject(DocsMediaService);
  private readonly storage = inject(DocsStorageService);
  private readonly modeState = signal(this.readInitialMode());

  public readonly mode = this.modeState.asReadonly();

  constructor() {
    effect(() => {
      this.storage.write(DOCS_THEME_STORAGE_KEY, this.mode(), (mode) => mode);
    });
  }

  public toggle(): void {
    this.modeState.update((mode) =>
      mode === DocsThemeMode.Dark ? DocsThemeMode.Light : DocsThemeMode.Dark,
    );
  }

  private readInitialMode(): DocsThemeMode {
    const storedMode = this.storage.read(DOCS_THEME_STORAGE_KEY, (value) =>
      value === DocsThemeMode.Light || value === DocsThemeMode.Dark ? value : null,
    );

    if (storedMode.ok && storedMode.value !== null) {
      return storedMode.value;
    }

    if (!storedMode.ok && storedMode.reason === 'invalid') {
      this.storage.remove(DOCS_THEME_STORAGE_KEY);
    }

    return this.media.prefersDarkScheme() ? DocsThemeMode.Dark : DocsThemeMode.Light;
  }
}
