interface PlaygroundControlBase<TKey extends string, TKind extends string> {
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
