import { TestBed } from '@angular/core/testing';

import { DocsSearchStateService } from './docs-search-state.service';

describe('DocsSearchStateService', () => {
  let service: DocsSearchStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocsSearchStateService],
    });

    service = TestBed.inject(DocsSearchStateService);
  });

  it('starts closed with an empty query', () => {
    expect(service.open()).toBe(false);
    expect(service.query()).toBe('');
  });

  it('opens without replacing the current query', () => {
    service.query.set('button');

    service.show();

    expect(service.open()).toBe(true);
    expect(service.query()).toBe('button');
  });

  it('resets both dialog and query state', () => {
    service.open.set(true);
    service.query.set('select');

    service.reset();

    expect(service.open()).toBe(false);
    expect(service.query()).toBe('');
  });
});
