import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { PlaygroundRouteButton } from './playground-route-button';

describe('PlaygroundRouteButton', () => {
  let fixture: ComponentFixture<PlaygroundRouteButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundRouteButton],
      providers: [provideKikitaUi(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundRouteButton);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('links to the sibling playground route with the shared CTA treatment', () => {
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(link.textContent?.trim()).toBe('Open in Playground');
    expect(link.getAttribute('href')).toContain('playground');
    expect(link.getAttribute('shape')).toBe('solid');
    expect(link.getAttribute('size')).toBe('sm');
  });
});
