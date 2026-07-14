import { Component } from '@angular/core';

import { KuiButtonDirective, KuiTooltipDirective, type KuiTooltipPlacement } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  escapePlaygroundHtmlAttribute,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { TOOLTIP_API_ROWS } from '../tooltip.api-schema';
import { TOOLTIP_API_DESCRIPTION } from '../tooltip.docs-content';

const TOOLTIP_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'placement',
    label: 'placement',
    kind: 'enum',
    options: ['top', 'bottom', 'left', 'right'],
    defaultValue: 'top',
  },
  { key: 'text', label: 'text', kind: 'string', defaultValue: 'Save the current draft' },
] as const);

type TooltipPlaygroundValues = PlaygroundValues<typeof TOOLTIP_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-tooltip-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective, KuiTooltipDirective],
  templateUrl: './tooltip-playground-page.html',
  styleUrl: './tooltip-playground-page.scss',
})
export class TooltipPlaygroundPage {
  protected readonly apiDescription = TOOLTIP_API_DESCRIPTION;
  protected readonly apiRows = TOOLTIP_API_ROWS;
  protected readonly playgroundControls = TOOLTIP_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: TooltipPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'placement', value: values.placement, defaultValue: 'top' },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiButton type="button" [kuiTooltip]="'${escapePlaygroundHtmlAttribute(values.text)}'"${attrString}>
  Save
</button>`,
      },
    ];
  };

  protected placementOf(values: TooltipPlaygroundValues): KuiTooltipPlacement {
    return values.placement;
  }

  protected textOf(values: TooltipPlaygroundValues): string {
    return values.text;
  }
}
