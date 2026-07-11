import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateContext,
  KuiEmptyStateIconDirective,
  KuiEmptyStateSize,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { EMPTY_STATE_API_ROWS } from '../empty-state.api-schema';

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
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = EMPTY_STATE_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const title = values['title'] as string;
    const description = values['description'] as string;
    const context = values['context'] as string;
    const size = values['size'] as string;
    const showActions = values['showActions'] as boolean;

    const attrs = [
      `title="${this.escapeHtml(title || 'No projects yet')}"`,
      description ? `description="${this.escapeHtml(description)}"` : null,
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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected titleOf(values: PlaygroundValues): string {
    const title = values['title'] as string;

    return title || 'No projects yet';
  }

  protected descriptionOf(values: PlaygroundValues): string | null {
    const description = values['description'] as string;

    return description || null;
  }

  protected contextOf(values: PlaygroundValues): KuiEmptyStateContext {
    return values['context'] as KuiEmptyStateContext;
  }

  protected sizeOf(values: PlaygroundValues): KuiEmptyStateSize {
    return values['size'] as KuiEmptyStateSize;
  }

  protected showActionsOf(values: PlaygroundValues): boolean {
    return values['showActions'] as boolean;
  }
}
