import { Component } from '@angular/core';

import { KuiButtonDirective, KuiTooltipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tooltip-example',
  imports: [KuiButtonDirective, KuiTooltipDirective],
  templateUrl: './basic-tooltip-example.html',
  styleUrl: './basic-tooltip-example.scss',
})
export class BasicTooltipExample {}
