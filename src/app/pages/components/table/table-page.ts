import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { TABLE_EXAMPLE_SOURCES } from '@generated/example-sources/table.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  BasicSortableTableExample,
  CombinedTableExample,
  RowSelectionTableExample,
  StickyHeaderTableExample,
} from './examples';
import { TABLE_API_ROWS } from './table.api-schema';
import { TABLE_API_DESCRIPTION, TABLE_IMPORT_TABS, TABLE_STATUS } from './table.docs-content';

@Component({
  selector: 'app-table-page',
  imports: [
    ApiTable,
    BasicSortableTableExample,
    CodeTabs,
    CombinedTableExample,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    RowSelectionTableExample,
    StickyHeaderTableExample,
  ],
  templateUrl: './table-page.html',
  styleUrl: './table-page.scss',
})
export class TablePage {
  protected readonly status = TABLE_STATUS;
  protected readonly apiDescription = TABLE_API_DESCRIPTION;
  protected readonly apiRows = TABLE_API_ROWS;

  protected readonly importTabs = TABLE_IMPORT_TABS;

  protected readonly basicTabs = TABLE_EXAMPLE_SOURCES['basic-sortable-table-example'];

  protected readonly selectionTabs = TABLE_EXAMPLE_SOURCES['row-selection-table-example'];

  protected readonly stickyTabs = TABLE_EXAMPLE_SOURCES['sticky-header-table-example'];

  protected readonly combinedTabs = TABLE_EXAMPLE_SOURCES['combined-table-example'];
}
