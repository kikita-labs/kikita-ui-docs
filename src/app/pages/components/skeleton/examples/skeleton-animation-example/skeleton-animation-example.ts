import { Component } from '@angular/core';
import { KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-animation-example',
  imports: [KuiSkeletonDirective],
  templateUrl: './skeleton-animation-example.html',
  styleUrl: './skeleton-animation-example.scss',
})
export class SkeletonAnimationExample {}
