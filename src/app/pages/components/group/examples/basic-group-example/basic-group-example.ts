import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiGroupDirective,
  KuiIconButtonDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

const MORE_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>';

@Component({
  selector: 'app-basic-group-example',
  imports: [KuiButtonDirective, KuiGroupDirective, KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './basic-group-example.html',
  styleUrl: './basic-group-example.scss',
})
export class BasicGroupExample {
  protected readonly moreIcon = MORE_ICON;
}
