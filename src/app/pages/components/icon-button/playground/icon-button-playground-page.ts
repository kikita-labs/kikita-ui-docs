import { Component } from '@angular/core';

import {
  type KuiButtonAppearance,
  type KuiButtonShape,
  KuiIconButtonDirective,
  KuiIconComponent,
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

import { ICON_BUTTON_API_ROWS } from '../icon-button.api-schema';
import { ICON_BUTTON_API_DESCRIPTION } from '../icon-button.docs-content';

const SETTINGS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.06A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 0 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.06A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.06V3a2 2 0 0 1 4 0v.06A1.7 1.7 0 0 0 15.04 4.6a1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.94 10H21a2 2 0 0 1 0 4h-.06A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

const ICON_BUTTON_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'ariaLabel', label: 'aria-label', kind: 'string', defaultValue: 'Settings' },
  {
    key: 'shape',
    label: 'shape',
    kind: 'enum',
    options: ['ghost', 'solid', 'soft', 'outline'],
    defaultValue: 'ghost',
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
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type IconButtonPlaygroundValues = PlaygroundValues<typeof ICON_BUTTON_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-icon-button-playground-page',
  imports: [ApiPlayground, ApiTable, KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-playground-page.html',
  styleUrl: './icon-button-playground-page.scss',
})
export class IconButtonPlaygroundPage {
  protected readonly apiDescription = ICON_BUTTON_API_DESCRIPTION;
  protected readonly apiRows = ICON_BUTTON_API_ROWS;
  protected readonly settingsIcon = SETTINGS_ICON;

  protected readonly playgroundControls = ICON_BUTTON_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: IconButtonPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'shape', value: values.shape, defaultValue: 'ghost' },
      {
        name: 'appearance',
        value: values.appearance === 'none' ? null : values.appearance,
      },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'disabled', value: values.disabled },
    ]);
    const ariaLabel = values.ariaLabel;
    const escapedLabel = escapePlaygroundHtml(ariaLabel || 'Settings');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiIconButton type="button"${attrString} aria-label="${escapedLabel}">
  <kui-icon [source]="settingsIcon" />
</button>`,
      },
    ];
  };

  protected ariaLabelOf(values: IconButtonPlaygroundValues): string {
    const ariaLabel = values.ariaLabel;

    return ariaLabel || 'Settings';
  }

  protected shapeOf(values: IconButtonPlaygroundValues): KuiButtonShape {
    return values.shape;
  }

  protected appearanceOf(values: IconButtonPlaygroundValues): KuiButtonAppearance | null {
    const appearance = values.appearance;

    return appearance === 'none' ? null : appearance;
  }

  protected sizeOf(values: IconButtonPlaygroundValues): KuiSize {
    return values.size;
  }

  protected disabledOf(values: IconButtonPlaygroundValues): boolean {
    return values.disabled;
  }
}
