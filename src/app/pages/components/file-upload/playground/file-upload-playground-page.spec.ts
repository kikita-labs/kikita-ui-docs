import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { FileUploadPlaygroundPage } from './file-upload-playground-page';

describe('FileUploadPlaygroundPage', () => {
  let fixture: ComponentFixture<FileUploadPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadPlaygroundPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the playground preview and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('File Upload');
    expect(
      root.querySelector('.api-playground-viewport__resizable kui-file-upload'),
    ).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });
});
