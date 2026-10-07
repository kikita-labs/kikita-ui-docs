import { Component } from '@angular/core';

import {
  KuiBreadcrumbItem,
  KuiBreadcrumbs,
  KuiBreadcrumbSeparator,
  type KuiBreadcrumbsSize,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { BREADCRUMBS_API_ROWS } from '../breadcrumbs.api-schema';
import { BREADCRUMBS_API_DESCRIPTION } from '../breadcrumbs.docs-content';

const BREADCRUMBS_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  {
    key: 'middleLabel',
    label: 'middle label',
    kind: 'string',
    defaultValue: 'Surfaces',
  },
  {
    key: 'currentLabel',
    label: 'current label',
    kind: 'string',
    defaultValue: 'Breadcrumbs',
  },
  {
    key: 'middleKind',
    label: 'middle crumb',
    kind: 'enum',
    options: ['text', 'link'],
    defaultValue: 'text',
  },
  { key: 'truncateMiddle', label: 'truncate middle', kind: 'boolean', defaultValue: false },
] as const);

type BreadcrumbsPlaygroundValues = PlaygroundValues<typeof BREADCRUMBS_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-breadcrumbs-playground-page',
  imports: [ApiPlayground, ApiTable, KuiBreadcrumbItem, KuiBreadcrumbSeparator, KuiBreadcrumbs],
  templateUrl: './breadcrumbs-playground-page.html',
  styleUrl: './breadcrumbs-playground-page.scss',
})
export class BreadcrumbsPlaygroundPage {
  protected readonly apiDescription = BREADCRUMBS_API_DESCRIPTION;
  protected readonly apiRows = BREADCRUMBS_API_ROWS;
  protected readonly playgroundControls = BREADCRUMBS_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: BreadcrumbsPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
    ]);

    const truncate = values.truncateMiddle ? ' class="kui-breadcrumb-truncate"' : '';
    const middle =
      values.middleKind === 'link'
        ? `<a kuiBreadcrumbItem${truncate} href="/components/surfaces">${values.middleLabel}</a>`
        : `<span kuiBreadcrumbItem${truncate}>${values.middleLabel}</span>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<nav aria-label="Breadcrumb">
  <ol kuiBreadcrumbs${attrString}>
    <li><a kuiBreadcrumbItem href="/components">Components</a></li>
    <li kuiBreadcrumbSeparator></li>
    <li>${middle}</li>
    <li kuiBreadcrumbSeparator></li>
    <li><span kuiBreadcrumbItem current>${values.currentLabel}</span></li>
  </ol>
</nav>`,
      },
    ];
  };

  protected sizeOf(values: BreadcrumbsPlaygroundValues): KuiBreadcrumbsSize {
    return values.size;
  }

  protected isLinkMiddle(values: BreadcrumbsPlaygroundValues): boolean {
    return values.middleKind === 'link';
  }

  protected truncateMiddleOf(values: BreadcrumbsPlaygroundValues): boolean {
    return values.truncateMiddle;
  }

  protected middleLabelOf(values: BreadcrumbsPlaygroundValues): string {
    return values.middleLabel;
  }

  protected currentLabelOf(values: BreadcrumbsPlaygroundValues): string {
    return values.currentLabel;
  }
}
