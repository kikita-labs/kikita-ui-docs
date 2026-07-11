import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import {
  KuiCardDirective,
  KuiInputDirective,
  KuiSegmentDirective,
  KuiSegmentedComponent,
  KuiSwitchDirective,
} from '@kikita-labs/ui';
import { CodeTab } from '../code-tabs/code-tab';
import { CodeTabs } from '../code-tabs/code-tabs';
import { ApiPlaygroundOverlayContainer } from './api-playground-overlay-container';
import { ApiPlaygroundViewport } from './api-playground-viewport';
import { PlaygroundControl, PlaygroundValues } from './playground-control';

@Component({
  selector: 'app-api-playground',
  exportAs: 'appApiPlayground',
  imports: [
    ApiPlaygroundViewport,
    CodeTabs,
    KuiCardDirective,
    KuiInputDirective,
    KuiSegmentDirective,
    KuiSegmentedComponent,
    KuiSwitchDirective,
  ],
  providers: [{ provide: OverlayContainer, useClass: ApiPlaygroundOverlayContainer }, Overlay],
  templateUrl: './api-playground.html',
  styleUrl: './api-playground.scss',
})
export class ApiPlayground {
  readonly previewLabel = input('Live preview');
  readonly controls = input.required<readonly PlaygroundControl[]>();
  readonly snippet = input.required<(values: PlaygroundValues) => readonly CodeTab[]>();

  readonly values = signal<PlaygroundValues>({});
  protected readonly snippetTabs = computed(() => this.snippet()(this.values()));
  protected readonly enumControls = computed(() =>
    this.controls().filter((control) => control.kind === 'enum'),
  );
  protected readonly textControls = computed(() =>
    this.controls().filter((control) => control.kind === 'string' || control.kind === 'number'),
  );
  protected readonly booleanControls = computed(() =>
    this.controls().filter((control) => control.kind === 'boolean'),
  );

  constructor() {
    effect(() => {
      const controls = this.controls();

      untracked(() => {
        this.values.set(
          Object.fromEntries(controls.map((control) => [control.key, control.defaultValue])),
        );
      });
    });
  }

  protected setValue(key: string, value: boolean | number | string): void {
    this.values.update((current) => ({ ...current, [key]: value }));
  }

  protected toggleBoolean(key: string, event: Event): void {
    this.setValue(key, (event.target as HTMLInputElement).checked);
  }

  protected setStringFromEvent(key: string, event: Event): void {
    this.setValue(key, (event.target as HTMLInputElement).value);
  }

  protected setNumberFromEvent(key: string, event: Event): void {
    const raw = (event.target as HTMLInputElement).value;

    this.setValue(key, raw === '' ? 0 : Number(raw));
  }

  protected booleanValue(key: string): boolean {
    return Boolean(this.values()[key]);
  }

  protected stringValue(key: string): string {
    return String(this.values()[key] ?? '');
  }
}
