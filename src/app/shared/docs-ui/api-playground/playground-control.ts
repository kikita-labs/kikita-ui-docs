import type { CodeTab } from '@shared/docs-ui/code-tabs';

export type PlaygroundControlKind = 'boolean' | 'enum' | 'number' | 'string';
export type PlaygroundValue = boolean | number | string;

interface PlaygroundControlBase<TKey extends string, TKind extends PlaygroundControlKind> {
  readonly key: TKey;
  readonly label: string;
  readonly kind: TKind;
}

export interface PlaygroundBooleanControl<
  TKey extends string = string,
> extends PlaygroundControlBase<TKey, 'boolean'> {
  readonly defaultValue: boolean;
}

export interface PlaygroundEnumControl<
  TKey extends string = string,
  TOptions extends readonly string[] = readonly string[],
> extends PlaygroundControlBase<TKey, 'enum'> {
  readonly options: TOptions;
  readonly defaultValue: TOptions[number];
}

export interface PlaygroundNumberControl<
  TKey extends string = string,
> extends PlaygroundControlBase<TKey, 'number'> {
  readonly defaultValue: number;
}

export interface PlaygroundStringControl<
  TKey extends string = string,
> extends PlaygroundControlBase<TKey, 'string'> {
  readonly defaultValue: string;
}

export type PlaygroundControl =
  | PlaygroundBooleanControl
  | PlaygroundEnumControl
  | PlaygroundNumberControl
  | PlaygroundStringControl;

export type PlaygroundControlValue<TControl extends PlaygroundControl> =
  TControl extends PlaygroundBooleanControl
    ? boolean
    : TControl extends PlaygroundNumberControl
      ? number
      : TControl extends PlaygroundEnumControl<string, infer TOptions>
        ? TOptions[number]
        : string;

export type PlaygroundValues<
  TControls extends readonly PlaygroundControl[] = readonly PlaygroundControl[],
> = Readonly<{
  [TControl in TControls[number] as TControl['key']]: PlaygroundControlValue<TControl>;
}>;

export type PlaygroundSnippetBuilder<TControls extends readonly PlaygroundControl[]> = (
  values: PlaygroundValues<TControls>,
) => readonly CodeTab[];

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
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'string':
      return typeof value === 'string';
  }
}

export function parsePlaygroundNumber(rawValue: string, fallback = 0): number {
  const parsed = Number(rawValue);

  return rawValue.trim() === '' || !Number.isFinite(parsed) ? fallback : parsed;
}
