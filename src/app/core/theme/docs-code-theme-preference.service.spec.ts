import { TestBed } from '@angular/core/testing';

import { DOCS_DEFAULT_CODE_THEME_ID_BY_MODE } from './docs-code-theme';
import { DocsCodeThemePreferenceService } from './docs-code-theme-preference.service';
import { DocsThemeMode } from './docs-theme-mode';

describe('DocsCodeThemePreferenceService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({ providers: [DocsCodeThemePreferenceService] });
  });

  it('falls back when a stored theme was removed from the curated catalog', () => {
    window.localStorage.setItem(
      'kikita-ui-docs.code-theme',
      JSON.stringify({ light: 'rose-pine-dawn', dark: 'tokyo-night' }),
    );

    const service = TestBed.inject(DocsCodeThemePreferenceService);

    expect(service.codeThemeIdByMode()).toEqual(DOCS_DEFAULT_CODE_THEME_ID_BY_MODE);
  });

  it('persists a valid curated theme for its matching mode', () => {
    const service = TestBed.inject(DocsCodeThemePreferenceService);

    service.set('github-dark-high-contrast');
    TestBed.tick();

    expect(service.codeThemeIdByMode()[DocsThemeMode.Dark]).toBe('github-dark-high-contrast');
    expect(window.localStorage.getItem('kikita-ui-docs.code-theme')).toContain(
      'github-dark-high-contrast',
    );
  });
});
