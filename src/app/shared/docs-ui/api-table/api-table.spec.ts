import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { expectNoAxeViolations } from '../testing/axe';
import { ApiTable } from './api-table';
import { type ApiTableRow } from './api-table-row';

const ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: "'sm' | 'md'",
    defaultValue: "'md'",
    description: 'Controls the component size.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables interaction.',
  },
];

describe('ApiTable', () => {
  let fixture: ComponentFixture<ApiTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ApiTable] }).compileComponents();
    fixture = TestBed.createComponent(ApiTable);
    fixture.componentRef.setInput('label', 'Button API');
    fixture.componentRef.setInput('rows', ROWS);
    fixture.detectChanges();
  });

  it('renders rows inside a labelled keyboard-reachable local overflow region', () => {
    const root = fixture.nativeElement as HTMLElement;
    const region = root.querySelector<HTMLElement>('[role="region"]');

    expect(region?.getAttribute('aria-label')).toBe('Button API');
    expect(region?.tabIndex).toBe(0);
    expect(root.querySelectorAll('tbody tr')).toHaveLength(2);
    expect(root.textContent).toContain("'md'");
    expect(root.textContent).toContain('—');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
