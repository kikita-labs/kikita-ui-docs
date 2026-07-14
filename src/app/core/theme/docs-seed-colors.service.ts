import { effect, inject, Injectable, signal } from '@angular/core';

import { DocsStorageService } from '@core/platform/storage';

import {
  createDocsTheme,
  DOCS_DEFAULT_SEED_COLORS,
  type DocsSeedColorName,
  type DocsSeedColors,
  parseDocsSeedColors,
} from './docs-seed-colors';
import { DOCS_SEED_COLORS_STORAGE_KEY } from './docs-theme-storage-key';

@Injectable({ providedIn: 'root' })
export class DocsSeedColorsService {
  private readonly storage = inject(DocsStorageService);
  private readonly seedColorsState = signal<DocsSeedColors>(this.readInitialSeedColors());

  public readonly seedColors = this.seedColorsState.asReadonly();

  constructor() {
    effect(() => {
      this.storage.write(DOCS_SEED_COLORS_STORAGE_KEY, this.seedColors(), JSON.stringify);
    });
  }

  public set(name: DocsSeedColorName, seed: string): void {
    const nextSeedColors: DocsSeedColors = {
      ...this.seedColors(),
      [name]: seed,
    };

    if (this.isValid(nextSeedColors)) {
      this.seedColorsState.set(nextSeedColors);
    }
  }

  public reset(): void {
    this.seedColorsState.set(DOCS_DEFAULT_SEED_COLORS);
  }

  private readInitialSeedColors(): DocsSeedColors {
    const storedSeedColors = this.storage.read(DOCS_SEED_COLORS_STORAGE_KEY, parseDocsSeedColors);

    if (storedSeedColors.ok && storedSeedColors.value !== null) {
      return storedSeedColors.value;
    }

    if (!storedSeedColors.ok && storedSeedColors.reason === 'invalid') {
      this.storage.remove(DOCS_SEED_COLORS_STORAGE_KEY);
    }

    return DOCS_DEFAULT_SEED_COLORS;
  }

  private isValid(seedColors: DocsSeedColors): boolean {
    try {
      createDocsTheme(seedColors);

      return true;
    } catch {
      return false;
    }
  }
}
