import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiBadgeDirective, KuiCardDirective } from '@kikita-labs/ui';

import type { DocsComponentStatus } from '@core/components';
import { DOCS_COMPONENT_CATEGORIES } from '@core/components';
import { PageHeader } from '@shared/docs-ui/page-header';

@Component({
  selector: 'app-components-overview-page',
  imports: [KuiBadgeDirective, KuiCardDirective, NgTemplateOutlet, PageHeader, RouterLink],
  templateUrl: './components-overview-page.html',
  styleUrl: './components-overview-page.scss',
})
export class ComponentsOverviewPage {
  protected readonly categories = DOCS_COMPONENT_CATEGORIES;

  protected statusLabel(status: DocsComponentStatus): string {
    return status === 'docs-pending' ? 'Draft' : 'Stable';
  }
}
