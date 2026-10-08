import { Component } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-splitter-multiple-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './splitter-multiple-example.html',
  styleUrl: './splitter-multiple-example.scss',
})
export class SplitterMultipleExample {}
