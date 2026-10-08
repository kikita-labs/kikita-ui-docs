import { Component } from '@angular/core';

import { DOCS_EXTERNAL_LINKS } from '@core/navigation';
import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  MIGRATION_AUTOMATIC_TABS,
  MIGRATION_PROVIDER_ROWS,
  MIGRATION_RENAMED_ROWS,
} from './migration.docs-content';

function libraryDocUrl(doc: string): string {
  return `${DOCS_EXTERNAL_LINKS.githubRepository}/blob/v${KIKITA_UI_PACKAGE_VERSION}/docs/${doc}.md`;
}

@Component({
  selector: 'app-migration-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './migration-page.html',
  styleUrl: './migration-page.scss',
})
export class MigrationPage {
  protected readonly automaticTabs = MIGRATION_AUTOMATIC_TABS;

  protected readonly renamedRows = MIGRATION_RENAMED_ROWS;

  protected readonly docUrlMigrationV2 = libraryDocUrl('migration-v2');

  protected readonly providerRows = MIGRATION_PROVIDER_ROWS;
}
