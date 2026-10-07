import { Component } from '@angular/core';

import { KuiButton, KuiTooltip } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tooltip-example',
  imports: [KuiButton, KuiTooltip],
  templateUrl: './basic-tooltip-example.html',
  styleUrl: './basic-tooltip-example.scss',
})
export class BasicTooltipExample {}
