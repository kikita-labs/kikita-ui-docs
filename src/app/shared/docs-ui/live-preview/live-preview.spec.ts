import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { expectNoAxeViolations } from '../testing/axe';
import { LivePreview } from './live-preview';

@Component({
  imports: [LivePreview],
  template: `
    <app-live-preview
      previewLabel="Button preview"
      description="Interactive public package example"
    >
      <button type="button">Save</button>
    </app-live-preview>
  `,
})
class TestHost {}

describe('LivePreview', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('projects the example into a labelled preview region', () => {
    const root = fixture.nativeElement as HTMLElement;
    const preview = root.querySelector('section');

    expect(preview?.getAttribute('aria-label')).toBe('Button preview');
    expect(preview?.getAttribute('aria-description')).toBe('Interactive public package example');
    expect(root.querySelector<HTMLElement>('.live-preview__stage')?.tabIndex).toBe(0);
    expect(preview?.querySelector('button')?.textContent).toContain('Save');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
