import { Component } from '@angular/core';

import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { PageHeader } from '@shared/docs-ui/page-header';

import {
  STRUCTURAL_ICONS_GLYPH_RULES_ROWS,
  STRUCTURAL_ICONS_GLYPH_TABS,
  STRUCTURAL_ICONS_REPLACE_TABS,
  STRUCTURAL_ICONS_ROLES_ROWS,
  STRUCTURAL_ICONS_SLOTS_ROWS,
  STRUCTURAL_ICONS_STROKE_CODE_TABS,
  STRUCTURAL_ICONS_STROKE_ROWS,
} from './structural-icons.docs-content';

@Component({
  selector: 'app-structural-icons-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './structural-icons-page.html',
  styleUrl: './structural-icons-page.scss',
})
export class StructuralIconsPage {
  protected readonly replaceTabs = STRUCTURAL_ICONS_REPLACE_TABS;

  protected readonly rolesRows = STRUCTURAL_ICONS_ROLES_ROWS;

  protected readonly slotsRows = STRUCTURAL_ICONS_SLOTS_ROWS;

  protected readonly glyphTabs = STRUCTURAL_ICONS_GLYPH_TABS;

  protected readonly glyphRulesRows = STRUCTURAL_ICONS_GLYPH_RULES_ROWS;

  protected readonly strokeRows = STRUCTURAL_ICONS_STROKE_ROWS;

  protected readonly strokeCodeTabs = STRUCTURAL_ICONS_STROKE_CODE_TABS;
}
