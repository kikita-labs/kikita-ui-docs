import { Component, computed, inject } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiIconComponent,
  KuiLabelDirective,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

import { docsCodeThemeOptionsForMode, findDocsCodeThemeOption } from '@core/theme';
import { DocsThemeService } from '@core/theme';

@Component({
  selector: 'app-typography',
  imports: [
    KuiButtonDirective,
    KuiDropdownComponent,
    KuiFieldComponent,
    KuiIconComponent,
    KuiLabelDirective,
    KuiOptionDirective,
    KuiSelectDirective,
  ],
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
