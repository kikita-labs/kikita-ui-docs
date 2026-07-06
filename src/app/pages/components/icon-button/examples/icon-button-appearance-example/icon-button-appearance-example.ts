import { Component } from '@angular/core';
import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

const PLUS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const TRASH_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

@Component({
  selector: 'app-icon-button-appearance-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-appearance-example.html',
  styleUrl: './icon-button-appearance-example.scss',
})
export class IconButtonAppearanceExample {
  protected readonly plusIcon = PLUS_ICON;
  protected readonly trashIcon = TRASH_ICON;
}
