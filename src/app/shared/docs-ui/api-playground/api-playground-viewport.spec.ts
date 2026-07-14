import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsPointerDragService } from '@core/platform/pointer';

import { expectNoAxeViolations } from '../testing/axe';
import { ApiPlaygroundViewport } from './api-playground-viewport';

describe('ApiPlaygroundViewport', () => {
  let fixture: ComponentFixture<ApiPlaygroundViewport>;
  const start = vi.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPlaygroundViewport],
      providers: [provideKikitaUi(), { provide: DocsPointerDragService, useValue: { start } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiPlaygroundViewport);
    fixture.componentRef.setInput('previewLabel', 'Button playground');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('supports preset, numeric, theme, and keyboard resize controls', () => {
    const root = fixture.nativeElement as HTMLElement;
    const mobile = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')].find((button) =>
      button.textContent?.includes('Mobile'),
    );
    const width = root.querySelector<HTMLInputElement>('[aria-label="Preview width"]');
    const theme = root.querySelector<HTMLButtonElement>('[aria-label="Use dark preview theme"]');
    const handle = root.querySelector<HTMLElement>('[aria-label="Resize preview width"]');

    mobile?.click();
    fixture.detectChanges();
    expect(width?.value).toBe('375');

    theme?.click();
    fixture.detectChanges();
    expect(root.querySelector('[data-kui-theme="dark"]')).not.toBeNull();

    handle?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    expect(width?.value).toBe('359');

    if (width) {
      width.value = '10';
      width.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
    }
    expect(width?.value).toBe('320');
  });

  it('delegates pointer resizing to the platform adapter', () => {
    const handle = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '[aria-label="Resize preview width"]',
    );

    handle?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 40 }));

    expect(start).toHaveBeenCalledOnce();
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
