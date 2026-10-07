import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiBadge, KuiButton, KuiCard, KuiSwitch } from '@kikita-labs/ui';

import { CodeTabs } from '@shared/docs-ui/code-tabs';

import { HOME_INSTALL_TABS } from './home.docs-content';

@Component({
  selector: 'app-home-page',
  imports: [CodeTabs, KuiBadge, KuiButton, KuiCard, KuiSwitch, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly installTabs = HOME_INSTALL_TABS;
}
