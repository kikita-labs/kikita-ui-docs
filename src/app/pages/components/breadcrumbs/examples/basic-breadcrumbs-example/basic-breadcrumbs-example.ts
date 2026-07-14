import { Component } from '@angular/core';

import {
  KuiBreadcrumbItemDirective,
  KuiBreadcrumbsDirective,
  KuiBreadcrumbSeparatorComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-breadcrumbs-example',
  imports: [KuiBreadcrumbItemDirective, KuiBreadcrumbSeparatorComponent, KuiBreadcrumbsDirective],
  templateUrl: './basic-breadcrumbs-example.html',
  styleUrl: './basic-breadcrumbs-example.scss',
})
export class BasicBreadcrumbsExample {}
