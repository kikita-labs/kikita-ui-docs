import { Component } from '@angular/core';

import { KuiButtonDirective, KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-separator-vertical-example',
  imports: [KuiButtonDirective, KuiSeparatorDirective],
  templateUrl: './separator-vertical-example.html',
  styleUrl: './separator-vertical-example.scss',
})
export class SeparatorVerticalExample {}
