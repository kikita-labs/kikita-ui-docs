import { computed, effect, inject, Injectable } from '@angular/core';

import { createKuiThemeStyleSheet, type KuiThemeContrast } from '@kikita-labs/ui';

import { DocsDocumentStyleService } from '@core/platform/document';

import { DocsCodeThemePreferenceService } from './docs-code-theme-preference.service';
import { DocsContrastService } from './docs-contrast.service';
import { createDocsTheme, type DocsSeedColorName } from './docs-seed-colors';
import { DocsSeedColorsService } from './docs-seed-colors.service';
import { DocsThemeMode } from './docs-theme-mode';
import { DocsThemeModeService } from './docs-theme-mode.service';

const KUI_THEME_STYLE_ID = 'kui-theme';

@Injectable({ providedIn: 'root' })
export class DocsThemeService {
  private readonly codeThemePreference = inject(DocsCodeThemePreferenceService);
  private readonly contrastState = inject(DocsContrastService);
  private readonly documentStyle = inject(DocsDocumentStyleService);
  private readonly modeState = inject(DocsThemeModeService);
  private readonly seedColorState = inject(DocsSeedColorsService);

  public readonly mode = this.modeState.mode;
  public readonly seedColors = this.seedColorState.seedColors;
  public readonly contrast = this.contrastState.contrast;
  public readonly codeThemeIdByMode = this.codeThemePreference.codeThemeIdByMode;
  public readonly codeThemeId = this.codeThemePreference.codeThemeId;
  public readonly isDark = computed(() => this.mode() === DocsThemeMode.Dark);
  public readonly toggleLabel = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );
  public readonly currentLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));

  constructor() {
    effect(() => {
      this.documentStyle.setRootTheme(this.mode());
    });

    effect(() => {
      this.documentStyle.setRootContrast(this.contrastState.choice());
    });

    effect(() => {
      const theme = createDocsTheme(this.seedColors());

      this.documentStyle.applyStyleSheet(KUI_THEME_STYLE_ID, createKuiThemeStyleSheet(theme));
    });
  }

  public toggle(): void {
    this.modeState.toggle();
  }

  public setSeedColor(name: DocsSeedColorName, seed: string): void {
    this.seedColorState.set(name, seed);
  }

  public resetSeedColors(): void {
    this.seedColorState.reset();
  }

  public setContrast(contrast: KuiThemeContrast): void {
    this.contrastState.set(contrast);
  }

  public resetContrast(): void {
    this.contrastState.reset();
  }

  public setCodeThemeId(id: string): void {
    this.codeThemePreference.set(id);
  }

  public resetCodeThemeId(): void {
    this.codeThemePreference.resetCurrentMode();
  }
}
