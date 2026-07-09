import { Component, computed, inject } from '@angular/core';
import {
  KuiButtonDirective,
  KuiColorInputDirective,
  KuiFieldComponent,
  KuiLabelDirective,
} from '@kikita-labs/ui';
import {
  DOCS_DEFAULT_SEED_COLORS,
  type DocsSeedColorName,
  DocsThemeService,
} from '../../../../core/theme/docs-theme.service';

interface SeedColorRow {
  readonly name: DocsSeedColorName;
  readonly label: string;
  readonly value: string;
}

const SEED_COLOR_LABELS: Readonly<Record<DocsSeedColorName, string>> = {
  primary: 'Primary',
  neutral: 'Neutral',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  info: 'Info',
};

@Component({
  selector: 'app-seed-colors',
  imports: [KuiButtonDirective, KuiColorInputDirective, KuiFieldComponent, KuiLabelDirective],
  templateUrl: './seed-colors.html',
  styleUrl: './seed-colors.scss',
})
export class SeedColors {
  protected readonly theme = inject(DocsThemeService);
  protected readonly rows = computed<readonly SeedColorRow[]>(() => {
    const colors = this.theme.seedColors();

    return (Object.keys(DOCS_DEFAULT_SEED_COLORS) as DocsSeedColorName[]).map((name) => ({
      name,
      label: SEED_COLOR_LABELS[name],
      value: colors[name],
    }));
  });

  protected updateSeedColor(name: DocsSeedColorName, event: Event): void {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    this.theme.setSeedColor(name, input.value.trim());
  }

  protected reset(): void {
    this.theme.resetSeedColors();
  }
}
