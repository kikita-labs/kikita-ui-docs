import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicCardExample } from './examples/basic-card-example/basic-card-example';
import { CARD_API_ROWS } from './card.api-schema';
import { CardAppearanceExample } from './examples/card-appearance-example/card-appearance-example';
import { CardSizeExample } from './examples/card-size-example/card-size-example';
import { CardInteractiveExample } from './examples/card-interactive-example/card-interactive-example';

@Component({
  selector: 'app-card-page',
  imports: [
    ApiTable,
    BasicCardExample,
    CardAppearanceExample,
    CardInteractiveExample,
    CardSizeExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'card.ts',
      language: 'ts',
      code: `import { KuiCardDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<article kuiCard>
  <h3>Default surface</h3>
  <p>Grouped content with Kikita border, radius, and surface tokens.</p>
</article>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-card-example',
  imports: [KuiCardDirective],
  templateUrl: './basic-card-example.html',
  styleUrl: './basic-card-example.scss',
})
export class BasicCardExample {}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<article kuiCard appearance="surface">
  <h3>Surface</h3>
  <p>Default flat card surface.</p>
</article>
<article kuiCard appearance="elevated">
  <h3>Elevated</h3>
  <p>Raised shadow for content that floats above the page.</p>
</article>
<article kuiCard appearance="sunken">
  <h3>Sunken</h3>
  <p>Inset surface for nested or secondary content.</p>
</article>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<article kuiCard size="xs"><h3>Extra small</h3></article>
<article kuiCard size="sm"><h3>Small</h3></article>
<article kuiCard size="md"><h3>Medium</h3></article>
<article kuiCard size="lg"><h3>Large</h3></article>`,
    },
  ];

  protected readonly interactiveTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiCard interactive type="button">
  <h3>Interactive card</h3>
  <p>Hover and focus-visible affordances for a clickable card surface.</p>
</button>
<a kuiCard interactive href="/docs">
  <h3>Linked card</h3>
  <p>Anchor host keeps native link semantics and keyboard behavior.</p>
</a>`,
    },
  ];

  protected readonly apiRows = CARD_API_ROWS;
}
