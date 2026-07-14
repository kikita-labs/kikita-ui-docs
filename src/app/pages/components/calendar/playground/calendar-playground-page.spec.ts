import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { CalendarPlaygroundPage } from './calendar-playground-page';

describe('CalendarPlaygroundPage', () => {
  let fixture: ComponentFixture<CalendarPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPlaygroundPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarPlaygroundPage);
    fixture.detectChanges();
  });

  it('renders the playground calendar and API table', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h1')?.textContent).toContain('Calendar');
    expect(root.querySelector('kui-calendar')).not.toBeNull();
    expect(root.querySelector('app-api-table')).not.toBeNull();
  });
});
