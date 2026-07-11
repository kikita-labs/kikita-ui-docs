import { Component } from '@angular/core';
import { KuiButtonDirective, KuiGroupDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-group-size-example',
  imports: [KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-size-example.html',
  styleUrl: './group-size-example.scss',
})
export class GroupSizeExample {}
