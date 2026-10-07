import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { BreadcrumbsPlaygroundPage } from './breadcrumbs-playground-page';

describe('BreadcrumbsPlaygroundPage', () => {
  let fixture: ComponentFixture<BreadcrumbsPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates size snippet state', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(
      root.querySelector('.api-playground-viewport__resizable ol[kuibreadcrumbs]'),
    ).not.toBeNull();
    expect(snippet?.textContent).toContain('size="lg"');
  });

  it('switches the middle crumb to a truncating link', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggle = root.querySelector<HTMLInputElement>('.api-playground__toggle-row input');

    optionButtons.find((button) => button.textContent?.trim() === 'link')?.click();
    toggle?.click();
    fixture.detectChanges();

    const middle = root.querySelector<HTMLElement>(
      'app-api-playground-viewport a.kui-breadcrumb-truncate',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(middle?.getAttribute('href')).toBe('/components/surfaces');
    expect(snippet?.textContent).toContain(
      '<a kuiBreadcrumbItem class="kui-breadcrumb-truncate" href="/components/surfaces">Surfaces</a>',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
