# Typography

> Semantic type-role classes, text tones, and the kuiText directive.

- Status: available
- Route: /foundations/typography
- Package: @kikita-labs/ui@0.6.1

## Content

### Import
The CSS classes ship through the main stylesheet. Import the directive only when templates should bind variant or tone.
#### angular.json

```json
"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]
```

#### typography-example.ts

```ts
import { KuiTextDirective } from '@kikita-labs/ui';
```

### Usage
Decorate native text elements. Typography classes and kuiText change presentation without replacing semantic HTML.
#### typography-example.html

```html
<section aria-labelledby="project-title">
  <p class="kui-overline kui-text-primary">Project profile</p>
  <h2 id="project-title" class="kui-heading-lg kui-text-default">Workspace settings</h2>
  <p class="kui-body kui-text-muted">Manage members, billing, and integrations.</p>
  <small class="kui-caption kui-text-muted">Last updated 2 minutes ago</small>
  <p class="kui-body-sm kui-text-danger">Slug is already used by another workspace.</p>
  <p class="kui-body-sm">
    Current slug: <code class="kui-code">workspace.slug</code>
  </p>
</section>
```

#### typography-directive-example.html

```html
<section aria-labelledby="project-title">
  <p kuiText variant="overline" tone="primary">Project profile</p>
  <h2 id="project-title" kuiText variant="heading-lg">Workspace settings</h2>
  <p kuiText variant="body" tone="muted">Manage members, billing, and integrations.</p>
  <small kuiText variant="caption" tone="muted">Last updated 2 minutes ago</small>
  <p kuiText variant="body-sm" tone="danger">Slug is already used by another workspace.</p>
  <p kuiText variant="body-sm">
    Current slug: <code class="kui-code">workspace.slug</code>
  </p>
</section>
```

### Type roles
Choose the role that matches the text's purpose, then keep the native element semantic.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| .kui-display | h1 | - | Rare docs or specification page title. |
| .kui-heading-lg | h1 \| h2 | - | Main page or top-level section title. |
| .kui-heading-md | h2 \| h3 | - | Panel, dialog, or drawer title. |
| .kui-heading-sm | h3 \| h4 | - | Compact section, card, or table group title. |
| .kui-title | h4 \| h5 \| span | - | Small emphasized UI title. |
| .kui-body-lg | p | - | Relaxed paragraph text where space allows. |
| .kui-body | p | - | Default product UI body text. |
| .kui-body-sm | p \| span | - | Dense descriptions and table adjunct text. |
| .kui-caption | small \| span | - | Hints, metadata, helper text, and timestamps. |
| .kui-overline | span | - | Optional uppercase group label. Use sparingly. |
| .kui-code | code \| span | - | Inline monospace code and token text. |

### Tone utilities
Tone utilities only set color. Pair status color with clear visible text when the state matters.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| .kui-text-default | default | - | Normal foreground text color. |
| .kui-text-muted | muted | - | Secondary copy, descriptions, and metadata. |
| .kui-text-disabled | disabled | - | Unavailable copy paired with a disabled control or state. |
| .kui-text-primary | primary | - | Brand or primary action emphasis. |
| .kui-text-success | success | - | Positive status text paired with visible status copy. |
| .kui-text-warning | warning | - | Caution status text paired with visible status copy. |
| .kui-text-danger | danger | - | Error or destructive status text paired with visible status copy. |

### Directive API
The kuiText directive is convenience sugar over the same public class contract.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiText | attribute directive | - | Applies a semantic type role and text tone to a native text element. |
| variant | KuiTextVariant | 'body' | Semantic typography role applied by the directive. |
| tone | KuiTextTone | 'default' | Semantic text color tone applied by the directive. |
| KuiTextVariant | 'display' \| 'heading-lg' \| 'heading-md' \| 'heading-sm' \| 'title' \| 'body-lg' \| 'body' \| 'body-sm' \| 'caption' \| 'overline' \| 'code' | - | Public type for the directive variant input. |
| KuiTextTone | 'default' \| 'muted' \| 'disabled' \| 'primary' \| 'success' \| 'warning' \| 'danger' | - | Public type for the directive tone input. |

### Tokens
Each role exposes generated size, line-height, and weight tokens for theme-aware text scales.
#### typography-tokens.css

```css
--kui-type-heading-md-size
--kui-type-heading-md-line-height
--kui-type-heading-md-weight
```

#### font-weight-tokens.css

```css
--kui-font-weight-regular
--kui-font-weight-medium
--kui-font-weight-semibold
--kui-font-weight-bold
```

### Accessibility
Typography should strengthen native semantics rather than replace them.
