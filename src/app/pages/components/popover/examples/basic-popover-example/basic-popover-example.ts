import { Component } from '@angular/core';

import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-popover-example',
  imports: [KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective],
  templateUrl: './basic-popover-example.html',
})
export class BasicPopoverExample {}
