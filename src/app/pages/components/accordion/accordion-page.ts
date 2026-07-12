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
import { ACCORDION_API_ROWS } from './accordion.api-schema';
import { AppearanceAccordionExample } from './examples/appearance-accordion-example/appearance-accordion-example';
import { BasicAccordionExample } from './examples/basic-accordion-example/basic-accordion-example';
import { IconAccordionExample } from './examples/icon-accordion-example/icon-accordion-example';
import { MultiAccordionExample } from './examples/multi-accordion-example/multi-accordion-example';

@Component({
  selector: 'app-accordion-page',
  imports: [
    ApiTable,
    AppearanceAccordionExample,
    BasicAccordionExample,
    CodeTabs,
    DocSection,
    IconAccordionExample,
    KuiButtonDirective,
    LivePreview,
    MultiAccordionExample,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.scss',
})
export class AccordionPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = ACCORDION_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'accordion.ts',
      language: 'ts',
      code: `import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-accordion mode="exclusive" appearance="default" size="md">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>

  <kui-accordion-item id="notifications" header="Notifications">
    Manage push notifications and email digests.
  </kui-accordion-item>

  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './basic-accordion-example.html',
})
export class BasicAccordionExample {}`,
    },
  ];

  protected readonly multiTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-accordion mode="multi" [(expandedItems)]="expanded">
  <kui-accordion-item id="profile" header="Profile">Profile content.</kui-accordion-item>
  <kui-accordion-item id="billing" header="Billing">Billing content.</kui-accordion-item>
  <kui-accordion-item id="team" header="Team members">Team content.</kui-accordion-item>
</kui-accordion>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-multi-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './multi-accordion-example.html',
})
export class MultiAccordionExample {
  protected readonly expanded = signal(['profile']);
}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-accordion appearance="bordered">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>
  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>

<kui-accordion appearance="ghost">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>
  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>`,
    },
  ];

  protected readonly iconTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-accordion-item id="settings" header="Settings">
  <ng-template kuiAccordionIcon>
    <kui-icon [source]="settingsIcon" />
  </ng-template>

  Settings content with a leading icon slot.
</kui-accordion-item>

<kui-accordion-item id="disabled" header="Archived project" [disabled]="true">
  This section is disabled and cannot be toggled.
</kui-accordion-item>`,
    },
  ];
}
