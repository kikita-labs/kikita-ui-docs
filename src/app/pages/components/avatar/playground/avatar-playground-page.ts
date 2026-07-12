import { Component } from '@angular/core';
import { KuiAvatarComponent, KuiAvatarGroupComponent, KuiAvatarItem } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { AVATAR_API_ROWS } from '../avatar.api-schema';

const GROUP_MEMBERS: readonly KuiAvatarItem[] = [
  { src: 'https://i.pravatar.cc/64?img=12', name: 'Nikita Repin', status: 'online' },
  { name: 'Anya Murashova', status: 'away' },
  { name: 'Timur Ognev' },
  { name: 'Vera Saltykova' },
  { name: 'Ilya Denisov' },
];

@Component({
  selector: 'app-avatar-playground-page',
  imports: [ApiPlayground, ApiTable, KuiAvatarComponent, KuiAvatarGroupComponent],
  templateUrl: './avatar-playground-page.html',
  styleUrl: './avatar-playground-page.scss',
})
export class AvatarPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = AVATAR_API_ROWS;
  protected readonly groupMembers = GROUP_MEMBERS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const name = values['name'] as string;
    const initials = values['initials'] as string;
    const useImage = values['useImage'] as boolean;
    const size = values['size'] as string;
    const shape = values['shape'] as string;
    const status = values['status'] as string;
    const loading = values['loading'] as boolean;

    const attrs = [
      useImage ? `src="/users/nikita.png"` : null,
      name ? `name="${this.escapeHtml(name)}"` : null,
      initials ? `initials="${this.escapeHtml(initials)}"` : null,
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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected nameOf(values: PlaygroundValues): string | undefined {
    const name = values['name'] as string;

    return name || undefined;
  }

  protected initialsOf(values: PlaygroundValues): string | undefined {
    const initials = values['initials'] as string;

    return initials || undefined;
  }

  protected srcOf(values: PlaygroundValues): string | undefined {
    const useImage = values['useImage'] as boolean;

    return useImage ? 'https://i.pravatar.cc/64?img=12' : undefined;
  }

  protected sizeOf(values: PlaygroundValues) {
    return values['size'] as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  }

  protected shapeOf(values: PlaygroundValues) {
    return values['shape'] as 'circle' | 'square';
  }

  protected statusOf(values: PlaygroundValues) {
    const status = values['status'] as string;

    return status === 'none' ? undefined : (status as 'online' | 'away' | 'busy' | 'offline');
  }

  protected loadingOf(values: PlaygroundValues): boolean {
    return values['loading'] as boolean;
  }
}
