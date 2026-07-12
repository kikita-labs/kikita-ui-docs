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
import { BasicTabsExample } from './examples/basic-tabs-example/basic-tabs-example';
import { NavigationTabsExample } from './examples/navigation-tabs-example/navigation-tabs-example';
import { PillTabsExample } from './examples/pill-tabs-example/pill-tabs-example';
import { VerticalTabsExample } from './examples/vertical-tabs-example/vertical-tabs-example';
import { TABS_API_ROWS } from './tabs.api-schema';

@Component({
  selector: 'app-tabs-page',
  imports: [
    ApiTable,
    BasicTabsExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    NavigationTabsExample,
    PageHeader,
    PillTabsExample,
    RouterLink,
    VerticalTabsExample,
  ],
  templateUrl: './tabs-page.html',
  styleUrl: './tabs-page.scss',
})
export class TabsPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TABS_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'tabs.ts',
      language: 'ts',
      code: `import { KuiTabsComponent, KuiTabDirective, KuiTabPanelDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-tabs [(selected)]="activeTab">
  <button kuiTab value="overview">Overview</button>
  <button kuiTab value="settings">Settings</button>
  <button kuiTab value="logs">Logs</button>

  <div kuiTabPanel value="overview">Overview content.</div>
  <div kuiTabPanel value="settings">Settings content.</div>
  <div kuiTabPanel value="logs">Log content.</div>
</kui-tabs>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './basic-tabs-example.html',
})
export class BasicTabsExample {
  protected readonly activeTab = signal('overview');
}`,
    },
  ];

  protected readonly pillTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-tabs variant="pill" [(selected)]="activeTab">
  <button kuiTab value="daily">Daily</button>
  <button kuiTab value="weekly" hasError errorLabel="Contains validation errors">Weekly</button>
  <button kuiTab value="monthly">Monthly</button>

  <div kuiTabPanel value="daily">Daily report content.</div>
  <div kuiTabPanel value="weekly">Weekly report content.</div>
  <div kuiTabPanel value="monthly">Monthly report content.</div>
</kui-tabs>`,
    },
  ];

  protected readonly verticalTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-tabs orientation="vertical" [(selected)]="activeTab">
  <button kuiTab value="profile">Profile</button>
  <button kuiTab value="billing">Billing</button>
  <button kuiTab value="security">Security</button>

  <div kuiTabPanel value="profile">Profile content.</div>
  <div kuiTabPanel value="billing">Billing content.</div>
  <div kuiTabPanel value="security">Security content.</div>
</kui-tabs>`,
    },
  ];

  protected readonly navigationTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-tabs [(selected)]="currentRoute" [controlsPanels]="false" aria-label="Sections">
  <button kuiTab value="/overview">Overview</button>
  <button kuiTab value="/settings">Settings</button>
</kui-tabs>`,
    },
  ];
}
