import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  KuiBadgeDirective,
  KuiButtonDirective,
  KuiCardDirective,
  KuiSwitchDirective,
} from '@kikita-labs/ui';
import { CodeTab } from '../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../shared/docs-ui/code-tabs/code-tabs';

@Component({
  selector: 'app-home-page',
  imports: [
    CodeTabs,
    KuiBadgeDirective,
    KuiButtonDirective,
    KuiCardDirective,
    KuiSwitchDirective,
    RouterLink,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly installTabs: readonly CodeTab[] = [
    {
      label: 'Install',
      language: 'bash',
      code: `ng add @kikita-labs/ui`,
    },
    {
      label: 'Provider',
      language: 'ts',
      code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};`,
    },
    {
      label: 'Styles',
      language: 'json',
      code: `"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]`,
    },
  ];
}
