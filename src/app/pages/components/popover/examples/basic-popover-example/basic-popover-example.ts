import { Component } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './basic-popover-example.html',
})
export class BasicPopoverExample {}
