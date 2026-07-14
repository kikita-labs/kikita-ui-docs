import { Component, signal } from '@angular/core';

import {
  type KuiAccordionAppearance,
  KuiAccordionComponent,
  KuiAccordionItemComponent,
  type KuiAccordionMode,
  type KuiSize,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { ACCORDION_API_ROWS } from '../accordion.api-schema';
import { ACCORDION_API_DESCRIPTION } from '../accordion.docs-content';

const ACCORDION_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'mode',
    label: 'mode',
    kind: 'enum',
    options: ['exclusive', 'multi'],
    defaultValue: 'exclusive',
  },
  {
    key: 'appearance',
    label: 'appearance',
    kind: 'enum',
    options: ['default', 'bordered', 'ghost'],
    defaultValue: 'default',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    key: 'item1Header',
    label: 'item 1 header',
    kind: 'string',
    defaultValue: 'General settings',
  },
  { key: 'item2Header', label: 'item 2 header', kind: 'string', defaultValue: 'Notifications' },
  { key: 'item3Header', label: 'item 3 header', kind: 'string', defaultValue: 'Security' },
  { key: 'disabledItem', label: 'disable item 3', kind: 'boolean', defaultValue: false },
] as const);

type AccordionPlaygroundValues = PlaygroundValues<typeof ACCORDION_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-accordion-playground-page',
  imports: [ApiPlayground, ApiTable, KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './accordion-playground-page.html',
  styleUrl: './accordion-playground-page.scss',
})
export class AccordionPlaygroundPage {
  protected readonly apiDescription = ACCORDION_API_DESCRIPTION;
  protected readonly apiRows = ACCORDION_API_ROWS;

  protected readonly expandedItems = signal<string[]>(['general']);

  protected readonly playgroundControls = ACCORDION_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: AccordionPlaygroundValues,
  ): readonly CodeTab[] => {
    const mode = values.mode;
    const appearance = values.appearance;
    const size = values.size;
    const item1Header = values.item1Header || 'General settings';
    const item2Header = values.item2Header || 'Notifications';
    const item3Header = values.item3Header || 'Security';
    const disabledItem = values.disabledItem;

    const accordionAttrs = [
      mode !== 'exclusive' ? `mode="${mode}"` : null,
      appearance !== 'default' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const code = `<kui-accordion${accordionAttrs ? ` ${accordionAttrs}` : ''}>
  <kui-accordion-item id="general" header="${escapePlaygroundHtml(item1Header)}">
    Configure display and behavior options.
  </kui-accordion-item>
  <kui-accordion-item id="notifications" header="${escapePlaygroundHtml(item2Header)}">
    Manage push notifications and email digests.
  </kui-accordion-item>
  <kui-accordion-item id="security" header="${escapePlaygroundHtml(item3Header)}"${disabledItem ? ' [disabled]="true"' : ''}>
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected modeOf(values: AccordionPlaygroundValues): KuiAccordionMode {
    return values.mode;
  }

  protected appearanceOf(values: AccordionPlaygroundValues): KuiAccordionAppearance {
    return values.appearance;
  }

  protected sizeOf(values: AccordionPlaygroundValues): KuiSize {
    return values.size;
  }

  protected disabledItemOf(values: AccordionPlaygroundValues): boolean {
    return values.disabledItem;
  }

  protected labelOf(
    values: AccordionPlaygroundValues,
    key: 'item1Header' | 'item2Header' | 'item3Header',
    fallback: string,
  ): string {
    return values[key] || fallback;
  }
}
