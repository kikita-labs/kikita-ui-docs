# SSR And Prerender Maintenance

Kikita UI Docs must provide complete initial HTML for agents, crawlers, and
users with slow devices. This document defines the maintenance rules after the
SSR migration lands.

## Rendering Strategy

Use Angular server-side and hybrid rendering. Prefer prerendering for stable
public documentation routes and server rendering for routes that cannot be known
at build time. Client rendering is allowed only for internal smoke routes or
features that have a documented reason.

Expected route policy:

- Home, foundations, available component pages, playground pages, 404, and
  package smoke docs: prerender when their params are known from the docs
  registry.
- Draft component routes: prerender only when intentionally public and clearly
  marked as draft.
- Unknown future dynamic routes: SSR fallback or explicit 404 behavior.

The typed docs registry must remain the source for prerender params. Do not
duplicate route lists in SSR configuration.

## HTML Completeness Contract

The server/prerendered response for a docs page must include:

- page H1 and description;
- top-level section headings;
- install/import snippets;
- visible documentation prose;
- API rows;
- code example text;
- accessibility notes;
- canonical links and useful meta tags when implemented.

The response may defer enhanced interactions, syntax highlighting decoration,
copy buttons, theme controls, and playground editing until hydration, as long as
the documentation content is already present.

## Browser API Rules

SSR code follows `.agents/platform-and-state.md`.

No ordinary component, docs page, example, or feature service may directly use:

- `window`, `document`, `navigator`;
- `localStorage`, `sessionStorage`;
- `location`, `history`;
- observers, timers, or document/window event listeners.

Use platform adapters, Angular DI tokens, and render hooks. Server mode must
return stable fallbacks instead of throwing.

## Build And Deployment Rules

Keep client and server outputs explicit in `angular.json` and scripts. The
production docs build must produce:

- browser assets;
- server or prerender output;
- public `llms.txt`, `llms-full.txt`, Markdown mirrors, and agent manifest.

The static file server used by browser tests must serve the same output shape
that production deployment serves. If the output directory changes, update
`tools/serve-dist.mjs`, Playwright config, performance checks, and README/docs
together.

## Verification

After SSR-related changes:

- build production output;
- inspect generated HTML for representative routes;
- run the SSR/prerender smoke test;
- run responsive and accessibility checks when layout or shell behavior changed;
- run performance budget checks and compare initial bundle/server output size;
- confirm no hydration mismatch or console error appears in browser smoke.

Record any route intentionally left CSR-only in the relevant work package or
ADR.
