import { type PlaygroundHtmlAttribute } from '../interfaces';

/** Property binding for a snippet: `[name]="expression"`, omitted while the expression is empty. */
export function playgroundBinding(
  name: string,
  expression: string | null | undefined,
): PlaygroundHtmlAttribute {
  return { name: `[${name}]`, value: expression };
}

/** Event binding for a snippet: `(name)="handler"`, omitted while the handler is empty. */
export function playgroundEvent(
  name: string,
  handler: string | null | undefined,
): PlaygroundHtmlAttribute {
  return { name: `(${name})`, value: handler };
}
