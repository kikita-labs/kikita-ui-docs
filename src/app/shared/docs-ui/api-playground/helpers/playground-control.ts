import { type PlaygroundControl, type PlaygroundValue, type PlaygroundValues } from '../types';

export function definePlaygroundControls<const TControls extends readonly PlaygroundControl[]>(
  controls: TControls,
): TControls {
  return controls;
}

export function createPlaygroundValues<TControls extends readonly PlaygroundControl[]>(
  controls: TControls,
  overrides: Readonly<Record<string, PlaygroundValue>>,
): PlaygroundValues<TControls> {
  const entries = controls.map((control) => {
    const override = overrides[control.key];

    return [
      control.key,
      override === undefined || !isPlaygroundControlValue(control, override)
        ? control.defaultValue
        : override,
    ];
  });

  return Object.fromEntries(entries) as PlaygroundValues<TControls>;
}

export function isPlaygroundControlValue(
  control: PlaygroundControl,
  value: PlaygroundValue,
): boolean {
  switch (control.kind) {
    case 'boolean':
      return typeof value === 'boolean';
    case 'enum':
      return typeof value === 'string' && control.options.includes(value);
    case 'multi':
      return (
        Array.isArray(value) &&
        value.every((entry) => typeof entry === 'string' && control.options.includes(entry))
      );
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'string':
      return typeof value === 'string';
  }
}

/** Maps the `none` option of an optional enum control to `undefined` (the input stays unset). */
export function playgroundOptionOrUndefined<TOption extends string>(
  value: TOption | 'none',
): TOption | undefined {
  return value === 'none' ? undefined : value;
}

export function parsePlaygroundNumber(rawValue: string, fallback = 0): number {
  const parsed = Number(rawValue);

  return rawValue.trim() === '' || !Number.isFinite(parsed) ? fallback : parsed;
}
