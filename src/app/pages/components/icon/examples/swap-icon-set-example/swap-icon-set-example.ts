import { Component } from '@angular/core';

import { KUI_ICONS, KuiIconComponent, type KuiIconRegistry } from '@kikita-labs/ui';

const MATERIAL_SYMBOLS_ICON_SET: KuiIconRegistry = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg>',
};

const CUSTOM_ICON_SET: KuiIconRegistry = {
  'brand-mark':
    '<svg viewBox="0 0 16 16" fill="none"><path d="M3 2v12M3 8l7-6M3 8l7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

@Component({
  selector: 'app-material-icon-scope',
  imports: [KuiIconComponent],
  template: `<kui-icon name="star" label="Material Symbols star" size="28px" />`,
  providers: [{ provide: KUI_ICONS, multi: true, useValue: MATERIAL_SYMBOLS_ICON_SET }],
})
export class MaterialIconScope {}

@Component({
  selector: 'app-custom-icon-scope',
  imports: [KuiIconComponent],
  template: `<kui-icon name="brand-mark" label="Custom brand mark" size="28px" />`,
  providers: [{ provide: KUI_ICONS, multi: true, useValue: CUSTOM_ICON_SET }],
})
export class CustomIconScope {}

@Component({
  selector: 'app-swap-icon-set-example',
  imports: [KuiIconComponent, MaterialIconScope, CustomIconScope],
  templateUrl: './swap-icon-set-example.html',
  styleUrl: './swap-icon-set-example.scss',
})
export class SwapIconSetExample {}
