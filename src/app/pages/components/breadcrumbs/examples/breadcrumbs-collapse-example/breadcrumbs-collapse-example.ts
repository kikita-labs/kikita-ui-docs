import { Component } from '@angular/core';

import {
  KuiBreadcrumbItem,
  KuiBreadcrumbs,
  KuiBreadcrumbSeparator,
  KuiMenu,
  KuiMenuFor,
  KuiMenuItem,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-breadcrumbs-collapse-example',
  imports: [
    KuiBreadcrumbItem,
    KuiBreadcrumbSeparator,
    KuiBreadcrumbs,
    KuiMenu,
    KuiMenuFor,
    KuiMenuItem,
  ],
  templateUrl: './breadcrumbs-collapse-example.html',
  styleUrl: './breadcrumbs-collapse-example.scss',
})
export class BreadcrumbsCollapseExample {}
