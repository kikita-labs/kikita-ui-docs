import { _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Component, computed, inject, input, signal } from '@angular/core';

import {
  KuiCardDirective,
  KuiInputDirective,
  KuiNumberInputDirective,
  KuiSegmentDirective,
  KuiSegmentedComponent,
  KuiSwitchDirective,
} from '@kikita-labs/ui';

import { DocsLocalOverlayContainer } from '@core/platform/overlay';

import { CodeTabs } from '../code-tabs/code-tabs';
import { ApiPlaygroundViewport } from './api-playground-viewport';
import {
  createPlaygroundValues,
  parsePlaygroundNumber,
  type PlaygroundControl,
  type PlaygroundSnippetBuilder,
  type PlaygroundValue,
} from './playground-control';

@Component({
  selector: 'app-api-playground',
  exportAs: 'appApiPlayground',
  // KuiNumberInputDirective rebuilds its host's DOM imperatively (wraps the native input in a
  // container + step buttons via Renderer2), which Angular's hydration node-matching can't
  // reconcile against server-rendered output -- it ends up nesting a second wrapper around the
  // stale server input. Skip hydrating this component so it fully re-renders client-side instead
  // of producing a broken/duplicated DOM. Playground routes aren't in the SSR completeness
  // contract's required pre-hydration content list (see .agents/ssr.md), so this is a scoped,
  // documented tradeoff, not a silent regression.
  host: { ngSkipHydration: 'true' },
  imports: [
    ApiPlaygroundViewport,
    CodeTabs,
    KuiCardDirective,
    KuiInputDirective,
    KuiNumberInputDirective,
    KuiSegmentDirective,
    KuiSegmentedComponent,
    KuiSwitchDirective,
  ],
  providers: [{ provide: OverlayContainer, useClass: DocsLocalOverlayContainer }, Overlay],
  templateUrl: './api-playground.html',
  styleUrl: './api-playground.scss',
})
export class ApiPlayground<
  TControls extends readonly PlaygroundControl[] = readonly PlaygroundControl[],
> {
  protected readonly id = inject(_IdGenerator).getId('api-playground-');

  /** Accessible name forwarded to the interactive preview region. */
  public readonly previewLabel = input('Live preview');
  /** Discriminated control tuple that owns keys, options, and defaults. */
  public readonly controls = input.required<TControls>();
  /** Pure typed serializer that derives displayed source from current values. */
  public readonly snippet = input.required<PlaygroundSnippetBuilder<TControls>>();

  private readonly valueOverrides = signal<Readonly<Record<string, PlaygroundValue>>>({});

  /** Readonly current value map exposed through exportAs for live previews. */
  public readonly values = computed(() =>
    createPlaygroundValues(this.controls(), this.valueOverrides()),
  );
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

  protected setValue(key: string, value: PlaygroundValue): void {
    this.valueOverrides.update((current) => ({ ...current, [key]: value }));
  }

  protected setBooleanValue(key: string, value: boolean): void {
    this.setValue(key, value);
  }

  protected setStringValue(key: string, value: string): void {
    this.setValue(key, value);
  }

  protected setNumberValue(key: string, rawValue: string): void {
    this.setValue(key, parsePlaygroundNumber(rawValue));
  }

  protected booleanValue(key: TControls[number]['key']): boolean {
    return Boolean(this.values()[key]);
  }

  protected stringValue(key: TControls[number]['key']): string {
    return String(this.values()[key] ?? '');
  }

  protected controlLabelId(key: string): string {
    return `${this.id}-${key}-label`;
  }

  protected controlInputId(key: string): string {
    return `${this.id}-${key}-input`;
  }
}
