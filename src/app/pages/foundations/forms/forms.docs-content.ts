import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const FORMS_MODEL_TABS = [
  {
    label: 'Form model',
    filename: 'profile-form.ts',
    language: 'ts',
    code: `import { signal } from '@angular/core';
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
});`,
  },
  {
    label: 'Template',
    filename: 'profile-form.html',
    language: 'html',
    code: `<form [formRoot]="profileForm">
  <kui-field label="Email" hint="Use your work email">
    <input kuiInput type="email" [formField]="profileForm.email" />
  </kui-field>
</form>`,
  },
] as const satisfies readonly CodeTab[];

export const FORMS_PATTERN_TABS = [
  {
    label: 'Input',
    filename: 'form.html',
    language: 'html',
    code: `<kui-field label="Label" hint="Optional helper text">
  <input kuiInput [formField]="form.field" />
</kui-field>`,
  },
  {
    label: 'Textarea, number, slider',
    filename: 'form.html',
    language: 'html',
    code: `<kui-field label="Notes" hint="Internal project notes">
  <textarea kuiTextarea [formField]="form.notes"></textarea>
</kui-field>

<kui-field label="Count" hint="Enter a value from 1 to 100">
  <input type="number" kuiNumberInput [formField]="form.count" />
</kui-field>

<kui-field label="Volume" hint="Use arrow keys, Home, and End">
  <input type="range" kuiSlider [formField]="form.volume" />
</kui-field>`,
  },
] as const satisfies readonly CodeTab[];

export const FORMS_CUSTOM_TABS = [
  {
    label: 'Marker directives',
    filename: 'form.html',
    language: 'html',
    code: `<kui-field>
  <label kuiLabel>Email</label>
  <input kuiInput type="email" [formField]="profileForm.email" />
  <p kuiHint>Use your work email</p>

  @if (showEmailError()) {
    <p kuiError>Email is required</p>
  }
</kui-field>`,
  },
] as const satisfies readonly CodeTab[];

export const FORMS_COMPONENT_TABS = [
  {
    label: 'Component controls',
    filename: 'form.html',
    language: 'html',
    code: `<kui-field label="View">
  <kui-segmented [formField]="myForm.view">
    <button kuiSegment value="list">List</button>
    <button kuiSegment value="grid">Grid</button>
  </kui-segmented>
</kui-field>

<kui-field label="Verification code">
  <kui-otp-input [formField]="signInForm.code" />
</kui-field>`,
  },
] as const satisfies readonly CodeTab[];
