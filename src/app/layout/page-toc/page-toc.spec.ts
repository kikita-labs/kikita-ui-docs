import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsAnchorNavigationService } from '@core/platform/anchor';
import { DocsHeadingObserverService, DocsSectionRegistryService } from '@core/platform/heading';
import { expectNoAxeViolations } from '@shared/docs-ui/testing/axe';

import { PageToc } from './page-toc';

describe('PageToc', () => {
  let fixture: ComponentFixture<PageToc>;
  const navigate = vi.fn();

  beforeEach(async () => {
    navigate.mockResolvedValue({ ok: true, value: undefined });

    await TestBed.configureTestingModule({
      imports: [PageToc],
      providers: [
        {
          provide: DocsAnchorNavigationService,
          useValue: { navigate },
        },
        {
          provide: DocsHeadingObserverService,
          useValue: { observe: vi.fn().mockReturnValue(vi.fn()) },
        },
      ],
    }).compileComponents();

    const registry = TestBed.inject(DocsSectionRegistryService);
    registry.register({ id: 'overview', label: 'Overview' });
    registry.register({ id: 'accessibility', label: 'Accessibility' });

    fixture = TestBed.createComponent(PageToc);
  });

  it('renders the desktop table of contents with a current location', () => {
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('aside[aria-label="Page table of contents"]')).not.toBeNull();
    expect(root.querySelector('[aria-current="location"]')?.textContent).toContain('Overview');
  });

  it('keeps the table of contents available as a mobile jump control', () => {
    fixture.componentRef.setInput('variant', 'mobile');
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const details = root.querySelector<HTMLDetailsElement>('details');
    const accessibility = root.querySelector<HTMLAnchorElement>('[href="#accessibility"]');

    expect(details).not.toBeNull();
    expect(root.querySelector('summary')?.textContent).toContain('Overview');

    if (details) {
      details.open = true;
    }
    accessibility?.click();
    fixture.detectChanges();

    expect(navigate).toHaveBeenCalledWith('accessibility');
    expect(details?.open).toBe(false);
    expect(accessibility?.getAttribute('aria-current')).toBe('location');
  });

  it('has no automated accessibility violations in mobile mode', async () => {
    fixture.componentRef.setInput('variant', 'mobile');
    fixture.detectChanges();

    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
