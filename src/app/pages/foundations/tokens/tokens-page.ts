import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  TOKENS_ICON_ROWS,
  TOKENS_LAYER_TABS,
  TOKENS_MOVED_ROWS,
  TOKENS_REMOVED_ROWS,
  TOKENS_ROLE_ROWS,
  TOKENS_SCALE_TABS,
  TOKENS_SEED_ROWS,
  TOKENS_SHARED_ROWS,
  TOKENS_SHARED_TABS,
} from './tokens.docs-content';

@Component({
  selector: 'app-tokens-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './tokens-page.html',
  styleUrl: './tokens-page.scss',
})
export class TokensPage {
  protected readonly layerTabs = TOKENS_LAYER_TABS;
  protected readonly seedRows = TOKENS_SEED_ROWS;
  protected readonly scaleTabs = TOKENS_SCALE_TABS;
  protected readonly roleRows = TOKENS_ROLE_ROWS;
  protected readonly sharedRows = TOKENS_SHARED_ROWS;
  protected readonly sharedTabs = TOKENS_SHARED_TABS;
  protected readonly iconRows = TOKENS_ICON_ROWS;
  protected readonly movedRows = TOKENS_MOVED_ROWS;
  protected readonly removedRows = TOKENS_REMOVED_ROWS;
}
