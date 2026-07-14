import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TablePlaygroundPage } from './table-playground-page';

describe('TablePlaygroundPage', () => {
  let fixture: ComponentFixture<TablePlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePlaygroundPage],
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

    fixture = TestBed.createComponent(TablePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview options and emits typed non-default snippet parts', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(1)?.click();
    fixture.detectChanges();

    const table = root.querySelector<HTMLElement>('app-api-playground-viewport table[kuiTable]');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(table?.getAttribute('data-kui-size')).toBe('lg');
    expect(root.querySelector('app-api-playground-viewport th[kuiSelectTh]')).not.toBeNull();
    expect(snippet?.textContent).toContain('<table kuiTable [data]="rows" size="lg"');
    expect(snippet?.textContent).toContain('(selectionChange)="onSelectionChange($event)"');
    expect(snippet?.textContent).toContain('<th kuiSelectTh ariaLabel="Select all rows"></th>');
  });

  it('omits default size and sort keys when controls request plain rows', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(0)?.click();
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent).toContain('@for (row of rows; track row.id)');
    expect(snippet?.textContent).not.toContain(' size="md"');
    expect(snippet?.textContent).not.toContain('sortKey=');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
