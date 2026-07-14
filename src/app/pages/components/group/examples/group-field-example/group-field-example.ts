import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiGroupDirective,
  KuiIconButtonDirective,
  KuiIconComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';

const SEARCH_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

@Component({
  selector: 'app-group-field-example',
  imports: [
    KuiButtonDirective,
    KuiGroupDirective,
    KuiIconButtonDirective,
    KuiIconComponent,
    KuiInputDirective,
  ],
  templateUrl: './group-field-example.html',
  styleUrl: './group-field-example.scss',
})
export class GroupFieldExample {
  protected readonly searchIcon = SEARCH_ICON;
}
