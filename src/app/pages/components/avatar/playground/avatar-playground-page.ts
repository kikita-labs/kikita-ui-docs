import { Component } from '@angular/core';

import { KuiAvatarComponent, KuiAvatarGroupComponent, type KuiAvatarItem } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { AVATAR_API_ROWS } from '../avatar.api-schema';
import { AVATAR_API_DESCRIPTION } from '../avatar.docs-content';

const GROUP_MEMBERS: readonly KuiAvatarItem[] = [
  { src: 'https://i.pravatar.cc/64?img=12', name: 'Nikita Repin', status: 'online' },
  { name: 'Anya Murashova', status: 'away' },
  { name: 'Timur Ognev' },
  { name: 'Vera Saltykova' },
  { name: 'Ilya Denisov' },
];

const AVATAR_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'name', label: 'name', kind: 'string', defaultValue: 'Nikita Repin' },
  { key: 'initials', label: 'initials', kind: 'string', defaultValue: '' },
  { key: 'useImage', label: 'src (sample image)', kind: 'boolean', defaultValue: true },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    defaultValue: 'md',
  },
  {
    key: 'shape',
    label: 'shape',
    kind: 'enum',
    options: ['circle', 'square'],
    defaultValue: 'circle',
  },
  {
    key: 'status',
    label: 'status',
    kind: 'enum',
    options: ['none', 'online', 'away', 'busy', 'offline'],
    defaultValue: 'none',
  },
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
] as const);

type AvatarPlaygroundValues = PlaygroundValues<typeof AVATAR_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-avatar-playground-page',
  imports: [ApiPlayground, ApiTable, KuiAvatarComponent, KuiAvatarGroupComponent],
  templateUrl: './avatar-playground-page.html',
  styleUrl: './avatar-playground-page.scss',
})
export class AvatarPlaygroundPage {
  protected readonly apiDescription = AVATAR_API_DESCRIPTION;
  protected readonly apiRows = AVATAR_API_ROWS;
  protected readonly groupMembers = GROUP_MEMBERS;

  protected readonly playgroundControls = AVATAR_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: AvatarPlaygroundValues,
  ): readonly CodeTab[] => {
    const name = values.name;
    const initials = values.initials;
    const useImage = values.useImage;
    const size = values.size;
    const shape = values.shape;
    const status = values.status;
    const loading = values.loading;

    const attrs = [
      useImage ? `src="/users/nikita.png"` : null,
      name ? `name="${escapePlaygroundHtml(name)}"` : null,
      initials ? `initials="${escapePlaygroundHtml(initials)}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      shape !== 'circle' ? `shape="${shape}"` : null,
      status !== 'none' ? `status="${status}"` : null,
      loading ? 'loading' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-avatar${attrString} />`,
      },
    ];
  };

  protected nameOf(values: AvatarPlaygroundValues): string | undefined {
    const name = values.name;

    return name || undefined;
  }

  protected initialsOf(values: AvatarPlaygroundValues): string | undefined {
    const initials = values.initials;

    return initials || undefined;
  }

  protected srcOf(values: AvatarPlaygroundValues): string | undefined {
    const useImage = values.useImage;

    return useImage ? 'https://i.pravatar.cc/64?img=12' : undefined;
  }

  protected sizeOf(values: AvatarPlaygroundValues): AvatarPlaygroundValues['size'] {
    return values.size;
  }

  protected shapeOf(values: AvatarPlaygroundValues): AvatarPlaygroundValues['shape'] {
    return values.shape;
  }

  protected statusOf(
    values: AvatarPlaygroundValues,
  ): Exclude<AvatarPlaygroundValues['status'], 'none'> | undefined {
    const status = values.status;

    return status === 'none' ? undefined : status;
  }

  protected loadingOf(values: AvatarPlaygroundValues): boolean {
    return values.loading;
  }
}
