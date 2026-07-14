import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { expectNoAxeViolations } from '../testing/axe';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
  let fixture: ComponentFixture<PageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PageHeader] }).compileComponents();
    fixture = TestBed.createComponent(PageHeader);
    fixture.componentRef.setInput('eyebrow', 'Actions');
    fixture.componentRef.setInput('heading', 'Button');
    fixture.componentRef.setInput('description', 'Native button styling.');
    fixture.componentRef.setInput('status', 'Stable');
    fixture.detectChanges();
  });

  it('renders the documented heading, description, eyebrow, and optional status', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Button');
    expect(root.textContent).toContain('Native button styling.');
    expect(root.textContent).toContain('Actions');
    expect(root.textContent).toContain('Stable');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
