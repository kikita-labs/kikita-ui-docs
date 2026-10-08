import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TIME_PICKER_EXAMPLE_SOURCES } from '@generated/example-sources/time-picker.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TIME_PICKER_DOCS_MANIFEST } from './time-picker.docs-manifest';
import { TimePickerPage } from './time-picker-page';

describe('TimePickerPage', () => {
  let fixture: ComponentFixture<TimePickerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerPage],
      providers: [
        provideKikitaUi({ locale: 'en-US' }),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  function inputs(): HTMLInputElement[] {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        'app-live-preview input[kuiTimePicker]',
      ),
    ];
  }

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Time Picker');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'format',
      'limits',
      'inline',
      'typing',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('renders combobox inputs with the formatted initial values', () => {
    const [basic, twelve, limits] = inputs();

    expect(inputs()).toHaveLength(3);
    expect(basic?.getAttribute('role')).toBe('combobox');
    expect(basic?.value).toBe('09:30 AM');
    expect(twelve?.value).toContain('PM');
    expect(limits?.value).toBe('');
  });

  it('shows the standalone panel with its columns and no dropdown', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('#inline')?.closest('app-doc-section');

    expect(section?.querySelectorAll('[role="listbox"]')).toHaveLength(3);
    expect(section?.querySelector('kui-dropdown')).toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TIME_PICKER_DOCS_MANIFEST.loadPage(),
      TIME_PICKER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TimePickerPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(TIME_PICKER_EXAMPLE_SOURCES).sort()).toEqual(
      [...TIME_PICKER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
