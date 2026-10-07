import { Component } from '@angular/core';

import {
  KuiButton,
  type KuiButtonAppearance,
  type KuiButtonShape,
  type KuiSize,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  playgroundOptionOrUndefined,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { BUTTON_API_ROWS } from '../button.api-schema';
import { BUTTON_API_DESCRIPTION } from '../button.docs-content';

const BUTTON_PLAYGROUND_ICONS = ['none', 'check', 'plus', 'arrow-right', 'trash-2'] as const;

const BUTTON_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save changes' },
  {
    key: 'element',
    label: 'element',
    kind: 'enum',
    options: ['button', 'anchor'],
    defaultValue: 'button',
  },
  {
    key: 'shape',
    label: 'shape',
    kind: 'enum',
    options: ['solid', 'soft', 'outline', 'ghost'],
    defaultValue: 'solid',
  },
  {
    key: 'appearance',
    label: 'appearance',
    kind: 'enum',
    options: ['none', 'primary', 'danger', 'success', 'warning'],
    defaultValue: 'none',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    key: 'iconStart',
    label: 'iconStart',
    kind: 'enum',
    options: BUTTON_PLAYGROUND_ICONS,
    defaultValue: 'none',
  },
  {
    key: 'iconEnd',
    label: 'iconEnd',
    kind: 'enum',
    options: BUTTON_PLAYGROUND_ICONS,
    defaultValue: 'none',
  },
  { key: 'wrap', label: 'wrap', kind: 'boolean', defaultValue: false },
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type ButtonPlaygroundValues = PlaygroundValues<typeof BUTTON_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-button-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButton],
  templateUrl: './button-playground-page.html',
  styleUrl: './button-playground-page.scss',
})
export class ButtonPlaygroundPage {
  protected readonly apiDescription = BUTTON_API_DESCRIPTION;
  protected readonly apiRows = BUTTON_API_ROWS;

  protected readonly playgroundControls = BUTTON_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ButtonPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      {
        name: 'shape',
        value: values.shape,
        defaultValue: 'solid',
      },
      { name: 'appearance', value: playgroundOptionOrUndefined(values.appearance) },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'iconStart', value: playgroundOptionOrUndefined(values.iconStart) },
      { name: 'iconEnd', value: playgroundOptionOrUndefined(values.iconEnd) },
      { name: 'wrap', value: values.wrap },
      { name: 'loading', value: values.loading },
      { name: 'disabled', value: values.disabled },
    ]);
    const escapedLabel = escapePlaygroundHtml(values.label || 'Save changes');
    const tag =
      values.element === 'anchor'
        ? `<a kuiButton href="/settings"${attrString}>${escapedLabel}</a>`
        : `<button kuiButton type="button"${attrString}>${escapedLabel}</button>`;

    return [{ label: 'HTML', language: 'html', code: tag }];
  };

  protected labelOf(values: ButtonPlaygroundValues): string {
    return values.label || 'Save changes';
  }

  protected isAnchor(values: ButtonPlaygroundValues): boolean {
    return values.element === 'anchor';
  }

  protected shapeOf(values: ButtonPlaygroundValues): KuiButtonShape {
    return values.shape;
  }

  protected appearanceOf(values: ButtonPlaygroundValues): KuiButtonAppearance | null {
    return playgroundOptionOrUndefined(values.appearance) ?? null;
  }

  protected sizeOf(values: ButtonPlaygroundValues): KuiSize {
    return values.size;
  }

  protected iconStartOf(values: ButtonPlaygroundValues): string | undefined {
    return playgroundOptionOrUndefined(values.iconStart);
  }

  protected iconEndOf(values: ButtonPlaygroundValues): string | undefined {
    return playgroundOptionOrUndefined(values.iconEnd);
  }

  protected wrapOf(values: ButtonPlaygroundValues): boolean {
    return values.wrap;
  }

  protected loadingOf(values: ButtonPlaygroundValues): boolean {
    return values.loading;
  }

  protected disabledOf(values: ButtonPlaygroundValues): boolean {
    return values.disabled;
  }

  /** The preview link must not leave the playground; it only demonstrates the anchor host. */
  protected keepInPlayground(event: Event): void {
    event.preventDefault();
  }
}
