import { TestBed } from '@angular/core/testing';

import { DocsCanonicalLinkService } from './docs-canonical-link.service';

describe('DocsCanonicalLinkService', () => {
  afterEach(() => {
    document.head.querySelector('link[rel="canonical"]')?.remove();
    TestBed.resetTestingModule();
  });

  it('keeps exactly one canonical link and updates its href', () => {
    const service = TestBed.inject(DocsCanonicalLinkService);

    service.set('https://example.com/docs/a');
    service.set('https://example.com/docs/b');

    const links = document.head.querySelectorAll('link[rel="canonical"]');

    expect(links).toHaveLength(1);
    expect(links[0]?.getAttribute('href')).toBe('https://example.com/docs/b');
  });

  it('removes the canonical link', () => {
    const service = TestBed.inject(DocsCanonicalLinkService);

    service.set('https://example.com/docs/a');
    service.clear();

    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
