import { Component, signal } from '@angular/core';

import { KuiSegment, KuiSegmented } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-segmented-example',
  imports: [KuiSegment, KuiSegmented],
  templateUrl: './basic-segmented-example.html',
  styleUrl: './basic-segmented-example.scss',
})
export class BasicSegmentedExample {
  protected readonly view = signal('list');
}
