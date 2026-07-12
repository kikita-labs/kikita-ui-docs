import { Component, signal } from '@angular/core';
import {
  KuiAccordionAppearance,
  KuiAccordionComponent,
  KuiAccordionItemComponent,
  KuiAccordionMode,
  KuiSize,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { ACCORDION_API_ROWS } from '../accordion.api-schema';

@Component({
  selector: 'app-accordion-playground-page',
  imports: [ApiPlayground, ApiTable, KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './accordion-playground-page.html',
  styleUrl: './accordion-playground-page.scss',
})
export class AccordionPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = ACCORDION_API_ROWS;

  protected readonly expandedItems = signal<string[]>(['general']);

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const mode = values['mode'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;
    const item1Header = (values['item1Header'] as string) || 'General settings';
    const item2Header = (values['item2Header'] as string) || 'Notifications';
    const item3Header = (values['item3Header'] as string) || 'Security';
    const disabledItem = values['disabledItem'] as boolean;

    const accordionAttrs = [
      mode !== 'exclusive' ? `mode="${mode}"` : null,
      appearance !== 'default' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const code = `<kui-accordion${accordionAttrs ? ` ${accordionAttrs}` : ''}>
  <kui-accordion-item id="general" header="${this.escapeHtml(item1Header)}">
    Configure display and behavior options.
  </kui-accordion-item>
  <kui-accordion-item id="notifications" header="${this.escapeHtml(item2Header)}">
    Manage push notifications and email digests.
  </kui-accordion-item>
  <kui-accordion-item id="security" header="${this.escapeHtml(item3Header)}"${disabledItem ? ' [disabled]="true"' : ''}>
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

  protected modeOf(values: PlaygroundValues): KuiAccordionMode {
    return values['mode'] as KuiAccordionMode;
  }

  protected appearanceOf(values: PlaygroundValues): KuiAccordionAppearance {
    return values['appearance'] as KuiAccordionAppearance;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected disabledItemOf(values: PlaygroundValues): boolean {
    return values['disabledItem'] as boolean;
  }

  protected labelOf(values: PlaygroundValues, key: string, fallback: string): string {
    return (values[key] as string) || fallback;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
