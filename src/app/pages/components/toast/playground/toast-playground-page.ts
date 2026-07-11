import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiToastAppearance,
  KuiToastConfig,
  KuiToastPosition,
  kuiToast,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { TOAST_API_ROWS } from '../toast.api-schema';

const DEFAULT_POSITION: KuiToastPosition = 'bottom-center';

@Component({
  selector: 'app-toast-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './toast-playground-page.html',
  styleUrl: './toast-playground-page.scss',
})
export class ToastPlaygroundPage {
  private readonly toast = kuiToast();

  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TOAST_API_ROWS;

  // maxVisible is app-wide only (set via provideKuiToastOptions) and has no runtime setter,
  // so it can't be represented safely here. See the "Global defaults" section on the main page.
  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'title', label: 'title', kind: 'string', defaultValue: 'Saved' },
    {
      key: 'message',
      label: 'message',
      kind: 'string',
      defaultValue: 'Your changes have been saved.',
    },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['neutral', 'success', 'warning', 'danger', 'info'],
      defaultValue: 'neutral',
    },
    { key: 'actionLabel', label: 'actionLabel', kind: 'string', defaultValue: '' },
    { key: 'duration', label: 'duration', kind: 'number', defaultValue: 5000 },
    { key: 'persistent', label: 'persistent', kind: 'boolean', defaultValue: false },
    { key: 'closable', label: 'closable', kind: 'boolean', defaultValue: true },
    { key: 'showIcon', label: 'showIcon', kind: 'boolean', defaultValue: true },
    { key: 'showProgress', label: 'showProgress', kind: 'boolean', defaultValue: false },
    {
      key: 'position',
      label: 'position (demo only, via setPosition)',
      kind: 'enum',
      options: [
        'top-start',
        'top-center',
        'top-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ],
      defaultValue: DEFAULT_POSITION,
    },
  ];

  protected triggerLabel(values: PlaygroundValues): string {
    const title = values['title'] as string;

    return title ? `Show "${title}"` : 'Show toast';
  }

  protected openToast(values: PlaygroundValues): void {
    const position = values['position'] as KuiToastPosition;

    if (position !== DEFAULT_POSITION) {
      this.toast.setPosition(position);
    }

    this.toast.open(this.configOf(values));
  }

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const config = this.configOf(values);
    const position = values['position'] as KuiToastPosition;
    const positionLine =
      position !== DEFAULT_POSITION ? `this.toast.setPosition('${position}');\n` : '';

    const configLines = Object.entries(config)
      .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
      .join('\n');

    return [
      {
        label: 'TS',
        language: 'ts',
        code: `${positionLine}this.toast.open({\n${configLines}\n});`,
      },
    ];
  };

  private configOf(values: PlaygroundValues): KuiToastConfig {
    const title = (values['title'] as string) || 'Saved';
    const message = values['message'] as string;
    const appearance = values['appearance'] as KuiToastAppearance;
    const actionLabel = values['actionLabel'] as string;
    const duration = values['duration'] as number;
    const persistent = values['persistent'] as boolean;
    const closable = values['closable'] as boolean;
    const showIcon = values['showIcon'] as boolean;
    const showProgress = values['showProgress'] as boolean;

    const config: KuiToastConfig = { title };

    if (message) {
      config.message = message;
    }

    if (appearance !== 'neutral') {
      config.appearance = appearance;
    }

    if (actionLabel) {
      config.actionLabel = actionLabel;
    }

    if (duration !== 5000) {
      config.duration = duration;
    }

    if (persistent) {
      config.persistent = persistent;
    }

    if (!closable) {
      config.closable = closable;
    }

    if (!showIcon) {
      config.showIcon = showIcon;
    }

    if (showProgress) {
      config.showProgress = showProgress;
    }

    return config;
  }
}
