import { type ApiTableRow } from '@shared/docs-ui/api-table';

/** One `KuiMessages` group: the messages a component owns and their English defaults. */
export interface MessagesGroup {
  /** Key under `KuiMessages`, for example `datePicker`. */
  readonly group: string;
  /** Name of the group interface, for example `KuiDatePickerMessages`. */
  readonly interfaceName: string;
  /** The element the group belongs to, as the typings describe it. */
  readonly note: string;
  /** One row per message: name, type and default text. */
  readonly rows: readonly ApiTableRow[];
}
