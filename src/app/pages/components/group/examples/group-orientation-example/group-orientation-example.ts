import { Component } from '@angular/core';

import { KuiButtonDirective, KuiGroupDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-group-orientation-example',
  imports: [KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-orientation-example.html',
  styleUrl: './group-orientation-example.scss',
})
export class GroupOrientationExample {}
