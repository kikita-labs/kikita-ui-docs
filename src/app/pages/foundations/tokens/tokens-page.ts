import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import { TOKENS_LAYER_TABS, TOKENS_SCALE_TABS, TOKENS_SEED_ROWS } from './tokens.docs-content';

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
}
