import { Component, computed, input, signal } from '@angular/core';
import {
  KuiCardDirective,
  KuiSegmentDirective,
  KuiSegmentedComponent,
  type KuiThemeMode,
} from '@kikita-labs/ui';

type LivePreviewWidth = 'desktop' | 'mobile';

@Component({
  selector: 'app-live-preview',
  imports: [KuiCardDirective, KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './live-preview.html',
  styleUrl: './live-preview.scss',
})
export class LivePreview {
  readonly title = input.required<string>();
  readonly description = input<string>();

  protected readonly theme = signal<KuiThemeMode>('light');
  protected readonly width = signal<LivePreviewWidth>('desktop');

  protected readonly surfaceClass = computed(() => ({
    'live-preview__surface--mobile': this.width() === 'mobile',
  }));

  protected selectTheme(value: string): void {
    if (value === 'light' || value === 'dark') {
      this.theme.set(value);
    }
  }

  protected selectWidth(value: string): void {
    if (value === 'desktop' || value === 'mobile') {
      this.width.set(value);
    }
  }
}
