import { TestBed } from '@angular/core/testing';

import { DocsSectionRegistryService } from './docs-section-registry.service';

describe('DocsSectionRegistryService', () => {
  it('registers ordered sections and cleans them up deterministically', () => {
    TestBed.configureTestingModule({ providers: [DocsSectionRegistryService] });
    const registry = TestBed.inject(DocsSectionRegistryService);
    const unregisterFirst = registry.register({ id: 'first', label: 'First' });
    const unregisterSecond = registry.register({ id: 'second', label: 'Second' });

    expect(registry.sections()).toEqual([
      { id: 'first', label: 'First' },
      { id: 'second', label: 'Second' },
    ]);

    unregisterFirst();
    expect(registry.sections()).toEqual([{ id: 'second', label: 'Second' }]);

    unregisterSecond();
    expect(registry.sections()).toEqual([]);
  });
});
