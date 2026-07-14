import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  type KuiEmptyStateContext,
  KuiEmptyStateIconDirective,
  type KuiEmptyStateSize,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { EMPTY_STATE_API_ROWS } from '../empty-state.api-schema';
import { EMPTY_STATE_API_DESCRIPTION } from '../empty-state.docs-content';

const EMPTY_STATE_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'title', label: 'title', kind: 'string', defaultValue: 'No projects yet' },
  {
    key: 'description',
    label: 'description',
    kind: 'string',
    defaultValue: 'Create the first project to start working with your team.',
  },
  {
    key: 'context',
    label: 'context',
    kind: 'enum',
    options: ['no-data', 'no-results', 'error', 'no-access', 'success'],
    defaultValue: 'no-data',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'showActions', label: 'showActions', kind: 'boolean', defaultValue: true },
] as const);

type EmptyStatePlaygroundValues = PlaygroundValues<typeof EMPTY_STATE_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-empty-state-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
  ],
  templateUrl: './empty-state-playground-page.html',
  styleUrl: './empty-state-playground-page.scss',
})
export class EmptyStatePlaygroundPage {
  protected readonly apiDescription = EMPTY_STATE_API_DESCRIPTION;
  protected readonly apiRows = EMPTY_STATE_API_ROWS;

  protected readonly playgroundControls = EMPTY_STATE_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: EmptyStatePlaygroundValues,
  ): readonly CodeTab[] => {
    const title = values.title;
    const description = values.description;
    const context = values.context;
    const size = values.size;
    const showActions = values.showActions;

    const attrs = [
      `title="${escapePlaygroundHtml(title || 'No projects yet')}"`,
      description ? `description="${escapePlaygroundHtml(description)}"` : null,
      context !== 'no-data' ? `context="${context}"` : null,
      size !== 'md' ? `size="${size}"` : null,
    ].filter((attr): attr is string => attr !== null);

    const actionsBlock = showActions
      ? `

  <div kuiEmptyStateActions>
    <button kuiButton type="button">Create project</button>
    <button kuiButton shape="ghost" type="button">Import</button>
  </div>`
      : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-empty-state ${attrs.join(' ')}>
  <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 8v13H3V8" />
    <path d="M1 3h22v5H1z" />
    <path d="M10 12h4" />
  </svg>${actionsBlock}
</kui-empty-state>`,
      },
    ];
  };

  protected titleOf(values: EmptyStatePlaygroundValues): string {
    const title = values.title;

    return title || 'No projects yet';
  }

  protected descriptionOf(values: EmptyStatePlaygroundValues): string | null {
    const description = values.description;

    return description || null;
  }

  protected contextOf(values: EmptyStatePlaygroundValues): KuiEmptyStateContext {
    return values.context;
  }

  protected sizeOf(values: EmptyStatePlaygroundValues): KuiEmptyStateSize {
    return values.size;
  }

  protected showActionsOf(values: EmptyStatePlaygroundValues): boolean {
    return values.showActions;
  }
}
