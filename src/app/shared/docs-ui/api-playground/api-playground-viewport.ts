import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  KuiCardDirective,
  KuiFieldAffixDirective,
  KuiFieldComponent,
  KuiIconButtonDirective,
  KuiInputDirective,
  KuiSegmentDirective,
  KuiSegmentedComponent,
} from '@kikita-labs/ui';

type PlaygroundViewport = 'mobile' | 'tablet' | 'desktop';

const VIEWPORT_WIDTH: Record<PlaygroundViewport, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1160,
};

const MIN_PREVIEW_WIDTH = 320;
const MAX_PREVIEW_WIDTH = 1160;

@Component({
  selector: 'app-api-playground-viewport',
  imports: [
    KuiCardDirective,
    KuiFieldAffixDirective,
    KuiFieldComponent,
    KuiIconButtonDirective,
    KuiInputDirective,
    KuiSegmentDirective,
    KuiSegmentedComponent,
  ],
  templateUrl: './api-playground-viewport.html',
  styleUrl: './api-playground-viewport.scss',
})
export class ApiPlaygroundViewport {
  private readonly document = inject(DOCUMENT);
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');

  readonly previewLabel = input('Live preview');

  protected readonly previewTheme = signal<'dark' | 'light'>('dark');
  protected readonly previewIsDark = computed(() => this.previewTheme() === 'dark');
  protected readonly previewThemeToggleLabel = computed(() =>
    this.previewIsDark() ? 'Use light preview theme' : 'Use dark preview theme',
  );
  protected readonly previewWidth = signal(MAX_PREVIEW_WIDTH);
  protected readonly activePreset = computed<PlaygroundViewport | ''>(() => {
    const width = this.previewWidth();
    const desktopWidth = this.maxPreviewWidth();

    if (width === VIEWPORT_WIDTH.mobile) {
      return 'mobile';
    }

    if (width === VIEWPORT_WIDTH.tablet) {
      return 'tablet';
    }

    if (width === desktopWidth) {
      return 'desktop';
    }

    return '';
  });
  protected readonly viewportPresets: readonly {
    readonly key: PlaygroundViewport;
    readonly label: string;
  }[] = [
    { key: 'mobile', label: `Mobile - ${VIEWPORT_WIDTH.mobile}` },
    { key: 'tablet', label: `Tablet - ${VIEWPORT_WIDTH.tablet}` },
    { key: 'desktop', label: 'Desktop - Full' },
  ];

  constructor() {
    afterNextRender(() => {
      this.previewWidth.set(this.maxPreviewWidth());
    });
  }

  protected setPreviewWidthFromEvent(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const value = raw === '' ? MIN_PREVIEW_WIDTH : Number(raw);

    this.previewWidth.set(this.clampPreviewWidth(value));
  }

  protected setViewportPreset(preset: PlaygroundViewport | ''): void {
    if (preset) {
      const width = preset === 'desktop' ? this.maxPreviewWidth() : VIEWPORT_WIDTH[preset];

      this.previewWidth.set(this.clampPreviewWidth(width));
    }
  }

  protected togglePreviewTheme(): void {
    this.previewTheme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  protected startResize(event: PointerEvent): void {
    event.preventDefault();

    const view = this.document.defaultView;

    if (!view) {
      return;
    }

    const startX = event.clientX;
    const startWidth = this.previewWidth();
    const onMove = (moveEvent: PointerEvent) => {
      const next = startWidth + (moveEvent.clientX - startX);

      this.previewWidth.set(this.clampPreviewWidth(next));
    };
    const onUp = () => {
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', onUp);
      view.removeEventListener('pointercancel', onUp);
    };

    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointercancel', onUp);
  }

  protected previewWidthValue(): string {
    return String(this.previewWidth());
  }

  protected maxPreviewWidth(): number {
    const stageWidth = this.stage()?.nativeElement.clientWidth;

    if (!stageWidth) {
      return MAX_PREVIEW_WIDTH;
    }

    return Math.max(MIN_PREVIEW_WIDTH, Math.min(MAX_PREVIEW_WIDTH, stageWidth - 64));
  }

  private clampPreviewWidth(value: number): number {
    const normalized = Number.isFinite(value) ? value : MIN_PREVIEW_WIDTH;

    return Math.round(Math.min(this.maxPreviewWidth(), Math.max(MIN_PREVIEW_WIDTH, normalized)));
  }
}
