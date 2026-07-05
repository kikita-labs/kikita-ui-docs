export interface DocsComponentCategory {
  readonly label: string;
  readonly description: string;
  readonly components: readonly DocsComponentSummary[];
}

export interface DocsComponentSummary {
  readonly name: string;
  readonly importName: string;
  readonly status: DocsComponentStatus;
  readonly description: string;
}

export type DocsComponentStatus = 'available' | 'docs-pending';
