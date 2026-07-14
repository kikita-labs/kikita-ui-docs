import { Component } from '@angular/core';

import { KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-shapes-example',
  imports: [KuiSkeletonDirective],
  templateUrl: './skeleton-shapes-example.html',
  styleUrl: './skeleton-shapes-example.scss',
})
export class SkeletonShapesExample {}
