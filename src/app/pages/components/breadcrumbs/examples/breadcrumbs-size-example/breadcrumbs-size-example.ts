import { Component } from '@angular/core';

import { KuiBreadcrumbItem, KuiBreadcrumbs, KuiBreadcrumbSeparator } from '@kikita-labs/ui';

@Component({
  selector: 'app-breadcrumbs-size-example',
  imports: [KuiBreadcrumbItem, KuiBreadcrumbSeparator, KuiBreadcrumbs],
  templateUrl: './breadcrumbs-size-example.html',
  styleUrl: './breadcrumbs-size-example.scss',
})
export class BreadcrumbsSizeExample {}
