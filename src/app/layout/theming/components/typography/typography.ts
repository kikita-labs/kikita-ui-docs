import { Component, computed, inject } from '@angular/core';

import {
  KuiButton,
  KuiDropdown,
  KuiField,
  KuiIcon,
  KuiLabel,
  KuiOption,
  KuiSelect,
} from '@kikita-labs/ui';

import { docsCodeThemeOptionsForMode, findDocsCodeThemeOption } from '@core/theme';
import { DocsThemeService } from '@core/theme';

@Component({
  selector: 'app-typography',
  imports: [KuiButton, KuiDropdown, KuiField, KuiIcon, KuiLabel, KuiOption, KuiSelect],
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class Typography {
  protected readonly theme = inject(DocsThemeService);
  protected readonly codeThemeOptions = computed(() =>
    docsCodeThemeOptionsForMode(this.theme.mode()),
  );
  protected readonly codeThemeLabelFn = (id: string): string => findDocsCodeThemeOption(id).label;

  protected setCodeThemeId(id: unknown): void {
    if (typeof id === 'string') {
      this.theme.setCodeThemeId(id);
    }
  }

  protected reset(): void {
    this.theme.resetCodeThemeId();
  }
}
