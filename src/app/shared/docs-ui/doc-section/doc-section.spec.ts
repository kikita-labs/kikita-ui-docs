import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsAnchorNavigationService } from '@core/platform/anchor';
import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsSectionRegistryService } from '@core/platform/heading';

import { expectNoAxeViolations } from '../testing/axe';
import { DocSection } from './doc-section';

describe('DocSection', () => {
  let fixture: ComponentFixture<DocSection>;
  const navigate = vi.fn();
  const register = vi.fn();
  const writeText = vi.fn();

  beforeEach(async () => {
    navigate.mockResolvedValue({ ok: true, value: undefined });
    register.mockReturnValue(vi.fn());
    writeText.mockResolvedValue({ ok: true, value: undefined });

    await TestBed.configureTestingModule({
      imports: [DocSection],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsAnchorNavigationService,
          useValue: {
            navigate,
            urlFor: vi.fn().mockReturnValue({ ok: true, value: 'https://docs.test/#shape' }),
          },
        },
        { provide: DocsClipboardService, useValue: { writeText } },
        { provide: DocsSectionRegistryService, useValue: { register } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocSection);
    fixture.componentRef.setInput('heading', 'Shape and appearance');
    fixture.componentRef.setInput('anchor', 'Shape');
    fixture.componentRef.setInput('description', 'Choose a visual treatment.');
    fixture.detectChanges();
  });

  it('registers a stable anchor and delegates fragment navigation', () => {
    const root = fixture.nativeElement as HTMLElement;
    const headingLink = root.querySelector<HTMLAnchorElement>('.doc-section__heading-link');

    expect(register).toHaveBeenCalledWith({ id: 'shape', label: 'Shape and appearance' });
    expect(headingLink?.getAttribute('href')).toBe('#shape');

    headingLink?.click();
    expect(navigate).toHaveBeenCalledWith('shape');
  });

  it('copies the canonical heading URL through the clipboard adapter', async () => {
    const copy = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '[aria-label="Copy link to Shape and appearance"]',
    );

    copy?.click();
    await Promise.resolve();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith('https://docs.test/#shape');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Link copied');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
