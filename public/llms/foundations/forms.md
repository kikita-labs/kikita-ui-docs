# Forms

> Kikita UI is Signal Forms first: put the control directive and [formField] on the same element and wrap it in kui-field for the label, hint, error and required marker.

- Status: available
- Route: /foundations/forms
- Package: @kikita-labs/ui@2.0.0

## Content

### Signal Forms first
Place the Kikita control directive and the Angular Signal Forms formField binding on the same native element, then wrap it with kui-field when the UI needs a visible label, hint, error or required marker.
#### profile-form.ts

```ts
import { signal } from '@angular/core';
import { email, form, minLength, required } from '@angular/forms/signals';

const model = signal({
  email: '',
  project: '',
});

const profileForm = form(model, (path) => {
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Enter a valid email' });
  required(path.project, { message: 'Project is required' });
  minLength(path.project, 3, { message: 'Use at least 3 characters' });
});
```

#### profile-form.html

```html
<form [formRoot]="profileForm">
  <kui-field label="Email" hint="Use your work email">
    <input kuiInput type="email" [formField]="profileForm.email" />
  </kui-field>
</form>
```

### Field-first pattern
kui-field owns the label, hint, error, required marker and aria-describedby wiring, so do not write them by hand for normal field usage.
#### form.html

```html
<kui-field label="Label" hint="Optional helper text">
  <input kuiInput [formField]="form.field" />
</kui-field>
```

#### form.html

```html
<kui-field label="Notes" hint="Internal project notes">
  <textarea kuiTextarea [formField]="form.notes"></textarea>
</kui-field>

<kui-field label="Count" hint="Enter a value from 1 to 100">
  <input type="number" kuiNumberInput [formField]="form.count" />
</kui-field>

<kui-field label="Volume" hint="Use arrow keys, Home, and End">
  <input type="range" kuiSlider [formField]="form.volume" />
</kui-field>
```

### Custom field templates
Use projected marker directives only when the field needs custom template logic.
#### form.html

```html
<kui-field>
  <label kuiLabel>Email</label>
  <input kuiInput type="email" [formField]="profileForm.email" />
  <p kuiHint>Use your work email</p>

  @if (showEmailError()) {
    <p kuiError>Email is required</p>
  }
</kui-field>
```

### Controls that are not native elements
kui-segmented and kui-otp-input implement the Signal Forms control contract themselves, so formField goes on the component.
#### form.html

```html
<kui-field label="View">
  <kui-segmented [formField]="myForm.view">
    <button kuiSegment value="list">List</button>
    <button kuiSegment value="grid">Grid</button>
  </kui-segmented>
</kui-field>

<kui-field label="Verification code">
  <kui-otp-input [formField]="signInForm.code" />
</kui-field>
```

### Required and invalid state
How the field and its controls expose validation to assistive technology.
