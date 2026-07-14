import type { Type } from '@angular/core';

export type DocsPageLoader = () => Promise<Type<unknown>>;
export type DocsComponentCategoryId =
  'actions' | 'forms' | 'feedback' | 'surfaces' | 'data-identity';
export type DocsComponentStatus = 'available' | 'docs-pending';
export type DocsPageId = 'home' | 'draft' | 'components-overview' | 'not-found';

export interface DocsSectionManifest {
  readonly slug: 'foundations' | 'components';
  readonly label: string;
  readonly description: string;
}

export interface DocsComponentCategoryManifest {
  readonly id: DocsComponentCategoryId;
  readonly label: string;
  readonly description: string;
}

interface DocsComponentManifestBase {
  readonly kind: 'component';
  readonly slug: string;
  readonly label: string;
  readonly category: DocsComponentCategoryId;
  readonly description: string;
  readonly importName: string;
  readonly exampleIds: readonly string[];
}

export interface DocsAvailableComponentManifest extends DocsComponentManifestBase {
  readonly status: 'available';
  readonly loadPage: DocsPageLoader;
  readonly loadPlayground?: DocsPageLoader;
}

export interface DocsPendingComponentManifest extends DocsComponentManifestBase {
  readonly status: 'docs-pending';
  readonly loadPage?: never;
  readonly loadPlayground?: never;
}

export type DocsComponentManifest = DocsAvailableComponentManifest | DocsPendingComponentManifest;

export interface DocsFoundationManifest {
  readonly kind: 'foundation';
  readonly slug: string;
  readonly label: string;
  readonly description: string;
  readonly loadPage: DocsPageLoader;
}

export interface DocsResourceManifest {
  readonly kind: 'resource';
  readonly slug: string;
  readonly label: string;
  readonly description: string;
  readonly exampleIds: readonly string[];
  readonly loadPage: DocsPageLoader;
}

export interface DocsPageManifest {
  readonly kind: 'page';
  readonly id: DocsPageId;
  readonly label: string;
  readonly description: string;
  readonly routeSegment: '' | '**' | null;
  readonly routeData?: Readonly<Record<string, string>>;
  readonly loadPage: DocsPageLoader;
}

export type DocsPageManifestMap = {
  readonly [TId in DocsPageId]: DocsPageManifest & { readonly id: TId };
};

export interface DocsRegistry {
  readonly pages: DocsPageManifestMap;
  readonly sections: {
    readonly foundations: DocsSectionManifest;
    readonly components: DocsSectionManifest;
  };
  readonly categories: readonly DocsComponentCategoryManifest[];
  readonly foundations: readonly DocsFoundationManifest[];
  readonly components: readonly DocsComponentManifest[];
  readonly resources: readonly DocsResourceManifest[];
}

export interface DocsDraftPageData {
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
}
