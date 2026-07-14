import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  kuiToast,
  type KuiToastConfig,
  type KuiToastPosition,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import { definePlaygroundControls, type PlaygroundValues } from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { TOAST_API_ROWS } from '../toast.api-schema';
import { TOAST_API_DESCRIPTION } from '../toast.docs-content';

const DEFAULT_POSITION: KuiToastPosition = 'bottom-center';

const TOAST_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
    label: 'position',
    kind: 'enum',
    options: ['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end'],
    defaultValue: DEFAULT_POSITION,
  },
] as const);

type ToastPlaygroundValues = PlaygroundValues<typeof TOAST_PLAYGROUND_CONTROLS>;

function toToastConfig(values: ToastPlaygroundValues): KuiToastConfig {
  const config: KuiToastConfig = { title: values.title || 'Saved' };

  if (values.message) {
    config.message = values.message;
  }

  if (values.appearance !== 'neutral') {
    config.appearance = values.appearance;
  }

  if (values.actionLabel) {
    config.actionLabel = values.actionLabel;
  }

  if (values.duration !== 5000) {
    config.duration = values.duration;
  }

  if (values.persistent) {
    config.persistent = values.persistent;
  }

  if (!values.closable) {
    config.closable = values.closable;
  }

  if (!values.showIcon) {
    config.showIcon = values.showIcon;
  }

  if (values.showProgress) {
    config.showProgress = values.showProgress;
  }

  return config;
}

@Component({
  selector: 'app-toast-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './toast-playground-page.html',
  styleUrl: './toast-playground-page.scss',
})
export class ToastPlaygroundPage {
  private readonly toast = kuiToast();

  protected readonly apiDescription = TOAST_API_DESCRIPTION;
  protected readonly apiRows = TOAST_API_ROWS;

  // maxVisible is app-wide only (set via provideKuiToastOptions) and has no runtime setter,
  // so it can't be represented safely here. See the "Global defaults" section on the main page.
  protected readonly playgroundControls = TOAST_PLAYGROUND_CONTROLS;

  protected triggerLabel(values: ToastPlaygroundValues): string {
    const title = values.title;

    return title ? `Show "${title}"` : 'Show toast';
  }

  protected openToast(values: ToastPlaygroundValues): void {
    const position = values.position;

    if (position !== DEFAULT_POSITION) {
      this.toast.setPosition(position);
    }

    this.toast.open(toToastConfig(values));
  }

  protected readonly buildPlaygroundSnippet = (
    values: ToastPlaygroundValues,
  ): readonly CodeTab[] => {
    const config = toToastConfig(values);
    const position = values.position;
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
}
