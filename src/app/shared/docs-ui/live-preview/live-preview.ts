import { Component, computed, input, signal } from '@angular/core';
import { KuiCardDirective } from '@kikita-labs/ui';

type LivePreviewWidth = 'desktop' | 'mobile';

@Component({
  selector: 'app-live-preview',
  imports: [KuiCardDirective],
  templateUrl: './live-preview.html',
  styleUrl: './live-preview.scss',
})
export class LivePreview {
  readonly previewLabel = input.required<string>();
  readonly description = input<string>();

  protected readonly width = signal<LivePreviewWidth>('desktop');

  protected readonly surfaceClass = computed(() => ({
    'live-preview__surface--mobile': this.width() === 'mobile',
  }));
}
