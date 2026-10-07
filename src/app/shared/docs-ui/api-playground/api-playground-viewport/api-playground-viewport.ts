import {
  afterNextRender,
  Component,
  computed,
  effect,
  type ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';

import {
  KuiCard,
  KuiField,
  KuiFieldAffix,
  KuiIcon,
  KuiIconButton,
  KuiInput,
  KuiSegment,
  KuiSegmented,
} from '@kikita-labs/ui';

import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsStorageService } from '@core/platform/storage';

import {
  MAX_PREVIEW_WIDTH,
  MIN_PREVIEW_WIDTH,
  PLAYGROUND_PREVIEW_THEME_STORAGE_KEY,
  VIEWPORT_WIDTH,
} from './constants';
import { type PlaygroundPreviewTheme, type PlaygroundViewport } from './types';

@Component({
  selector: 'app-api-playground-viewport',
  imports: [
    KuiCard,
    KuiFieldAffix,
    KuiField,
    KuiIconButton,
    KuiIcon,
    KuiInput,
    KuiSegment,
    KuiSegmented,
  ],
  templateUrl: './api-playground-viewport.html',
  styleUrl: './api-playground-viewport.scss',
})
export class ApiPlaygroundViewport {
  private readonly pointerDrag = inject(DocsPointerDragService);
  private readonly storage = inject(DocsStorageService);
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');

  /** Accessible name for the preview stage. */
  public readonly previewLabel = input('Live preview');

  protected readonly previewTheme = signal<PlaygroundPreviewTheme>(this.readPreviewTheme());
  protected readonly previewIsDark = computed(() => this.previewTheme() === 'dark');
  protected readonly previewThemeToggleLabel = computed(() =>
    this.previewIsDark() ? 'Use light preview theme' : 'Use dark preview theme',
  );
  protected readonly previewWidth = signal(MAX_PREVIEW_WIDTH);
  protected readonly activePreset = linkedSignal<PlaygroundViewport | ''>(() => {
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

    effect(() => {
      this.setViewportPreset(this.activePreset());
    });
  }

  protected setPreviewWidth(rawValue: string): void {
    const value = rawValue === '' ? MIN_PREVIEW_WIDTH : Number(rawValue);

    this.previewWidth.set(this.clampPreviewWidth(value));
  }

  protected setViewportPreset(preset: string): void {
    if (this.isPlaygroundViewport(preset)) {
      const width = preset === 'desktop' ? this.maxPreviewWidth() : VIEWPORT_WIDTH[preset];

      this.previewWidth.set(this.clampPreviewWidth(width));
    }
  }

  private isPlaygroundViewport(value: string): value is PlaygroundViewport {
    return value === 'mobile' || value === 'tablet' || value === 'desktop';
  }

  protected togglePreviewTheme(): void {
    this.previewTheme.update((theme) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';

      this.storage.write(PLAYGROUND_PREVIEW_THEME_STORAGE_KEY, nextTheme, (value) => value);

      return nextTheme;
    });
  }

  protected startResize(event: PointerEvent): void {
    const startWidth = this.previewWidth();

    this.pointerDrag.start(event, (delta) => {
      this.previewWidth.set(this.clampPreviewWidth(startWidth + delta));
    });
  }

  protected resizeFromKeyboard(event: KeyboardEvent): void {
    const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;

    if (direction === 0) {
      return;
    }

    event.preventDefault();
    const step = event.shiftKey ? 64 : 16;

    this.previewWidth.update((width) => this.clampPreviewWidth(width + direction * step));
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

  private readPreviewTheme(): PlaygroundPreviewTheme {
    const storedTheme = this.storage.read(PLAYGROUND_PREVIEW_THEME_STORAGE_KEY, (value) =>
      value === 'dark' || value === 'light' ? value : null,
    );

    return storedTheme.ok && storedTheme.value ? storedTheme.value : 'light';
  }
}
