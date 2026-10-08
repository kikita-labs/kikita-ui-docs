# Auto Focus

> kuiAutoFocus moves focus to its host, or to the first focusable element inside it, after the browser has rendered.

- Status: available
- Route: /foundations/auto-focus
- Package: @kikita-labs/ui@2.0.0

## Content

### Import and usage
Use it where the next step is obvious, such as the first field of a dialog or a code field that has just appeared. The directive has no styles.
#### auto-focus.ts

```ts
import { KuiAutoFocus } from '@kikita-labs/ui';
```

#### form.html

```html
<input kuiInput kuiAutoFocus />
```

#### form.html

```html
<input kuiInput [kuiAutoFocus]="editing()" />
```

#### form.html

```html
<div kuiAutoFocus>
  <input kuiInput aria-label="Search" />
</div>
```

### Rules
The directive is conservative about when it moves focus.

### API
There are no outputs, providers or CSS custom properties.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiAutoFocus | boolean | - | Enables focus (default false). The attribute without a value is true, and false to true focuses again. |
| kuiAutoFocusPreventScroll | boolean | - | Focuses without scrolling the element into view (default false). |

### Accessibility
Automatic focus can disorient screen-reader users, so keep it off by default.
