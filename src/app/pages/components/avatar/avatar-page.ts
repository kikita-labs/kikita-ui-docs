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
import { AVATAR_API_ROWS } from './avatar.api-schema';
import { AvatarButtonExample } from './examples/avatar-button-example/avatar-button-example';
import { AvatarGroupExample } from './examples/avatar-group-example/avatar-group-example';
import { AvatarSizesShapesExample } from './examples/avatar-sizes-shapes-example/avatar-sizes-shapes-example';
import { AvatarStatusExample } from './examples/avatar-status-example/avatar-status-example';
import { BasicAvatarExample } from './examples/basic-avatar-example/basic-avatar-example';

@Component({
  selector: 'app-avatar-page',
  imports: [
    ApiTable,
    AvatarButtonExample,
    AvatarGroupExample,
    AvatarSizesShapesExample,
    AvatarStatusExample,
    BasicAvatarExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './avatar-page.html',
  styleUrl: './avatar-page.scss',
})
export class AvatarPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'avatar.ts',
      language: 'ts',
      code: `import { KuiAvatarComponent, KuiAvatarGroupComponent } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-avatar src="/users/nikita.png" name="Nikita Repin" status="online" />
<kui-avatar name="Anya Murashova" />
<kui-avatar />`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiAvatarComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-avatar-example',
  imports: [KuiAvatarComponent],
  templateUrl: './basic-avatar-example.html',
  styleUrl: './basic-avatar-example.scss',
})
export class BasicAvatarExample {}`,
    },
  ];

  protected readonly sizesShapesTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-avatar name="Nikita Repin" size="xs" />
<kui-avatar name="Nikita Repin" size="sm" />
<kui-avatar name="Nikita Repin" size="md" />
<kui-avatar name="Nikita Repin" size="lg" />
<kui-avatar name="Nikita Repin" size="xl" />
<kui-avatar name="Nikita Repin" size="2xl" />

<kui-avatar name="Design Bot" shape="square" />`,
    },
  ];

  protected readonly statusTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-avatar name="Nikita Repin" status="online" />
<kui-avatar name="Nikita Repin" status="away" />
<kui-avatar name="Nikita Repin" status="busy" />
<kui-avatar name="Nikita Repin" status="offline" />`,
    },
  ];

  protected readonly groupTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-avatar-group [avatars]="members" [max]="4" size="sm" label="Project participants" />`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `readonly members: readonly KuiAvatarItem[] = [
  { src: '/users/nikita.png', name: 'Nikita Repin', status: 'online' },
  { name: 'Anya Murashova', status: 'away' },
  { name: 'Timur Ognev' },
  { name: 'Vera Saltykova' },
  { name: 'Ilya Denisov' },
];`,
    },
  ];

  protected readonly buttonTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button class="kui-avatar-action" type="button" aria-label="Open Nikita Repin profile">
  <kui-avatar src="/users/nikita.png" name="Nikita Repin" />
</button>`,
    },
  ];

  protected readonly apiRows = AVATAR_API_ROWS;
}
