export interface PlaygroundHtmlAttribute {
  readonly name: string;
  readonly value: boolean | number | string | null | undefined;
  readonly defaultValue?: boolean | number | string | null;
}
