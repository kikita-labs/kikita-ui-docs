export type PlaygroundControlKind = 'boolean' | 'enum' | 'number' | 'string';

export interface PlaygroundControl {
  readonly key: string;
  readonly label: string;
  readonly kind: PlaygroundControlKind;
  readonly options?: readonly string[];
  readonly defaultValue: boolean | number | string;
}

export type PlaygroundValues = Readonly<Record<string, boolean | number | string>>;
