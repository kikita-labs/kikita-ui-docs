import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiGroupDirective,
  type KuiGroupOrientation,
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

import { GROUP_API_ROWS } from '../group.api-schema';
import { GROUP_API_DESCRIPTION } from '../group.docs-content';

const GROUP_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'orientation',
    label: 'orientation',
    kind: 'enum',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'collapsed', label: 'collapsed', kind: 'boolean', defaultValue: false },
  { key: 'rounded', label: 'rounded', kind: 'boolean', defaultValue: true },
  { key: 'firstLabel', label: 'first label', kind: 'string', defaultValue: 'One' },
  { key: 'secondLabel', label: 'second label', kind: 'string', defaultValue: 'Two' },
  { key: 'thirdLabel', label: 'third label', kind: 'string', defaultValue: 'Three' },
] as const);

type GroupPlaygroundValues = PlaygroundValues<typeof GROUP_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-group-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-playground-page.html',
  styleUrl: './group-playground-page.scss',
})
export class GroupPlaygroundPage {
  protected readonly apiDescription = GROUP_API_DESCRIPTION;
  protected readonly apiRows = GROUP_API_ROWS;

  protected readonly playgroundControls = GROUP_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: GroupPlaygroundValues,
  ): readonly CodeTab[] => {
    const firstLabel = escapePlaygroundHtml(values.firstLabel || 'One');
    const secondLabel = escapePlaygroundHtml(values.secondLabel || 'Two');
    const thirdLabel = escapePlaygroundHtml(values.thirdLabel || 'Three');

    const attrString = serializePlaygroundAttributes([
      { name: 'orientation', value: values.orientation, defaultValue: 'horizontal' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'collapsed', value: values.collapsed },
      { name: '[rounded]', value: values.rounded ? null : 'false' },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<div kuiGroup${attrString}>
  <button kuiButton type="button" shape="outline">${firstLabel}</button>
  <button kuiButton type="button" shape="outline">${secondLabel}</button>
  <button kuiButton type="button" shape="outline">${thirdLabel}</button>
</div>`,
      },
    ];
  };

  protected orientationOf(values: GroupPlaygroundValues): KuiGroupOrientation {
    return values.orientation;
  }

  protected sizeOf(values: GroupPlaygroundValues): KuiSize {
    return values.size;
  }

  protected collapsedOf(values: GroupPlaygroundValues): boolean {
    return values.collapsed;
  }

  protected roundedOf(values: GroupPlaygroundValues): boolean {
    return values.rounded;
  }

  protected firstLabelOf(values: GroupPlaygroundValues): string {
    return values.firstLabel || 'One';
  }

  protected secondLabelOf(values: GroupPlaygroundValues): string {
    return values.secondLabel || 'Two';
  }

  protected thirdLabelOf(values: GroupPlaygroundValues): string {
    return values.thirdLabel || 'Three';
  }
}
