import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { LocalScrollContainerExample } from './examples/local-scroll-container-example/local-scroll-container-example';
import { SCROLLBAR_API_ROWS } from './scrollbar.api-schema';

@Component({
  selector: 'app-scrollbar-page',
  imports: [ApiTable, CodeTabs, DocSection, LivePreview, LocalScrollContainerExample, PageHeader],
  templateUrl: './scrollbar-page.html',
  styleUrl: './scrollbar-page.scss',
})
export class ScrollbarPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `CSS custom properties and provider option verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SCROLLBAR_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'scrollbar.ts',
      language: 'ts',
      code: `import '@kikita-labs/ui/styles/kikita-ui.css';`,
    },
  ];

  protected readonly localTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div class="kui-scroll" style="max-block-size: 240px; overflow: auto">
  <p>Scrollable content...</p>
  <p>Scrollable content...</p>
  <p>Scrollable content...</p>
</div>`,
    },
  ];

  protected readonly providerTabs: readonly CodeTab[] = [
    {
      label: 'app.config.ts',
      language: 'ts',
      code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi({ scrollbars: 'styled' })],
};`,
    },
  ];
}
