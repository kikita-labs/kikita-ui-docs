import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-accessibility-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './accessibility-page.html',
  styleUrl: './accessibility-page.scss',
})
export class AccessibilityPage {
  protected readonly baselineRows: readonly ApiTableRow[] = [
    {
      name: 'Semantics first',
      type: 'HTML',
      description: 'Prefer native elements and browser behavior before adding ARIA.',
    },
    {
      name: 'Keyboard',
      type: 'WCAG AA',
      description:
        'Every interactive state must be reachable, operable, and escapable by keyboard.',
    },
    {
      name: 'Focus',
      type: 'Visible state',
      description: 'Focus indicators must remain visible and must not cause layout shift.',
    },
    {
      name: 'Contrast',
      type: 'WCAG AA',
      description:
        'Text, icons, focus, disabled, invalid, selected, and loading states must remain distinguishable.',
    },
  ];

  protected readonly reviewRows: readonly ApiTableRow[] = [
    {
      name: 'DOM smoke',
      type: 'Automated',
      description:
        'Catches broken ARIA references, duplicate ids, invalid roles, and unnamed controls.',
    },
    {
      name: 'Keyboard review',
      type: 'Manual',
      description: 'Verifies tab order, activation keys, escape behavior, and focus restoration.',
    },
    {
      name: 'Assistive technology',
      type: 'Manual',
      description:
        'Uses a real screen reader or platform accessibility tool for names, roles, and states.',
    },
    {
      name: 'Visual review',
      type: 'Manual',
      description:
        'Checks responsive layout, 200% zoom, reduced motion, forced colors, and contrast.',
    },
  ];

  protected readonly formTabs: readonly CodeTab[] = [
    {
      label: 'Field wiring',
      language: 'html',
      code: `<kui-field label="Email" hint="Use your work address.">
  <input kuiInput formField type="email" autocomplete="email" />
</kui-field>`,
    },
    {
      label: 'Native current state',
      language: 'html',
      code: `<a routerLink="/foundations/tokens" aria-current="page">
  Tokens
</a>`,
    },
  ];

  protected readonly statusTabs: readonly CodeTab[] = [
    {
      label: 'Coverage note',
      language: 'md',
      code: `- DOM accessibility smoke has run for <primitive>, but real assistive-technology review is still pending.`,
    },
    {
      label: 'Full review note',
      language: 'md',
      code: `- Assistive-technology review for <primitive> was run with <AT/browser/OS>.
  Covered keyboard navigation, names/roles/states, focus return, and primitive-specific behavior.
  Remaining gap: none known.`,
    },
  ];
}
