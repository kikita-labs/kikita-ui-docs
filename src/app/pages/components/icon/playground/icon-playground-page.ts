import { Component } from '@angular/core';

import { KuiIconComponent } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  escapePlaygroundHtmlAttribute,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { ICON_API_ROWS } from '../icon.api-schema';
import { ICON_API_DESCRIPTION } from '../icon.docs-content';

const ICON_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'mode',
    label: 'source',
    kind: 'enum',
    options: ['name', 'inline', 'image'],
    defaultValue: 'name',
  },
  { key: 'iconName', label: 'name (Lucide icon name)', kind: 'string', defaultValue: 'settings' },
  { key: 'size', label: 'size', kind: 'string', defaultValue: '24px' },
  { key: 'label', label: 'label (accessible name)', kind: 'string', defaultValue: 'Success' },
  {
    key: 'decorative',
    label: 'decorative (hide from screen readers)',
    kind: 'boolean',
    defaultValue: false,
  },
] as const);

type IconPlaygroundValues = PlaygroundValues<typeof ICON_PLAYGROUND_CONTROLS>;

const INLINE_ICON =
  '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const IMAGE_ICON =
  'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%226%22%20fill%3D%22currentColor%22/%3E%3C/svg%3E';

function iconLabelOf(values: IconPlaygroundValues): string | undefined {
  return values.decorative ? undefined : values.label.trim() || 'Icon';
}

@Component({
  selector: 'app-icon-playground-page',
  imports: [ApiPlayground, ApiTable, KuiIconComponent],
  templateUrl: './icon-playground-page.html',
  styleUrl: './icon-playground-page.scss',
})
export class IconPlaygroundPage {
  protected readonly apiDescription = ICON_API_DESCRIPTION;
  protected readonly apiRows = ICON_API_ROWS;
  protected readonly playgroundControls = ICON_PLAYGROUND_CONTROLS;
  protected readonly inlineIcon = INLINE_ICON;
  protected readonly imageIcon = IMAGE_ICON;

  protected readonly buildPlaygroundSnippet = (
    values: IconPlaygroundValues,
  ): readonly CodeTab[] => {
    const label = iconLabelOf(values);

    if (values.mode === 'name') {
      const attrString = serializePlaygroundAttributes([
        { name: 'name', value: values.iconName },
        { name: 'label', value: label },
        { name: 'size', value: values.size, defaultValue: '1em' },
      ]);

      return [
        {
          label: 'HTML',
          language: 'html',
          code: `<kui-icon${attrString} />`,
        },
      ];
    }

    const attrString = serializePlaygroundAttributes([
      {
        name: values.mode === 'inline' ? '[source]' : 'src',
        value: values.mode === 'inline' ? 'checkIcon' : IMAGE_ICON,
      },
      { name: 'label', value: label },
      { name: 'size', value: values.size, defaultValue: '1em' },
    ]);
    const html = `<kui-icon${attrString} />`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code: html.replace('"checkIcon"', 'checkIcon'),
      },
      {
        label: 'TS',
        language: 'ts',
        code: `protected readonly checkIcon = '${escapePlaygroundHtmlAttribute(INLINE_ICON)}';`,
      },
    ];
  };

  protected nameOf(values: IconPlaygroundValues): string | undefined {
    return values.mode === 'name' ? values.iconName.trim() || undefined : undefined;
  }

  protected sourceOf(values: IconPlaygroundValues): string | undefined {
    return values.mode === 'inline' ? INLINE_ICON : undefined;
  }

  protected srcOf(values: IconPlaygroundValues): string | undefined {
    return values.mode === 'image' ? IMAGE_ICON : undefined;
  }

  protected sizeOf(values: IconPlaygroundValues): string {
    return values.size;
  }

  protected labelOf(values: IconPlaygroundValues): string | undefined {
    return iconLabelOf(values);
  }
}
