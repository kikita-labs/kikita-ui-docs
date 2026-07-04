# Kikita UI Docs

This app is the future public documentation and external consumer verification
surface for `@kikita-labs/ui`.

The app intentionally consumes the published package from GitHub Packages instead
of importing library source files from the sibling `kikita-ui` repository.

## Setup

```bash
pnpm install
pnpm start
pnpm build
```

The Kikita stylesheet is registered in `angular.json`:

```json
"node_modules/@kikita-labs/ui/styles/kikita-ui.css"
```

Do not move this import into `src/styles.scss` unless the package stylesheet
export has been verified in a fresh Angular consumer app.

## Current Package

```text
@kikita-labs/ui@0.0.5
```

## Role

- public docs app
- package install smoke test
- consumer integration gate before moving Kikita UI into real products
- future home for polished docs pages, not raw playground/debug boards

## Architecture

Read `docs/architecture.md` before adding shell, shared docs UI, routes, or real
documentation pages.
