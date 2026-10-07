import { Component } from '@angular/core';

import { FIELD_EXAMPLE_SOURCES } from '@generated/example-sources/field.generated';
import {
  FIELD_DEFAULTS,
  FIELD_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/field.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import {
  BasicFieldExample,
  FieldAffixExample,
  FieldInputGroupExample,
  FieldProjectedExample,
} from './examples';
import { FIELD_API_ROWS } from './field.api-schema';
import {
  FIELD_API_DESCRIPTION,
  FIELD_FORMS_TABS,
  FIELD_IMPORT_TABS,
  FIELD_LABEL_TABS,
  FIELD_STATUS,
} from './field.docs-content';

@Component({
  selector: 'app-field-page',
  imports: [
    ProviderDefaultsSection,
    TokenTablesSection,
    ApiTable,
    BasicFieldExample,
    CodeTabs,
    FieldAffixExample,
    FieldInputGroupExample,
    FieldProjectedExample,
    DocSection,
    LivePreview,
    PageHeader,
    PlaygroundRouteButton,
  ],
  templateUrl: './field-page.html',
  styleUrl: './field-page.scss',
})
export class FieldPage {
  protected readonly status = FIELD_STATUS;
  protected readonly apiDescription = FIELD_API_DESCRIPTION;
  protected readonly defaults = FIELD_DEFAULTS;
  protected readonly geometryTokenRows = FIELD_GEOMETRY_TOKEN_ROWS;
  protected readonly apiRows = FIELD_API_ROWS;

  protected readonly importTabs = FIELD_IMPORT_TABS;

  protected readonly usageTabs = FIELD_EXAMPLE_SOURCES['basic-field-example'];
  protected readonly projectedTabs = FIELD_EXAMPLE_SOURCES['field-projected-example'];
  protected readonly affixTabs = FIELD_EXAMPLE_SOURCES['field-affix-example'];
  protected readonly groupTabs = FIELD_EXAMPLE_SOURCES['field-input-group-example'];
  protected readonly formsTabs = FIELD_FORMS_TABS;
  protected readonly labelTabs = FIELD_LABEL_TABS;
}
