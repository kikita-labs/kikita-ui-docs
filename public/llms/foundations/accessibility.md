# Accessibility

> Keyboard, semantics, focus, and WCAG expectations.

- Status: available
- Route: /foundations/accessibility
- Package: @kikita-labs/ui@0.6.2

## Content

### Baseline rules
These requirements apply to primitives, docs examples, and consumer verification pages.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Semantics first | HTML | - | Prefer native elements and browser behavior before adding ARIA. |
| Keyboard | WCAG AA | - | Every interactive state must be reachable, operable, and escapable by keyboard. |
| Focus | Visible state | - | Focus indicators must remain visible and must not cause layout shift. |
| Contrast | WCAG AA | - | Text, icons, focus, disabled, invalid, selected, and loading states must remain distinguishable. |

### Review levels
A clean automated scan is only a smoke test. Do not mark a primitive fully audited without keyboard and assistive-technology review.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| DOM smoke | Automated | - | Catches broken ARIA references, duplicate ids, invalid roles, and unnamed controls. |
| Keyboard review | Manual | - | Verifies tab order, activation keys, escape behavior, and focus restoration. |
| Assistive technology | Manual | - | Uses a real screen reader or platform accessibility tool for names, roles, and states. |
| Visual review | Manual | - | Checks responsive layout, 200% zoom, reduced motion, forced colors, and contrast. |

### Docs examples
Examples should use Kikita field wiring and native state attributes instead of compensating for broken markup with custom ARIA.
#### field-example.html

```html
<kui-field label="Email" hint="Use your work address.">
  <input kuiInput type="email" autocomplete="email" />
</kui-field>
```

#### navigation.html

```html
<a routerLink="/foundations/tokens" aria-current="page">
  Tokens
</a>
```

### Coverage notes
Record the actual level of review. Be explicit when only DOM smoke has run.
#### state-coverage.md

```md
- DOM accessibility smoke has run for <primitive>, but real assistive-technology review is still pending.
```

#### state-coverage.md

```md
- Assistive-technology review for <primitive> was run with <AT/browser/OS>.
  Covered keyboard navigation, names/roles/states, focus return, and primitive-specific behavior.
  Remaining gap: none known.
```
