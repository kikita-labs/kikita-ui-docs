import { Component } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-hover-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './hover-popover-example.html',
})
export class HoverPopoverExample {}
