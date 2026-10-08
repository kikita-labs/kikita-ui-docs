import { Component } from '@angular/core';

import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  INSTALLATION_CLI_TABS,
  INSTALLATION_ICON_ROWS,
  INSTALLATION_ICON_TABS,
  INSTALLATION_MANUAL_TABS,
  INSTALLATION_OPTION_ROWS,
  INSTALLATION_REGISTRY_TABS,
  INSTALLATION_STYLE_TABS,
  INSTALLATION_UPGRADE_TABS,
} from './installation.docs-content';

@Component({
  selector: 'app-installation-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './installation-page.html',
  styleUrl: './installation-page.scss',
})
export class InstallationPage {
  protected readonly packageVersion = KIKITA_UI_PACKAGE_LABEL;

  protected readonly registryTabs = INSTALLATION_REGISTRY_TABS;
  protected readonly cliTabs = INSTALLATION_CLI_TABS;
  protected readonly manualTabs = INSTALLATION_MANUAL_TABS;
  protected readonly optionRows = INSTALLATION_OPTION_ROWS;
  protected readonly styleTabs = INSTALLATION_STYLE_TABS;
  protected readonly upgradeTabs = INSTALLATION_UPGRADE_TABS;
  protected readonly iconTabs = INSTALLATION_ICON_TABS;
  protected readonly iconRows = INSTALLATION_ICON_ROWS;
}
