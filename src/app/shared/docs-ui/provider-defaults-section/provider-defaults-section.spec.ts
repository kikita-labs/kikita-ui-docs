import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';

import { expectNoAxeViolations } from '../testing/axe';
import { ProviderDefaultsSection } from './provider-defaults-section';

describe('ProviderDefaultsSection', () => {
  let fixture: ComponentFixture<ProviderDefaultsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderDefaultsSection],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderDefaultsSection);
    fixture.componentRef.setInput('defaultsKey', 'datePicker');
    fixture.componentRef.setInput('rows', [
      { name: 'size', type: "'sm' | 'md'", description: 'Component size.' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the provider defaults section for the key with its option table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h2')?.id).toBe('provider-defaults');
    expect(root.textContent).toContain('defaults.datePicker.<option>');
    expect(root.textContent).toContain('datePicker: {');
    expect(root.querySelector('app-api-table')?.textContent).toContain('size');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
