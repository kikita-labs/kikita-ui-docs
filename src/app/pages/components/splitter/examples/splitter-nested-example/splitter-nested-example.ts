import { Component } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-splitter-nested-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './splitter-nested-example.html',
  styleUrl: './splitter-nested-example.scss',
})
export class SplitterNestedExample {}
