import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { type KuiThemeContrast } from '@kikita-labs/ui';

import { DocsMediaService } from '@core/platform/media';
import { DocsStorageService } from '@core/platform/storage';

import { DOCS_DEFAULT_CONTRAST, parseDocsContrast } from './docs-contrast';
import { DOCS_CONTRAST_STORAGE_KEY } from './docs-theme-storage-key';

/**
 * Holds the visitor's explicit contrast choice. Without a choice the document root carries no
 * `data-kui-contrast` attribute, so the library's `prefers-contrast: more` rule keeps working.
 */
@Injectable({ providedIn: 'root' })
export class DocsContrastService {
  private readonly media = inject(DocsMediaService);
  private readonly storage = inject(DocsStorageService);
  private readonly choiceState = signal<KuiThemeContrast | null>(this.readInitialChoice());

  /** The explicit choice, or `null` while the visitor has not chosen. */
  public readonly choice = this.choiceState.asReadonly();
  /** The profile the page is drawn with. */
  public readonly contrast = computed<KuiThemeContrast>(
    () => this.choice() ?? (this.media.prefersMoreContrast() ? 'strict' : DOCS_DEFAULT_CONTRAST),
  );

  constructor() {
    effect(() => {
      const choice = this.choice();

      if (choice === null) {
        this.storage.remove(DOCS_CONTRAST_STORAGE_KEY);
      } else {
        this.storage.write(DOCS_CONTRAST_STORAGE_KEY, choice, (value) => value);
      }
    });
  }

  public set(contrast: KuiThemeContrast): void {
    this.choiceState.set(contrast);
  }

  public reset(): void {
    this.choiceState.set(null);
  }

  private readInitialChoice(): KuiThemeContrast | null {
    const stored = this.storage.read(DOCS_CONTRAST_STORAGE_KEY, parseDocsContrast);

    if (stored.ok) {
      return stored.value;
    }

    if (stored.reason === 'invalid') {
      this.storage.remove(DOCS_CONTRAST_STORAGE_KEY);
    }

    return null;
  }
}
