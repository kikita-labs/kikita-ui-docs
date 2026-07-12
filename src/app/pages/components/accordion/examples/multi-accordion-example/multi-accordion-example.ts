import { Component, signal } from '@angular/core';
import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-multi-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './multi-accordion-example.html',
  styleUrl: './multi-accordion-example.scss',
})
export class MultiAccordionExample {
  protected readonly expanded = signal(['profile']);
}
