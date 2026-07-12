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
import { ActionPopoverExample } from './examples/action-popover-example/action-popover-example';
import { BasicPopoverExample } from './examples/basic-popover-example/basic-popover-example';
import { HoverPopoverExample } from './examples/hover-popover-example/hover-popover-example';
import { POPOVER_API_ROWS } from './popover.api-schema';

@Component({
  selector: 'app-popover-page',
  imports: [
    ActionPopoverExample,
    ApiTable,
    BasicPopoverExample,
    CodeTabs,
    DocSection,
    HoverPopoverExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './popover-page.html',
  styleUrl: './popover-page.scss',
})
export class PopoverPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = POPOVER_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'popover.ts',
      language: 'ts',
      code: `import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button [kuiPopoverFor]="myPop" kuiButton type="button">Open</button>

<kui-popover #myPop placement="bottom" [arrow]="true" ariaLabel="Details">
  <div class="kui-popover-title">Title</div>
  <div class="kui-popover-desc">Supporting text.</div>
</kui-popover>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-popover-example',
  imports: [KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective],
  templateUrl: './basic-popover-example.html',
})
export class BasicPopoverExample {}`,
    },
  ];

  protected readonly actionTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button [kuiPopoverFor]="confirmPop" kuiButton type="button" appearance="danger">Delete</button>

<kui-popover #confirmPop placement="bottom" align="start" [arrow]="true" ariaLabel="Delete record">
  <div class="kui-popover-title">Delete record?</div>
  <div class="kui-popover-desc" style="margin-bottom: 12px">This cannot be undone.</div>
  <div style="display: flex; gap: 8px; justify-content: flex-end">
    <button kuiButton type="button" shape="outline" size="sm" (click)="confirmPop.close()">Cancel</button>
    <button kuiButton type="button" appearance="danger" size="sm" (click)="delete(); confirmPop.close()">Delete</button>
  </div>
</kui-popover>`,
    },
  ];

  protected readonly hoverTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button [kuiPopoverFor]="hoverPop" kuiButton type="button">Hover me</button>

<kui-popover #hoverPop placement="top" triggerType="hover" [arrow]="true" ariaLabel="Hover details">
  <div class="kui-popover-desc">Opens on hover. Mouse can travel to the panel.</div>
</kui-popover>`,
    },
  ];
}
