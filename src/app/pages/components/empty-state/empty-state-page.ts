import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicEmptyStateExample } from './examples/basic-empty-state-example/basic-empty-state-example';
import { EmptyStateContextExample } from './examples/empty-state-context-example/empty-state-context-example';
import { EmptyStateSizeExample } from './examples/empty-state-size-example/empty-state-size-example';
import { EMPTY_STATE_API_ROWS } from './empty-state.api-schema';

@Component({
  selector: 'app-empty-state-page',
  imports: [
    ApiTable,
    BasicEmptyStateExample,
    CodeTabs,
    DocSection,
    EmptyStateContextExample,
    EmptyStateSizeExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './empty-state-page.html',
  styleUrl: './empty-state-page.scss',
})
export class EmptyStatePage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = EMPTY_STATE_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'empty-state.ts',
      language: 'ts',
      code: `import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'basic-empty-state-example.html',
      language: 'html',
      code: `<kui-empty-state
  title="No projects yet"
  description="Create the first project to start working with your team."
>
  <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 8v13H3V8" />
    <path d="M1 3h22v5H1z" />
    <path d="M10 12h4" />
  </svg>

  <div kuiEmptyStateActions>
    <button kuiButton type="button">Create project</button>
    <button kuiButton shape="ghost" type="button">Import</button>
  </div>
</kui-empty-state>`,
    },
    {
      label: 'TS',
      filename: 'basic-empty-state-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-empty-state-example',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
  ],
  templateUrl: './basic-empty-state-example.html',
  styleUrl: './basic-empty-state-example.scss',
})
export class BasicEmptyStateExample {}`,
    },
  ];

  protected readonly contextTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-empty-state context="no-results" title="No results" description="Try a different search term or clear your filters.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>

<kui-empty-state context="error" title="Couldn't load projects" description="Something went wrong while loading this list.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
  <div kuiEmptyStateActions>
    <button kuiButton shape="soft" type="button">Retry</button>
  </div>
</kui-empty-state>

<kui-empty-state context="no-access" title="No access" description="Ask a workspace admin for access to this project.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>

<kui-empty-state context="success" title="All caught up" description="No pending reviews are waiting on you right now.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-empty-state size="sm" title="No comments" description="Be the first to leave a comment.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>

<kui-empty-state size="md" title="No comments" description="Be the first to leave a comment.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>

<kui-empty-state size="lg" title="No comments" description="Be the first to leave a comment.">
  <svg kuiEmptyStateIcon viewBox="0 0 24 24">...</svg>
</kui-empty-state>`,
    },
  ];
}
