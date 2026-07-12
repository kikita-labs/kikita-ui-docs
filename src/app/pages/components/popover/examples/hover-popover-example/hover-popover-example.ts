import { Component } from '@angular/core';
import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-hover-popover-example',
  imports: [KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective],
  templateUrl: './hover-popover-example.html',
})
export class HoverPopoverExample {}
