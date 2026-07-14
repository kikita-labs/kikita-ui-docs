import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  type KuiPopoverAlign,
  KuiPopoverComponent,
  KuiPopoverForDirective,
  type KuiPopoverPlacement,
  type KuiPopoverTriggerType,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { POPOVER_API_ROWS } from '../popover.api-schema';
import { POPOVER_API_DESCRIPTION } from '../popover.docs-content';

const POPOVER_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type PopoverPlaygroundValues = PlaygroundValues<typeof POPOVER_PLAYGROUND_CONTROLS>;

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
  protected readonly apiDescription = POPOVER_API_DESCRIPTION;
  protected readonly apiRows = POPOVER_API_ROWS;

  protected readonly playgroundControls = POPOVER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: PopoverPlaygroundValues,
  ): readonly CodeTab[] => {
    const triggerLabel = values.triggerLabel || 'Open';
    const title = values.title || 'Title';
    const description = values.description || 'Supporting text.';
    const ariaLabel = values.ariaLabel;
    const placement = values.placement;
    const align = values.align;
    const arrow = values.arrow;
    const triggerType = values.triggerType;
    const hoverDelay = values.hoverDelay;
    const offset = values.offset;
    const trapFocus = values.trapFocus;

    const popAttrs = [
      placement !== 'bottom' ? `placement="${placement}"` : null,
      align !== 'center' ? `align="${align}"` : null,
      arrow ? `[arrow]="true"` : null,
      triggerType !== 'click' ? `triggerType="${triggerType}"` : null,
      ariaLabel && ariaLabel !== 'Popover'
        ? `ariaLabel="${escapePlaygroundHtml(ariaLabel)}"`
        : null,
      hoverDelay !== 100 ? `[hoverDelay]="${hoverDelay}"` : null,
      offset !== 8 ? `[offset]="${offset}"` : null,
      trapFocus ? `[trapFocus]="true"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const code = `<button [kuiPopoverFor]="myPop" kuiButton type="button">${escapePlaygroundHtml(triggerLabel)}</button>

<kui-popover #myPop${popAttrs ? ` ${popAttrs}` : ''}>
  <div class="kui-popover-title">${escapePlaygroundHtml(title)}</div>
  <div class="kui-popover-desc">${escapePlaygroundHtml(description)}</div>
</kui-popover>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected triggerLabelOf(values: PopoverPlaygroundValues): string {
    return values.triggerLabel || 'Open';
  }

  protected titleOf(values: PopoverPlaygroundValues): string {
    return values.title || 'Title';
  }

  protected descriptionOf(values: PopoverPlaygroundValues): string {
    return values.description || 'Supporting text.';
  }

  protected ariaLabelOf(values: PopoverPlaygroundValues): string {
    return values.ariaLabel || 'Popover';
  }

  protected placementOf(values: PopoverPlaygroundValues): KuiPopoverPlacement {
    return values.placement;
  }

  protected alignOf(values: PopoverPlaygroundValues): KuiPopoverAlign {
    return values.align;
  }

  protected arrowOf(values: PopoverPlaygroundValues): boolean {
    return values.arrow;
  }

  protected triggerTypeOf(values: PopoverPlaygroundValues): KuiPopoverTriggerType {
    return values.triggerType;
  }

  protected hoverDelayOf(values: PopoverPlaygroundValues): number {
    return values.hoverDelay;
  }

  protected offsetOf(values: PopoverPlaygroundValues): number {
    return values.offset;
  }

  protected trapFocusOf(values: PopoverPlaygroundValues): boolean {
    return values.trapFocus;
  }
}
