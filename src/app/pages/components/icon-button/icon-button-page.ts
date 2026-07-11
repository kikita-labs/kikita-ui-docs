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
import { IconButtonAppearanceExample } from './examples/icon-button-appearance-example/icon-button-appearance-example';
import { IconButtonSizeExample } from './examples/icon-button-size-example/icon-button-size-example';
import { ICON_BUTTON_API_ROWS } from './icon-button.api-schema';

@Component({
  selector: 'app-icon-button-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    IconButtonAppearanceExample,
    IconButtonSizeExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './icon-button-page.html',
  styleUrl: './icon-button-page.scss',
})
export class IconButtonPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = ICON_BUTTON_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'icon-button.ts',
      language: 'ts',
      code: `import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly usageTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiIconButton type="button" aria-label="Search">
  <kui-icon [source]="searchIcon" />
</button>

<a kuiIconButton href="/settings" aria-label="Settings">
  <kui-icon [source]="settingsIcon" />
</a>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

const SEARCH_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

@Component({
  selector: 'app-icon-button-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-example.html',
})
export class IconButtonExample {
  protected readonly searchIcon = SEARCH_ICON;
}`,
    },
  ];

  protected readonly appearanceTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiIconButton type="button" aria-label="Add item">
  <kui-icon [source]="plusIcon" />
</button>
<button kuiIconButton type="button" shape="soft" aria-label="Add item softly">
  <kui-icon [source]="plusIcon" />
</button>
<button kuiIconButton type="button" shape="outline" aria-label="Add item with outline">
  <kui-icon [source]="plusIcon" />
</button>
<button kuiIconButton type="button" appearance="danger" aria-label="Delete item">
  <kui-icon [source]="trashIcon" />
</button>
<button
  kuiIconButton
  type="button"
  shape="outline"
  appearance="danger"
  aria-label="Delete item with outline"
>
  <kui-icon [source]="trashIcon" />
</button>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiIconButton type="button" size="xs" aria-label="Extra small">
  <kui-icon [source]="settingsIcon" />
</button>
<button kuiIconButton type="button" size="sm" aria-label="Small">
  <kui-icon [source]="settingsIcon" />
</button>
<button kuiIconButton type="button" size="md" aria-label="Medium">
  <kui-icon [source]="settingsIcon" />
</button>
<button kuiIconButton type="button" size="lg" aria-label="Large">
  <kui-icon [source]="settingsIcon" />
</button>
<button kuiIconButton type="button" disabled aria-label="Disabled">
  <kui-icon [source]="settingsIcon" />
</button>`,
    },
  ];
}
