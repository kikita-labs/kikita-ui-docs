import { TestBed } from '@angular/core/testing';
import { DocsSearchIndexService } from './docs-search-index.service';

describe('DocsSearchIndexService', () => {
  let service: DocsSearchIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocsSearchIndexService],
    });

    service = TestBed.inject(DocsSearchIndexService);
  });

  it('indexes navigation and component routes without duplicate ids', () => {
    const commands = service.groups.flatMap((group) => group.items);
    const commandIds = commands.map((command) => command.id);

    expect(commandIds).toContain('/components/button');
    expect(new Set(commandIds).size).toBe(commandIds.length);
  });

  it('resolves command paths from command ids', () => {
    const command = service.groups
      .flatMap((group) => group.items)
      .find((item) => item.id === '/components/button');

    expect(command ? service.getPath(command) : null).toBe('/components/button');
  });
});
