import { Component } from '@angular/core';

import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-accordion-example',
  imports: [KuiAccordion, KuiAccordionItem],
  templateUrl: './basic-accordion-example.html',
  styleUrl: './basic-accordion-example.scss',
})
export class BasicAccordionExample {}
