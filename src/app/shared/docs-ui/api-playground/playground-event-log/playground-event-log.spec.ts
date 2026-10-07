import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { createPlaygroundEventLog } from '../helpers';
import { PlaygroundEventLogView } from './playground-event-log';

describe('PlaygroundEventLogView', () => {
  let fixture: ComponentFixture<PlaygroundEventLogView>;
  const log = createPlaygroundEventLog();

  beforeEach(async () => {
    log.clear();
    await TestBed.configureTestingModule({
      imports: [PlaygroundEventLogView],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundEventLogView);
    fixture.componentRef.setInput('log', log);
    fixture.detectChanges();
  });

  it('shows an empty state, then the newest event first, and clears', () => {
    const root = fixture.nativeElement as HTMLElement;
    const clear = root.querySelector<HTMLButtonElement>('button');

    expect(root.textContent).toContain('No events yet.');
    expect(clear?.disabled).toBe(true);

    log.log('valueChange', '2026-10-07');
    log.log('opened');
    fixture.detectChanges();

    const entries = [...root.querySelectorAll('li')].map((entry) => entry.textContent?.trim());
    expect(entries[0]).toBe('opened');
    expect(entries[1]).toContain('valueChange');
    expect(entries[1]).toContain('2026-10-07');

    clear?.click();
    fixture.detectChanges();

    expect(root.textContent).toContain('No events yet.');
  });

  it('exposes the list as a named log region', () => {
    const list = (fixture.nativeElement as HTMLElement).querySelector('[role="log"]');

    expect(list?.getAttribute('aria-label')).toBe('Event log');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
