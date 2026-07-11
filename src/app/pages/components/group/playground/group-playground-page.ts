import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiGroupDirective,
  KuiGroupOrientation,
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
import { GROUP_API_ROWS } from '../group.api-schema';

@Component({
  selector: 'app-group-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-playground-page.html',
  styleUrl: './group-playground-page.scss',
})
export class GroupPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = GROUP_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const orientation = values['orientation'] as string;
    const size = values['size'] as string;
    const collapsed = values['collapsed'] as boolean;
    const rounded = values['rounded'] as boolean;
    const firstLabel = this.escapeHtml((values['firstLabel'] as string) || 'One');
    const secondLabel = this.escapeHtml((values['secondLabel'] as string) || 'Two');
    const thirdLabel = this.escapeHtml((values['thirdLabel'] as string) || 'Three');

    const attrs = [
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      collapsed ? 'collapsed' : null,
      !rounded ? '[rounded]="false"' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected orientationOf(values: PlaygroundValues): KuiGroupOrientation {
    return values['orientation'] as KuiGroupOrientation;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected collapsedOf(values: PlaygroundValues): boolean {
    return values['collapsed'] as boolean;
  }

  protected roundedOf(values: PlaygroundValues): boolean {
    return values['rounded'] as boolean;
  }

  protected firstLabelOf(values: PlaygroundValues): string {
    return (values['firstLabel'] as string) || 'One';
  }

  protected secondLabelOf(values: PlaygroundValues): string {
    return (values['secondLabel'] as string) || 'Two';
  }

  protected thirdLabelOf(values: PlaygroundValues): string {
    return (values['thirdLabel'] as string) || 'Three';
  }
}
