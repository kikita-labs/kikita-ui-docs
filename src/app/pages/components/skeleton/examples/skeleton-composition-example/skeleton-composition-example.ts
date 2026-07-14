import { Component } from '@angular/core';

import { KuiCardDirective, KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-composition-example',
  imports: [KuiCardDirective, KuiSkeletonDirective],
  templateUrl: './skeleton-composition-example.html',
  styleUrl: './skeleton-composition-example.scss',
})
export class SkeletonCompositionExample {}
