import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DocsThemeMode } from './docs-theme-mode';
import { DocsThemeService } from './docs-theme.service';

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
