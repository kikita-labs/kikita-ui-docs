import { Component } from '@angular/core';

import { AVATAR_EXAMPLE_SOURCES } from '@generated/example-sources/avatar.generated';
import {
  AVATAR_DEFAULTS,
  AVATAR_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/avatar.generated';
import {
  AVATAR_GROUP_MESSAGES,
  AVATAR_MESSAGES,
} from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { AVATAR_API_ROWS } from './avatar.api-schema';
import {
  AVATAR_API_DESCRIPTION,
  AVATAR_IMPORT_TABS,
  AVATAR_MIGRATION_TABS,
  AVATAR_STATUS,
} from './avatar.docs-content';
import {
  AvatarButtonExample,
  AvatarGroupExample,
  AvatarSizesShapesExample,
  AvatarStatusExample,
  BasicAvatarExample,
} from './examples';

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
    LivePreview,
    PageHeader,
    MessagesSection,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './avatar-page.html',
  styleUrl: './avatar-page.scss',
})
export class AvatarPage {
  protected readonly status = AVATAR_STATUS;
  protected readonly apiDescription = AVATAR_API_DESCRIPTION;

  protected readonly importTabs = AVATAR_IMPORT_TABS;

  protected readonly basicTabs = AVATAR_EXAMPLE_SOURCES['basic-avatar-example'];

  protected readonly sizesShapesTabs = AVATAR_EXAMPLE_SOURCES['avatar-sizes-shapes-example'];

  protected readonly statusTabs = AVATAR_EXAMPLE_SOURCES['avatar-status-example'];

  protected readonly groupTabs = AVATAR_EXAMPLE_SOURCES['avatar-group-example'];

  protected readonly buttonTabs = AVATAR_EXAMPLE_SOURCES['avatar-button-example'];

  protected readonly apiRows = AVATAR_API_ROWS;
  protected readonly defaults = AVATAR_DEFAULTS;
  protected readonly geometryTokenRows = AVATAR_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [AVATAR_MESSAGES, AVATAR_GROUP_MESSAGES];
  protected readonly migrationTabs = AVATAR_MIGRATION_TABS;
}
