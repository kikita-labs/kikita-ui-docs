import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { COMMAND_PALETTE_EXAMPLE_SOURCES } from '@generated/example-sources/command-palette.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { COMMAND_PALETTE_DOCS_MANIFEST } from './command-palette.docs-manifest';
import { CommandPalettePage } from './command-palette-page';

describe('CommandPalettePage', () => {
  let fixture: ComponentFixture<CommandPalettePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPalettePage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPalettePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and command palette trigger example', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggers = [
      ...root.querySelectorAll<HTMLButtonElement>('app-live-preview button[kuibutton]'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Command Palette');
    expect(sectionIds).toEqual(['import', 'usage', 'item-data', 'api', 'accessibility']);
    expect(triggers.some((trigger) => trigger.textContent?.includes('Open command palette'))).toBe(
      true,
    );
    expect(root.textContent).toContain('KuiCommandGroup');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      COMMAND_PALETTE_DOCS_MANIFEST.loadPage(),
      COMMAND_PALETTE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CommandPalettePage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(COMMAND_PALETTE_DOCS_MANIFEST.exampleIds).toEqual(['basic-command-palette-example']);
    expect(Object.keys(COMMAND_PALETTE_EXAMPLE_SOURCES).sort()).toEqual(
      [...COMMAND_PALETTE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
