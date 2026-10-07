import { Component } from '@angular/core';

import { KuiBreadcrumbItem, KuiBreadcrumbs, KuiBreadcrumbSeparator } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-breadcrumbs-example',
  imports: [KuiBreadcrumbItem, KuiBreadcrumbSeparator, KuiBreadcrumbs],
  templateUrl: './basic-breadcrumbs-example.html',
  styleUrl: './basic-breadcrumbs-example.scss',
})
export class BasicBreadcrumbsExample {}
