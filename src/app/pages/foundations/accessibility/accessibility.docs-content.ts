import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const ACCESSIBILITY_BASELINE_ROWS = [
  {
    name: 'Semantics first',
    type: 'HTML',
    description: 'Prefer native elements and browser behavior before adding ARIA.',
  },
  {
    name: 'Keyboard',
    type: 'WCAG AA',
    description: 'Every interactive state must be reachable, operable, and escapable by keyboard.',
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
] as const satisfies readonly ApiTableRow[];

export const ACCESSIBILITY_REVIEW_ROWS = [
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
] as const satisfies readonly ApiTableRow[];

export const ACCESSIBILITY_FORM_TABS = [
  {
    label: 'Field wiring',
    filename: 'field-example.html',
    language: 'html',
    code: `<kui-field label="Email" hint="Use your work address.">
  <input kuiInput type="email" autocomplete="email" />
</kui-field>`,
  },
  {
    label: 'Native current state',
    filename: 'navigation.html',
    language: 'html',
    code: `<a routerLink="/foundations/tokens" aria-current="page">
  Tokens
</a>`,
  },
] as const satisfies readonly CodeTab[];

export const ACCESSIBILITY_STATUS_TABS = [
  {
    label: 'Coverage note',
    filename: 'state-coverage.md',
    language: 'md',
    code: `- DOM accessibility smoke has run for <primitive>, but real assistive-technology review is still pending.`,
  },
  {
    label: 'Full review note',
    filename: 'state-coverage.md',
    language: 'md',
    code: `- Assistive-technology review for <primitive> was run with <AT/browser/OS>.
  Covered keyboard navigation, names/roles/states, focus return, and primitive-specific behavior.
  Remaining gap: none known.`,
  },
] as const satisfies readonly CodeTab[];
