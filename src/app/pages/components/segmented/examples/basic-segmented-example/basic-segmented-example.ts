import { Component, signal } from '@angular/core';

import { KuiSegmentDirective, KuiSegmentedComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-segmented-example',
  imports: [KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './basic-segmented-example.html',
  styleUrl: './basic-segmented-example.scss',
})
export class BasicSegmentedExample {
  protected readonly view = signal('list');
}
