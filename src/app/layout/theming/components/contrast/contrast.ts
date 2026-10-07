import { Component, inject } from '@angular/core';

import { KuiButton, KuiIcon, KuiSegment, KuiSegmented } from '@kikita-labs/ui';

import { DOCS_CONTRAST_OPTIONS, DocsThemeService } from '@core/theme';

@Component({
  selector: 'app-contrast',
  imports: [KuiButton, KuiIcon, KuiSegment, KuiSegmented],
  templateUrl: './contrast.html',
  styleUrl: './contrast.scss',
})
export class Contrast {
  protected readonly theme = inject(DocsThemeService);
  protected readonly options = DOCS_CONTRAST_OPTIONS;

  protected select(id: unknown): void {
    const option = this.options.find((candidate) => candidate.id === id);

    if (option) {
      this.theme.setContrast(option.id);
    }
  }

  protected reset(): void {
    this.theme.resetContrast();
  }
}
