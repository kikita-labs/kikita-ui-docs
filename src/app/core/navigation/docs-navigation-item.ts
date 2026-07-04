export interface DocsNavigationItem {
  readonly label: string;
  readonly path: string;
  readonly description: string;
  readonly children?: readonly DocsNavigationItem[];
}
