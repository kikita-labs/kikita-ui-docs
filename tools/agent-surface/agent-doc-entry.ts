/**
 * Typed contract for one entry in the generated agent surface.
 *
 * This file documents the shape produced by `tools/agent-surface/collect-agent-entries.mjs`.
 * It is not imported at runtime by that generator (tools scripts stay plain Node/ESM and parse
 * `.docs-manifest.ts` / `.api-schema.ts` source text directly, matching
 * `tools/generate-example-sources.mjs`), but it is the reviewable, checked definition of the
 * output shape referenced from `.agents/agent-surface.md` and Phase 3 of
 * `.local-notes/AGENT-SURFACE-SSR-MCP-PLAN.md`.
 *
 * Boundary choice: this model lives under `tools/agent-surface/`, not `src/app/core/agent-content/`,
 * because it is build-time only data derived by a Node script, not an Angular runtime concern.
 */

export type AgentDocKind = 'home' | 'foundation' | 'component' | 'resource';

export type AgentDocStatus = 'available' | 'docs-pending';

export interface AgentDocEntry {
  readonly kind: AgentDocKind;
  readonly slug: string;
  readonly label: string;
  readonly description: string;
  /** Site route, for example `/components/button` or `/` for home. */
  readonly route: string;
  /** Repo-relative path to the generated Markdown mirror, for example `public/llms/components/button.md`. */
  readonly markdownPath: string;
  /** Public URL path serving the HTML route, matching `route`. */
  readonly htmlUrlPath: string;
  readonly status: AgentDocStatus;
  /** Installed package name this entry documents, `@kikita-labs/ui` for every entry today. */
  readonly packageName: string;
  /** Installed `@kikita-labs/ui` version at generation time. */
  readonly packageVersion: string;
  /** Repo-relative path to the sibling library source doc, or `null` when the kind has none. */
  readonly sourceDocPath: string | null;
  /** Public `@kikita-labs/ui` import name, components only. */
  readonly publicImportName: string | null;
  /** Component category id, components only. */
  readonly category: string | null;
  readonly exampleIds: readonly string[];
  /** Repo-relative path to the component's API schema module, or `null` when none exists. */
  readonly apiSchemaPath: string | null;
  readonly hasPlayground: boolean;
}
