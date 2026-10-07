import { Component } from '@angular/core';

import { KuiCard, KuiSkeleton } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-composition-example',
  imports: [KuiCard, KuiSkeleton],
  templateUrl: './skeleton-composition-example.html',
  styleUrl: './skeleton-composition-example.scss',
})
export class SkeletonCompositionExample {}
