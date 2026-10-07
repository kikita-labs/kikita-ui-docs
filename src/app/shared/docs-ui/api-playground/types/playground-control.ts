import { type CodeTab } from '@shared/docs-ui/code-tabs';

import {
  type PlaygroundBooleanControl,
  type PlaygroundEnumControl,
  type PlaygroundMultiControl,
  type PlaygroundNumberControl,
  type PlaygroundStringControl,
} from '../interfaces';

export type PlaygroundControlKind = 'boolean' | 'enum' | 'multi' | 'number' | 'string';
export type PlaygroundValue = boolean | number | string | readonly string[];

export type PlaygroundControl =
  | PlaygroundBooleanControl
  | PlaygroundEnumControl
  | PlaygroundMultiControl
  | PlaygroundNumberControl
  | PlaygroundStringControl;

export type PlaygroundControlValue<TControl extends PlaygroundControl> =
  TControl extends PlaygroundBooleanControl
    ? boolean
    : TControl extends PlaygroundNumberControl
      ? number
      : TControl extends PlaygroundMultiControl<string, infer TOptions>
        ? readonly TOptions[number][]
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
