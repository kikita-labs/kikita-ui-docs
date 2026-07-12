import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiPopoverAlign,
  KuiPopoverComponent,
  KuiPopoverForDirective,
  KuiPopoverPlacement,
  KuiPopoverTriggerType,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { POPOVER_API_ROWS } from '../popover.api-schema';

@Component({
  selector: 'app-popover-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiButtonDirective,
    KuiPopoverComponent,
    KuiPopoverForDirective,
  ],
  templateUrl: './popover-playground-page.html',
  styleUrl: './popover-playground-page.scss',
})
export class PopoverPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = POPOVER_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'triggerLabel', label: 'trigger label', kind: 'string', defaultValue: 'Open' },
    { key: 'title', label: 'title', kind: 'string', defaultValue: 'Title' },
    { key: 'description', label: 'description', kind: 'string', defaultValue: 'Supporting text.' },
    { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: 'Popover' },
    {
      key: 'placement',
      label: 'placement',
      kind: 'enum',
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: 'bottom',
    },
    {
      key: 'align',
      label: 'align',
      kind: 'enum',
      options: ['start', 'center', 'end'],
      defaultValue: 'center',
    },
    { key: 'arrow', label: 'arrow', kind: 'boolean', defaultValue: false },
    {
      key: 'triggerType',
      label: 'triggerType',
      kind: 'enum',
      options: ['click', 'hover'],
      defaultValue: 'click',
    },
    { key: 'hoverDelay', label: 'hoverDelay', kind: 'number', defaultValue: 100 },
    { key: 'offset', label: 'offset', kind: 'number', defaultValue: 8 },
    { key: 'trapFocus', label: 'trapFocus', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const triggerLabel = (values['triggerLabel'] as string) || 'Open';
    const title = (values['title'] as string) || 'Title';
    const description = (values['description'] as string) || 'Supporting text.';
    const ariaLabel = values['ariaLabel'] as string;
    const placement = values['placement'] as string;
    const align = values['align'] as string;
    const arrow = values['arrow'] as boolean;
    const triggerType = values['triggerType'] as string;
    const hoverDelay = values['hoverDelay'] as number;
    const offset = values['offset'] as number;
    const trapFocus = values['trapFocus'] as boolean;

    const popAttrs = [
      placement !== 'bottom' ? `placement="${placement}"` : null,
      align !== 'center' ? `align="${align}"` : null,
      arrow ? `[arrow]="true"` : null,
      triggerType !== 'click' ? `triggerType="${triggerType}"` : null,
      ariaLabel && ariaLabel !== 'Popover' ? `ariaLabel="${this.escapeHtml(ariaLabel)}"` : null,
      hoverDelay !== 100 ? `[hoverDelay]="${hoverDelay}"` : null,
      offset !== 8 ? `[offset]="${offset}"` : null,
      trapFocus ? `[trapFocus]="true"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const code = `<button [kuiPopoverFor]="myPop" kuiButton type="button">${this.escapeHtml(triggerLabel)}</button>

<kui-popover #myPop${popAttrs ? ` ${popAttrs}` : ''}>
  <div class="kui-popover-title">${this.escapeHtml(title)}</div>
  <div class="kui-popover-desc">${this.escapeHtml(description)}</div>
</kui-popover>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected triggerLabelOf(values: PlaygroundValues): string {
    return (values['triggerLabel'] as string) || 'Open';
  }

  protected titleOf(values: PlaygroundValues): string {
    return (values['title'] as string) || 'Title';
  }

  protected descriptionOf(values: PlaygroundValues): string {
    return (values['description'] as string) || 'Supporting text.';
  }

  protected ariaLabelOf(values: PlaygroundValues): string {
    return (values['ariaLabel'] as string) || 'Popover';
  }

  protected placementOf(values: PlaygroundValues): KuiPopoverPlacement {
    return values['placement'] as KuiPopoverPlacement;
  }

  protected alignOf(values: PlaygroundValues): KuiPopoverAlign {
    return values['align'] as KuiPopoverAlign;
  }

  protected arrowOf(values: PlaygroundValues): boolean {
    return values['arrow'] as boolean;
  }

  protected triggerTypeOf(values: PlaygroundValues): KuiPopoverTriggerType {
    return values['triggerType'] as KuiPopoverTriggerType;
  }

  protected hoverDelayOf(values: PlaygroundValues): number {
    return values['hoverDelay'] as number;
  }

  protected offsetOf(values: PlaygroundValues): number {
    return values['offset'] as number;
  }

  protected trapFocusOf(values: PlaygroundValues): boolean {
    return values['trapFocus'] as boolean;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
