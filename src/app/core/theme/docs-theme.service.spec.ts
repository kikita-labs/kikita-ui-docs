import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { DocsThemeService } from './docs-theme.service';
import { DocsThemeMode } from './docs-theme-mode';

describe('DocsThemeService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-kui-theme');
    TestBed.configureTestingModule({
      providers: [DocsThemeService],
    });
  });

  it('applies the initial theme to the document root', () => {
    TestBed.inject(DocsThemeService);
    TestBed.tick();

    expect(document.documentElement.dataset['kuiTheme']).toBe(DocsThemeMode.Light);
  });

  it('toggles and persists the current theme', () => {
    const service = TestBed.inject(DocsThemeService);

    service.toggle();
    TestBed.tick();

    expect(service.mode()).toBe(DocsThemeMode.Dark);
    expect(document.documentElement.dataset['kuiTheme']).toBe(DocsThemeMode.Dark);
  });

  it('applies and persists seed colors', () => {
    const service = TestBed.inject(DocsThemeService);

    service.setSeedColor('primary', '#2563eb');
    TestBed.tick();

    const themeStyle = document.getElementById('kui-theme');

    expect(service.seedColors().primary).toBe('#2563eb');
    expect(window.localStorage.getItem('kikita-ui-docs.seed-colors')).toContain('#2563eb');
    expect(themeStyle?.textContent).toContain('--kui-seed-primary');
  });

  it('supports a document without matchMedia', () => {
    const testDocument = document.implementation.createHTMLDocument('test');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DocsThemeService,
        {
          provide: DOCUMENT,
          useValue: testDocument,
        },
      ],
    });

    const service = TestBed.inject(DocsThemeService);

    expect(service.mode()).toBe(DocsThemeMode.Light);
  });
});
