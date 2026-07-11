import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicToastExample } from './examples/basic-toast-example/basic-toast-example';
import { ToastActionExample } from './examples/toast-action-example/toast-action-example';
import { ToastPositionExample } from './examples/toast-position-example/toast-position-example';
import { TOAST_API_ROWS } from './toast.api-schema';

@Component({
  selector: 'app-toast-page',
  imports: [
    ApiTable,
    BasicToastExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    ToastActionExample,
    ToastPositionExample,
  ],
  templateUrl: './toast-page.html',
  styleUrl: './toast-page.scss',
})
export class ToastPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'toast.ts',
      language: 'ts',
      code: `import { kuiToast, provideKuiToastOptions } from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { kuiToast } from '@kikita-labs/ui';

@Component({ ... })
export class MyComponent {
  private toast = kuiToast();

  save() {
    this.api.save().subscribe({
      next: () =>
        this.toast.open({ title: 'Saved', appearance: 'success' }),
      error: () =>
        this.toast.open({ title: 'Failed', appearance: 'danger', persistent: true }),
    });
  }
}`,
    },
  ];

  protected readonly actionTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { kuiToast } from '@kikita-labs/ui';

@Component({ ... })
export class MyComponent {
  private toast = kuiToast();
  private destroyRef = inject(DestroyRef);

  deleteMessage() {
    const ref = this.toast.open({
      title: 'Message deleted',
      actionLabel: 'Undo',
      duration: 6000,
    });

    ref.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.undoDelete());
  }
}`,
    },
  ];

  protected readonly positionTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `// Interactive / demo-only runtime change:
this.toast.setPosition('top-end');
this.toast.open({ title: 'Position changed' });

// Preferred app-level configuration:
provideKuiToastOptions({ position: 'top-end' });`,
    },
  ];

  protected readonly globalDefaultsTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      filename: 'app.config.ts',
      language: 'ts',
      code: `export const appConfig: ApplicationConfig = {
  providers: [
    provideKuiToastOptions({
      position: 'top-end',
      duration: 4000,
      maxVisible: 5,
    }),
  ],
};`,
    },
  ];

  protected readonly apiRows = TOAST_API_ROWS;
}
