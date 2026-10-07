import { type ApiTableRow } from '@shared/docs-ui/api-table';

/** One `defaults.<key>` entry of a component and its option rows. */
export interface ProviderDefaultsGroup {
  /** Key under `KuiComponentDefaults`, for example `datePicker`. */
  readonly key: string;
  /** Option rows of `defaults.<key>`. */
  readonly rows: readonly ApiTableRow[];
}
