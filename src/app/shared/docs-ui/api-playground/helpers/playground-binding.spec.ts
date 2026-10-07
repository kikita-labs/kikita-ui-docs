import { playgroundBinding, playgroundEvent } from './playground-binding';
import { serializePlaygroundAttributes } from './playground-serializer';

describe('playground bindings', () => {
  it('serializes property and event bindings and omits empty ones', () => {
    expect(
      serializePlaygroundAttributes([
        playgroundBinding('minDate', 'minDate'),
        playgroundBinding('disabledDates', null),
        playgroundEvent('valueChange', 'onChange($event)'),
        playgroundEvent('opened', undefined),
      ]),
    ).toBe(' [minDate]="minDate" (valueChange)="onChange($event)"');
  });

  it('escapes quotes inside the expression', () => {
    expect(serializePlaygroundAttributes([playgroundBinding('label', `'a "b"'`)])).toBe(
      ' [label]="&#39;a &quot;b&quot;&#39;"',
    );
  });
});
