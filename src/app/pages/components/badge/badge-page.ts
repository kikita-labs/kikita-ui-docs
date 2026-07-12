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
import { BasicBadgeExample } from './examples/basic-badge-example/basic-badge-example';
import { BADGE_API_ROWS } from './badge.api-schema';
import { BadgeAppearanceExample } from './examples/badge-appearance-example/badge-appearance-example';
import { BadgeSizeExample } from './examples/badge-size-example/badge-size-example';

@Component({
  selector: 'app-badge-page',
  imports: [
    ApiTable,
    BadgeAppearanceExample,
    BadgeSizeExample,
    BasicBadgeExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './badge-page.html',
  styleUrl: './badge-page.scss',
})
export class BadgePage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'badge.ts',
      language: 'ts',
      code: `import { KuiBadgeDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiBadge>Neutral</span>
<span kuiBadge appearance="success">Ready</span>
<span kuiBadge appearance="danger">Error</span>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-badge-example',
  imports: [KuiBadgeDirective],
  templateUrl: './basic-badge-example.html',
  styleUrl: './basic-badge-example.scss',
})
export class BasicBadgeExample {}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiBadge appearance="neutral">Neutral</span>
<span kuiBadge appearance="primary">Primary</span>
<span kuiBadge appearance="success">Success</span>
<span kuiBadge appearance="warning">Warning</span>
<span kuiBadge appearance="danger">Danger</span>
<span kuiBadge appearance="info">Info</span>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiBadge size="xs" appearance="primary">Extra small</span>
<span kuiBadge size="sm" appearance="primary">Small</span>
<span kuiBadge size="md" appearance="primary">Medium</span>
<span kuiBadge size="lg" appearance="primary">Large</span>`,
    },
  ];

  protected readonly apiRows = BADGE_API_ROWS;
}
