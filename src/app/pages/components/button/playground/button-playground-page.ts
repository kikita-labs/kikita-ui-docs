import { Component } from '@angular/core';

import {
  type KuiButtonAppearance,
  KuiButtonDirective,
  type KuiButtonShape,
  type KuiSize,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { BUTTON_API_ROWS } from '../button.api-schema';
import { BUTTON_API_DESCRIPTION } from '../button.docs-content';

const BUTTON_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save changes' },
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
    options: ['primary', 'danger', 'success', 'warning'],
    defaultValue: 'primary',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'wrap', label: 'wrap', kind: 'boolean', defaultValue: false },
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type ButtonPlaygroundValues = PlaygroundValues<typeof BUTTON_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-button-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
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
      {
        name: 'appearance',
        value: values.appearance,
      },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'wrap', value: values.wrap },
      { name: 'loading', value: values.loading },
      { name: 'disabled', value: values.disabled },
    ]);
    const escapedLabel = escapePlaygroundHtml(values.label || 'Save changes');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiButton type="button"${attrString}>${escapedLabel}</button>`,
      },
    ];
  };

  protected labelOf(values: ButtonPlaygroundValues): string {
    return values.label || 'Save changes';
  }

  protected shapeOf(values: ButtonPlaygroundValues): KuiButtonShape {
    return values.shape;
  }

  protected appearanceOf(values: ButtonPlaygroundValues): KuiButtonAppearance {
    return values.appearance;
  }

  protected sizeOf(values: ButtonPlaygroundValues): KuiSize {
    return values.size;
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
}
