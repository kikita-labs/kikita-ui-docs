import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DatePickerPlaygroundPage } from './date-picker-playground-page';

describe('DatePickerPlaygroundPage', () => {
  let fixture: ComponentFixture<DatePickerPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerPlaygroundPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerPlaygroundPage);
    fixture.detectChanges();
  });

  it('renders the playground date picker and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Date Picker');
    expect(root.querySelector('input[kuiDatePicker]')).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });
});
