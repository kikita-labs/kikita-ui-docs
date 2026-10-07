import {
  createPlaygroundValues,
  definePlaygroundControls,
  parsePlaygroundNumber,
} from './playground-control';

describe('typed playground values', () => {
  const controls = definePlaygroundControls([
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save' },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['sm', 'md'] as const,
      defaultValue: 'md',
    },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'count', label: 'count', kind: 'number', defaultValue: 1 },
    {
      key: 'features',
      label: 'features',
      kind: 'multi',
      options: ['icon', 'badge', 'hint'] as const,
      defaultValue: ['icon'],
    },
  ] as const);

  it('uses valid overrides and rejects invalid runtime values', () => {
    expect(
      createPlaygroundValues(controls, {
        label: 'Submit',
        size: 'invalid',
        disabled: true,
        count: Number.NaN,
      }),
    ).toEqual({
      label: 'Submit',
      size: 'md',
      disabled: true,
      count: 1,
      features: ['icon'],
    });
  });

  it('accepts a subset of the multi options and rejects unknown entries', () => {
    expect(createPlaygroundValues(controls, { features: ['badge', 'hint'] }).features).toEqual([
      'badge',
      'hint',
    ]);
    expect(createPlaygroundValues(controls, { features: ['badge', 'other'] }).features).toEqual([
      'icon',
    ]);
    expect(createPlaygroundValues(controls, { features: 'badge' }).features).toEqual(['icon']);
  });

  it('parses finite number input with a deterministic fallback', () => {
    expect(parsePlaygroundNumber('24')).toBe(24);
    expect(parsePlaygroundNumber('')).toBe(0);
    expect(parsePlaygroundNumber('not-a-number', 8)).toBe(8);
  });
});
