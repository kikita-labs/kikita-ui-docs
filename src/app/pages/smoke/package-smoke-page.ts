import { Component } from '@angular/core';

/* docs-source:package-smoke-consumer-imports:start */
import {
  KuiBadgeDirective,
  KuiButtonDirective,
  KuiCardDirective,
  KuiFieldComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';

/* docs-source:package-smoke-consumer-imports:end */
import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import { SMOKE_EXAMPLE_SOURCES } from '@generated/example-sources/smoke.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';

import { SMOKE_API_ROWS } from './smoke.docs-content';

@Component({
  selector: 'app-package-smoke-page',
  imports: [
    ApiTable,
    CodeTabs,
    DocSection,
    KuiBadgeDirective,
    KuiButtonDirective,
    KuiCardDirective,
    KuiFieldComponent,
    KuiInputDirective,
    LivePreview,
    PageHeader,
  ],
  templateUrl: './package-smoke-page.html',
  styleUrl: './package-smoke-page.scss',
})
export class PackageSmokePage {
  protected readonly packageVersion = KIKITA_UI_PACKAGE_LABEL;

  protected readonly apiRows = SMOKE_API_ROWS;
  protected readonly codeTabs = SMOKE_EXAMPLE_SOURCES['package-smoke-consumer'];
}
