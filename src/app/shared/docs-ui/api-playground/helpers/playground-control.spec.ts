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
  ] as const);

  it('uses valid overrides and rejects invalid runtime values', () => {
    expect(
      createPlaygroundValues(controls, {
        label: 'Submit',
        size: 'invalid',
        disabled: true,
        count: Number.NaN,
      }),
    ).toEqual({ label: 'Submit', size: 'md', disabled: true, count: 1 });
  });

  it('parses finite number input with a deterministic fallback', () => {
    expect(parsePlaygroundNumber('24')).toBe(24);
    expect(parsePlaygroundNumber('')).toBe(0);
    expect(parsePlaygroundNumber('not-a-number', 8)).toBe(8);
  });
});
