import { Component, computed, inject, signal } from '@angular/core';
import {
  KuiButtonDirective,
  KuiColorInputDirective,
  KuiIconButtonDirective,
} from '@kikita-labs/ui';
import {
  DOCS_DEFAULT_SEED_COLORS,
  type DocsSeedColorName,
  DocsThemeService,
} from '../../core/theme/docs-theme.service';

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
  selector: 'app-seed-color-picker',
  imports: [KuiButtonDirective, KuiColorInputDirective, KuiIconButtonDirective],
  templateUrl: './seed-color-picker.html',
  styleUrl: './seed-color-picker.scss',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
})
export class SeedColorPicker {
  protected readonly theme = inject(DocsThemeService);
  protected readonly open = signal(false);
  protected readonly rows = computed<readonly SeedColorRow[]>(() => {
    const colors = this.theme.seedColors();

    return (Object.keys(DOCS_DEFAULT_SEED_COLORS) as DocsSeedColorName[]).map((name) => ({
      name,
      label: SEED_COLOR_LABELS[name],
      value: colors[name],
    }));
  });

  protected toggle(): void {
    this.open.update((open) => !open);
  }

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

  protected handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
    }
  }
}
