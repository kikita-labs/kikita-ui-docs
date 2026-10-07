import { Component, signal } from '@angular/core';

import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';

@Component({
  selector: 'app-multi-accordion-example',
  imports: [KuiAccordion, KuiAccordionItem],
  templateUrl: './multi-accordion-example.html',
  styleUrl: './multi-accordion-example.scss',
})
export class MultiAccordionExample {
  protected readonly expanded = signal(['profile']);
}
