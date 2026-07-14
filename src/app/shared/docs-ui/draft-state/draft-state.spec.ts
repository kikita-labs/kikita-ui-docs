import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { expectNoAxeViolations } from '../testing/axe';
import { DraftState } from './draft-state';

describe('DraftState', () => {
  let fixture: ComponentFixture<DraftState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DraftState] }).compileComponents();
    fixture = TestBed.createComponent(DraftState);
    fixture.componentRef.setInput('stateTitle', 'Documentation in progress');
    fixture.componentRef.setInput('description', 'Track the implementation on GitHub.');
    fixture.detectChanges();
  });

  it('renders consumer-safe external actions', () => {
    const root = fixture.nativeElement as HTMLElement;
    const links = [...root.querySelectorAll<HTMLAnchorElement>('a')];

    expect(root.textContent).toContain('Documentation in progress');
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'View on GitHub',
      'Get notified',
    ]);
    expect(links.every((link) => link.target === '_blank' && link.rel === 'noreferrer')).toBe(true);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
