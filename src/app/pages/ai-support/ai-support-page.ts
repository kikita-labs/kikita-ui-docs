import { Component } from '@angular/core';

import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
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
  protected readonly packageVersion = KIKITA_UI_PACKAGE_LABEL;

  protected readonly agentTabs = AI_SUPPORT_AGENT_TABS;
  protected readonly directTabs = AI_SUPPORT_DIRECT_TABS;
  protected readonly mcpTabs = AI_SUPPORT_MCP_TABS;
}
