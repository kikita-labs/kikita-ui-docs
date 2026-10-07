import { Component } from '@angular/core';

import { KuiField, KuiFieldAffix, KuiIcon, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-affix-example',
  imports: [KuiFieldAffix, KuiField, KuiIcon, KuiInput],
  templateUrl: './field-affix-example.html',
  styleUrl: './field-affix-example.scss',
})
export class FieldAffixExample {}
