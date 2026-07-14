import { Component } from '@angular/core';

import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
  templateUrl: './basic-accordion-example.html',
  styleUrl: './basic-accordion-example.scss',
})
export class BasicAccordionExample {}
