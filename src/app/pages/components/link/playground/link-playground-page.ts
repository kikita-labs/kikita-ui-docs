import { Component } from '@angular/core';

import { KuiLink, type KuiLinkTone, type KuiLinkUnderline } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  escapePlaygroundHtml,
  playgroundOptionOrUndefined,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { LINK_API_ROWS } from '../link.api-schema';
import { LINK_API_DESCRIPTION } from '../link.docs-content';

const LINK_PLAYGROUND_ICONS = ['none', 'download', 'arrow-right', 'external-link'] as const;

const LINK_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'text', label: 'text', kind: 'string', defaultValue: 'Read the docs' },
  {
    key: 'host',
    label: 'host element',
    kind: 'enum',
    options: ['a', 'button'],
    defaultValue: 'a',
  },
  {
    key: 'tone',
    label: 'tone',
    kind: 'enum',
    options: ['default', 'muted', 'primary', 'success', 'warning', 'danger'],
    defaultValue: 'primary',
  },
  {
    key: 'underline',
    label: 'underline',
    kind: 'enum',
    options: ['always', 'hover', 'none'],
    defaultValue: 'hover',
  },
  {
    key: 'variant',
    label: 'variant',
    kind: 'enum',
    options: ['body-lg', 'body', 'body-sm', 'caption'],
    defaultValue: 'body',
  },
  {
    key: 'iconStart',
    label: 'iconStart',
    kind: 'enum',
    options: LINK_PLAYGROUND_ICONS,
    defaultValue: 'none',
  },
  {
    key: 'iconEnd',
    label: 'iconEnd',
    kind: 'enum',
    options: LINK_PLAYGROUND_ICONS,
    defaultValue: 'none',
  },
  {
    key: 'target',
    label: 'target',
    kind: 'enum',
    options: ['none', '_blank'],
    defaultValue: 'none',
  },
  {
    key: 'external',
    label: 'external',
    kind: 'enum',
    options: ['auto', 'true', 'false'],
    defaultValue: 'auto',
  },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type LinkPlaygroundValues = PlaygroundValues<typeof LINK_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-link-playground-page',
  imports: [ApiPlayground, ApiTable, KuiLink],
  templateUrl: './link-playground-page.html',
  styleUrl: './link-playground-page.scss',
})
export class LinkPlaygroundPage {
  protected readonly apiDescription = LINK_API_DESCRIPTION;
  protected readonly apiRows = LINK_API_ROWS;
  protected readonly playgroundControls = LINK_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: LinkPlaygroundValues,
  ): readonly CodeTab[] => {
    const isAnchor = values.host === 'a';
    const attrString = serializePlaygroundAttributes([
      { name: 'tone', value: values.tone, defaultValue: 'primary' },
      { name: 'underline', value: values.underline, defaultValue: 'hover' },
      { name: 'variant', value: values.variant, defaultValue: 'body' },
      { name: 'iconStart', value: playgroundOptionOrUndefined(values.iconStart) },
      { name: 'iconEnd', value: playgroundOptionOrUndefined(values.iconEnd) },
      { name: 'target', value: isAnchor ? playgroundOptionOrUndefined(values.target) : null },
      { name: '[external]', value: values.external === 'auto' ? null : values.external },
      { name: 'disabled', value: values.disabled },
    ]);
    const host = isAnchor ? 'a' : 'button';
    const hostAttrs = isAnchor ? ' href="#docs"' : ' type="button"';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<${host} kuiLink${hostAttrs}${attrString}>${escapePlaygroundHtml(values.text)}</${host}>`,
      },
    ];
  };

  protected isAnchor(values: LinkPlaygroundValues): boolean {
    return values.host === 'a';
  }

  protected textOf(values: LinkPlaygroundValues): string {
    return values.text;
  }

  protected toneOf(values: LinkPlaygroundValues): KuiLinkTone {
    return values.tone;
  }

  protected underlineOf(values: LinkPlaygroundValues): KuiLinkUnderline {
    return values.underline;
  }

  protected variantOf(values: LinkPlaygroundValues): 'body-lg' | 'body' | 'body-sm' | 'caption' {
    return values.variant;
  }

  protected iconStartOf(values: LinkPlaygroundValues): string | undefined {
    return playgroundOptionOrUndefined(values.iconStart);
  }

  protected iconEndOf(values: LinkPlaygroundValues): string | undefined {
    return playgroundOptionOrUndefined(values.iconEnd);
  }

  protected targetOf(values: LinkPlaygroundValues): string | undefined {
    return playgroundOptionOrUndefined(values.target);
  }

  protected externalOf(values: LinkPlaygroundValues): boolean | undefined {
    return values.external === 'auto' ? undefined : values.external === 'true';
  }

  protected disabledOf(values: LinkPlaygroundValues): boolean {
    return values.disabled;
  }
}
