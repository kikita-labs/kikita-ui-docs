import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { TreePlaygroundPage } from './tree-playground-page';

describe('TreePlaygroundPage', () => {
  let fixture: ComponentFixture<TreePlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreePlaygroundPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(TreePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the playground preview and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Tree');
    expect(root.querySelector('.api-playground-viewport__resizable kui-tree')).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });
});
