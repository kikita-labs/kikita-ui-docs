import { Component } from '@angular/core';

import {
  KuiAlert,
  type KuiAlertAppearance,
  type KuiAlertShape,
  type KuiAlertSize,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  playgroundEvent,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { ALERT_API_ROWS } from '../alert.api-schema';
import { ALERT_API_DESCRIPTION } from '../alert.docs-content';

const ALERT_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'appearance',
    label: 'appearance',
    kind: 'enum',
    options: ['neutral', 'info', 'success', 'warning', 'danger'],
    defaultValue: 'neutral',
  },
  {
    key: 'shape',
    label: 'shape',
    kind: 'enum',
    options: ['soft', 'outline', 'solid'],
    defaultValue: 'soft',
  },
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md'], defaultValue: 'md' },
  { key: 'title', label: 'title', kind: 'string', defaultValue: 'Session expiring' },
  {
    key: 'message',
    label: 'message',
    kind: 'string',
    defaultValue: 'Your access token expires in 3 days.',
  },
  { key: 'actionLabel', label: 'actionLabel', kind: 'string', defaultValue: '' },
  {
    key: 'closeLabel',
    label: 'closeLabel',
    kind: 'string',
    defaultValue: '',
  },
  { key: 'banner', label: 'banner', kind: 'boolean', defaultValue: false },
  { key: 'showIcon', label: 'showIcon', kind: 'boolean', defaultValue: true },
  { key: 'closable', label: 'closable', kind: 'boolean', defaultValue: true },
] as const);

type AlertPlaygroundValues = PlaygroundValues<typeof ALERT_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-alert-playground-page',
  imports: [ApiPlayground, ApiTable, KuiAlert, PlaygroundEventLogView],
  templateUrl: './alert-playground-page.html',
  styleUrl: './alert-playground-page.scss',
})
export class AlertPlaygroundPage {
  protected readonly apiDescription = ALERT_API_DESCRIPTION;
  protected readonly apiRows = ALERT_API_ROWS;
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = ALERT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: AlertPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'appearance', value: values.appearance, defaultValue: 'neutral' },
      { name: 'shape', value: values.shape, defaultValue: 'soft' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'banner', value: values.banner },
      { name: 'title', value: values.title || null },
      { name: 'message', value: values.message || null },
      { name: 'actionLabel', value: values.actionLabel || null },
      { name: 'closeLabel', value: values.closeLabel || null },
      { name: '[showIcon]', value: values.showIcon ? null : 'false' },
      { name: '[closable]', value: values.closable ? null : 'false' },
      playgroundEvent('action', values.actionLabel ? 'onAction()' : null),
      playgroundEvent('closed', values.closable ? 'onClosed()' : null),
    ]);

    return [{ label: 'HTML', language: 'html', code: `<kui-alert${attrString} />` }];
  };

  protected appearanceOf(values: AlertPlaygroundValues): KuiAlertAppearance {
    return values.appearance;
  }

  protected shapeOf(values: AlertPlaygroundValues): KuiAlertShape {
    return values.shape;
  }

  protected sizeOf(values: AlertPlaygroundValues): KuiAlertSize {
    return values.size;
  }

  protected titleOf(values: AlertPlaygroundValues): string | undefined {
    return values.title || undefined;
  }

  protected messageOf(values: AlertPlaygroundValues): string | undefined {
    return values.message || undefined;
  }

  protected actionLabelOf(values: AlertPlaygroundValues): string | undefined {
    return values.actionLabel || undefined;
  }

  protected closeLabelOf(values: AlertPlaygroundValues): string | undefined {
    return values.closeLabel || undefined;
  }

  protected bannerOf(values: AlertPlaygroundValues): boolean {
    return values.banner;
  }

  protected showIconOf(values: AlertPlaygroundValues): boolean {
    return values.showIcon;
  }

  protected closableOf(values: AlertPlaygroundValues): boolean {
    return values.closable;
  }

  protected onAction(): void {
    this.eventLog.log('action', '');
  }

  protected onClosed(): void {
    this.eventLog.log('closed', '');
  }
}
