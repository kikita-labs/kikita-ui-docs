import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const TYPOGRAPHY_IMPORT_TABS = [
  {
    label: 'Styles',
    filename: 'angular.json',
    language: 'json',
    code: `"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]`,
  },
  {
    label: 'Directive',
    filename: 'typography-example.ts',
    language: 'ts',
    code: `import { KuiTextDirective } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];

export const TYPOGRAPHY_USAGE_TABS = [
  {
    label: 'Classes',
    filename: 'typography-example.html',
    language: 'html',
    code: `<section aria-labelledby="project-title">
  <p class="kui-overline kui-text-primary">Project profile</p>
  <h2 id="project-title" class="kui-heading-lg kui-text-default">Workspace settings</h2>
  <p class="kui-body kui-text-muted">Manage members, billing, and integrations.</p>
  <small class="kui-caption kui-text-muted">Last updated 2 minutes ago</small>
  <p class="kui-body-sm kui-text-danger">Slug is already used by another workspace.</p>
  <p class="kui-body-sm">
    Current slug: <code class="kui-code">workspace.slug</code>
  </p>
</section>`,
  },
  {
    label: 'Directive',
    filename: 'typography-directive-example.html',
    language: 'html',
    code: `<section aria-labelledby="project-title">
  <p kuiText variant="overline" tone="primary">Project profile</p>
  <h2 id="project-title" kuiText variant="heading-lg">Workspace settings</h2>
  <p kuiText variant="body" tone="muted">Manage members, billing, and integrations.</p>
  <small kuiText variant="caption" tone="muted">Last updated 2 minutes ago</small>
  <p kuiText variant="body-sm" tone="danger">Slug is already used by another workspace.</p>
  <p kuiText variant="body-sm">
    Current slug: <code class="kui-code">workspace.slug</code>
  </p>
</section>`,
  },
] as const satisfies readonly CodeTab[];

export const TYPOGRAPHY_ROLE_ROWS = [
  {
    name: '.kui-display',
    type: 'h1',
    description: 'Rare docs or specification page title.',
  },
  {
    name: '.kui-heading-lg',
    type: 'h1 | h2',
    description: 'Main page or top-level section title.',
  },
  {
    name: '.kui-heading-md',
    type: 'h2 | h3',
    description: 'Panel, dialog, or drawer title.',
  },
  {
    name: '.kui-heading-sm',
    type: 'h3 | h4',
    description: 'Compact section, card, or table group title.',
  },
  {
    name: '.kui-title',
    type: 'h4 | h5 | span',
    description: 'Small emphasized UI title.',
  },
  {
    name: '.kui-body-lg',
    type: 'p',
    description: 'Relaxed paragraph text where space allows.',
  },
  {
    name: '.kui-body',
    type: 'p',
    description: 'Default product UI body text.',
  },
  {
    name: '.kui-body-sm',
    type: 'p | span',
    description: 'Dense descriptions and table adjunct text.',
  },
  {
    name: '.kui-caption',
    type: 'small | span',
    description: 'Hints, metadata, helper text, and timestamps.',
  },
  {
    name: '.kui-overline',
    type: 'span',
    description: 'Optional uppercase group label. Use sparingly.',
  },
  {
    name: '.kui-code',
    type: 'code | span',
    description: 'Inline monospace code and token text.',
  },
] as const satisfies readonly ApiTableRow[];

export const TYPOGRAPHY_TONE_ROWS = [
  {
    name: '.kui-text-default',
    type: 'default',
    description: 'Normal foreground text color.',
  },
  {
    name: '.kui-text-muted',
    type: 'muted',
    description: 'Secondary copy, descriptions, and metadata.',
  },
  {
    name: '.kui-text-disabled',
    type: 'disabled',
    description: 'Unavailable copy paired with a disabled control or state.',
  },
  {
    name: '.kui-text-primary',
    type: 'primary',
    description: 'Brand or primary action emphasis.',
  },
  {
    name: '.kui-text-success',
    type: 'success',
    description: 'Positive status text paired with visible status copy.',
  },
  {
    name: '.kui-text-warning',
    type: 'warning',
    description: 'Caution status text paired with visible status copy.',
  },
  {
    name: '.kui-text-danger',
    type: 'danger',
    description: 'Error or destructive status text paired with visible status copy.',
  },
] as const satisfies readonly ApiTableRow[];

export const TYPOGRAPHY_API_ROWS = [
  {
    name: 'kuiText',
    type: 'attribute directive',
    defaultValue: '-',
    description: 'Applies a semantic type role and text tone to a native text element.',
  },
  {
    name: 'variant',
    type: 'KuiTextVariant',
    defaultValue: "'body'",
    description: 'Semantic typography role applied by the directive.',
  },
  {
    name: 'tone',
    type: 'KuiTextTone',
    defaultValue: "'default'",
    description: 'Semantic text color tone applied by the directive.',
  },
  {
    name: 'KuiTextVariant',
    type: "'display' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'title' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'overline' | 'code'",
    defaultValue: '-',
    description: 'Public type for the directive variant input.',
  },
  {
    name: 'KuiTextTone',
    type: "'default' | 'muted' | 'disabled' | 'primary' | 'success' | 'warning' | 'danger'",
    defaultValue: '-',
    description: 'Public type for the directive tone input.',
  },
] as const satisfies readonly ApiTableRow[];

export const TYPOGRAPHY_TOKEN_TABS = [
  {
    label: 'Role tokens',
    filename: 'typography-tokens.css',
    language: 'css',
    code: `--kui-type-heading-md-size
--kui-type-heading-md-line-height
--kui-type-heading-md-weight`,
  },
  {
    label: 'Font weights',
    filename: 'font-weight-tokens.css',
    language: 'css',
    code: `--kui-font-weight-regular
--kui-font-weight-medium
--kui-font-weight-semibold
--kui-font-weight-bold`,
  },
] as const satisfies readonly CodeTab[];
