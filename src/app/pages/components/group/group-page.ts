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
import { BasicGroupExample } from './examples/basic-group-example/basic-group-example';
import { GROUP_API_ROWS } from './group.api-schema';
import { GroupFieldExample } from './examples/group-field-example/group-field-example';
import { GroupOrientationExample } from './examples/group-orientation-example/group-orientation-example';
import { GroupSizeExample } from './examples/group-size-example/group-size-example';

@Component({
  selector: 'app-group-page',
  imports: [
    ApiTable,
    BasicGroupExample,
    CodeTabs,
    DocSection,
    GroupFieldExample,
    GroupOrientationExample,
    GroupSizeExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './group-page.html',
  styleUrl: './group-page.scss',
})
export class GroupPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'group.ts',
      language: 'ts',
      code: `import { KuiGroupDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div kuiGroup collapsed>
  <button kuiButton type="button" shape="outline">One</button>
  <button kuiButton type="button" shape="outline">Two</button>
  <button kuiIconButton type="button" shape="outline" aria-label="More options">
    <kui-icon [source]="moreIcon" />
  </button>
</div>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiButtonDirective, KuiGroupDirective, KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-group-example',
  imports: [KuiButtonDirective, KuiGroupDirective, KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './basic-group-example.html',
  styleUrl: './basic-group-example.scss',
})
export class BasicGroupExample {
  protected readonly moreIcon = '<svg>...</svg>';
}`,
    },
  ];

  protected readonly orientationTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div kuiGroup collapsed orientation="horizontal">
  <button kuiButton type="button" shape="outline">Left</button>
  <button kuiButton type="button" shape="outline">Center</button>
  <button kuiButton type="button" shape="outline">Right</button>
</div>

<div kuiGroup collapsed orientation="vertical">
  <button kuiButton type="button" shape="outline">Top</button>
  <button kuiButton type="button" shape="outline">Middle</button>
  <button kuiButton type="button" shape="outline">Bottom</button>
</div>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div kuiGroup collapsed size="xs">...</div>
<div kuiGroup collapsed size="sm">...</div>
<div kuiGroup collapsed size="md">...</div>
<div kuiGroup collapsed size="lg">...</div>`,
    },
  ];

  protected readonly fieldTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div kuiGroup collapsed>
  <input kuiInput placeholder="Search projects" />
  <button kuiIconButton type="button" shape="outline" aria-label="Search">
    <kui-icon [source]="searchIcon" />
  </button>
</div>

<div kuiGroup collapsed size="sm">
  <input kuiInput placeholder="Search" />
  <button kuiButton type="button" shape="outline">Go</button>
</div>`,
    },
  ];

  protected readonly apiRows = GROUP_API_ROWS;
}
