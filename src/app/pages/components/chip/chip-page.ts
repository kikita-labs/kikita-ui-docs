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
import { BasicChipExample } from './examples/basic-chip-example/basic-chip-example';
import { CHIP_API_ROWS } from './chip.api-schema';
import { ChipStatesExample } from './examples/chip-states-example/chip-states-example';
import { InteractiveChipExample } from './examples/interactive-chip-example/interactive-chip-example';
import { RemovableChipExample } from './examples/removable-chip-example/removable-chip-example';

@Component({
  selector: 'app-chip-page',
  imports: [
    ApiTable,
    BasicChipExample,
    ChipStatesExample,
    CodeTabs,
    DocSection,
    InteractiveChipExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RemovableChipExample,
    RouterLink,
  ],
  templateUrl: './chip-page.html',
  styleUrl: './chip-page.scss',
})
export class ChipPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'chip.ts',
      language: 'ts',
      code: `import { KuiChipDirective, KuiChipRemoveDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiChip>Design</span>
<span kuiChip appearance="primary">Engineering</span>
<span kuiChip appearance="success">Shipped</span>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiChipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-chip-example',
  imports: [KuiChipDirective],
  templateUrl: './basic-chip-example.html',
  styleUrl: './basic-chip-example.scss',
})
export class BasicChipExample {}`,
    },
  ];

  protected readonly removableTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `@for (tag of tags(); track tag) {
  <span kuiChip appearance="primary" (removed)="removeTag(tag)">
    <span class="kui-chip-label">{{ tag }}</span>
    <button kuiChipRemove type="button" [attr.aria-label]="'Remove ' + tag"></button>
  </span>
}`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `protected readonly tags = signal(['Design', 'Engineering', 'Product']);

protected removeTag(tag: string): void {
  this.tags.update((current) => current.filter((existing) => existing !== tag));
}`,
    },
  ];

  protected readonly interactiveTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiChip type="button" appearance="primary" (click)="select('all')">All</button>
<button kuiChip type="button" (click)="select('open')">Open</button>
<button kuiChip type="button" (click)="select('closed')">Closed</button>`,
    },
  ];

  protected readonly statesTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<span kuiChip disabled>
  <span class="kui-chip-label">Design</span>
  <button kuiChipRemove type="button" aria-label="Remove Design"></button>
</span>
<span kuiChip invalid appearance="danger">Missing owner</span>`,
    },
  ];

  protected readonly apiRows = CHIP_API_ROWS;
}
