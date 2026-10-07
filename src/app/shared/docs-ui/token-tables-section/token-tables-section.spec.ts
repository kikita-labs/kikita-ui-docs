import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';

import { expectNoAxeViolations } from '../testing/axe';
import { TokenTablesSection } from './token-tables-section';

describe('TokenTablesSection', () => {
  let fixture: ComponentFixture<TokenTablesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenTablesSection],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenTablesSection);
    fixture.componentRef.setInput('name', 'Accordion');
    fixture.componentRef.setInput('geometryRows', [
      {
        name: '--kui-accordion-trigger-gap',
        type: 'CSS custom property',
        defaultValue: '--kui-space-2',
        description: 'Trigger gap',
      },
    ]);
    fixture.detectChanges();
  });

  it('renders only the token tables that have rows', () => {
    const root = fixture.nativeElement as HTMLElement;
    const tables = root.querySelectorAll('app-api-table');

    expect(root.querySelector('h2')?.id).toBe('theming-tokens');
    expect(tables).toHaveLength(1);
    expect(tables[0]?.textContent).toContain('--kui-accordion-trigger-gap');
  });

  it('shows both tables when both lists have rows', () => {
    fixture.componentRef.setInput('colorRows', [
      {
        name: '--kui-accordion-icon-color',
        type: 'CSS custom property',
        defaultValue: '--kui-color-text-secondary',
        description: 'Icon color',
      },
    ]);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('app-api-table')).toHaveLength(
      2,
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
