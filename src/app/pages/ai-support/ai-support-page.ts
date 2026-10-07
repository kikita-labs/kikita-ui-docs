import { Component, inject } from '@angular/core';

import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import {
  DOCS_MCP_PACKAGE_SPECIFIER,
  DocsCanonicalUrlService,
  resolveDocsSiteTokens,
} from '@core/site';
import { type CodeTab, CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  AI_SUPPORT_AGENT_TABS,
  AI_SUPPORT_DIRECT_TABS,
  AI_SUPPORT_MCP_TABS,
} from './ai-support.docs-content';

@Component({
  selector: 'app-ai-support-page',
  imports: [CodeTabs, DocSection, PageHeader],
  templateUrl: './ai-support-page.html',
  styleUrl: './ai-support-page.scss',
})
export class AiSupportPage {
  private readonly siteUrl = inject(DocsCanonicalUrlService).root();

  protected readonly packageVersion = KIKITA_UI_PACKAGE_LABEL;

  protected readonly agentTabs = this.resolveTabs(AI_SUPPORT_AGENT_TABS);
  protected readonly directTabs = this.resolveTabs(AI_SUPPORT_DIRECT_TABS);
  protected readonly mcpTabs = this.resolveTabs(AI_SUPPORT_MCP_TABS);

  /** Fills in the URLs and MCP package that belong to the documentation version being served. */
  private resolveTabs(tabs: readonly CodeTab[]): readonly CodeTab[] {
    return tabs.map((tab) => ({
      ...tab,
      code: resolveDocsSiteTokens(tab.code, {
        siteUrl: this.siteUrl,
        mcpPackage: DOCS_MCP_PACKAGE_SPECIFIER,
      }),
    }));
  }
}
