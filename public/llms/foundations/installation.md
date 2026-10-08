# Installation

> Package installation and global stylesheet setup.

- Status: available
- Route: /foundations/installation
- Package: @kikita-labs/ui@2.0.0

## Content

### Package registry
Kikita UI is published under the @kikita-labs scope on the public npm registry. No registry configuration or auth token is required.
#### terminal

```bash
pnpm add @kikita-labs/ui
```

### Angular CLI setup
Use the package schematic when possible. It preserves existing style entries and configures the selected Angular project.
#### terminal

```bash
ng add @kikita-labs/ui
```

#### terminal

```bash
ng add @kikita-labs/ui --project my-app
```

### Manual setup
This docs app keeps the stylesheet in angular.json because that path is verified in a fresh Angular consumer build.
#### angular.json

```json
"styles": [
  "node_modules/@kikita-labs/ui/styles/kikita-ui.css",
  "src/styles.scss"
]
```

#### app.config.ts

```ts
import { type ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};
```

### Schematic options
Use these options when a consumer app needs to control which parts of setup are written.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --project | string | - | Targets a specific Angular project when the workspace contains multiple projects. |
| --skip-provider | boolean | - | Skips writing provideKikitaUi() when the app manages providers manually. |
| --skip-styles | boolean | - | Skips adding the package stylesheet to angular.json. |
| --theme | boolean | - | Writes the default theme seed configuration into provideKikitaUi(). Without it Kikita UI uses the same default theme internally and adds no theme code to the app. |

### Styles outside the CLI
When styles are managed outside Angular CLI, import the public style entrypoint once and register the provider by hand.
#### styles.css

```css
@import '@kikita-labs/ui/styles';
```

#### app.config.ts

```ts
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [provideKikitaUi()],
};
```

### Icons and Content Security Policy
The default Lucide set is read at a pinned lucide-static version (1.51.0) and converted to glyph data, not inserted as trusted HTML.
#### app.config.ts

```ts
import {
  createKuiLucideResolver,
  provideKikitaUi,
  provideKuiIcons,
} from '@kikita-labs/ui';

// Serve the pinned lucide-static files yourself instead of reading them from the CDN.
export const appConfig = {
  providers: [
    provideKikitaUi({ icons: false }),
    provideKuiIcons(createKuiLucideResolver({ baseUrl: '/assets/lucide' })),
  ],
};
```

#### Content-Security-Policy

```text
connect-src 'self' https://cdn.jsdelivr.net
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| KUI_LUCIDE_STATIC_VERSION | '1.51.0' | - | Exact lucide-static version the default resolver reads. It changes only with a Kikita UI release. |
| createKuiLucideResolver | (options?: KuiLucideResolverOptions) => KuiIconResolver | - | Reads another lucide-static version or origin, for self-hosted icon files. |
| provideKuiIcons | (icons: KuiIconRegistry) => EnvironmentProviders | - | Registers named icons and resolvers for the injector it is provided in. |

### Upgrading from 1.x
Update the package and run the migration that ships with it. See the Migrating to 2.0 page for every breaking change.
#### terminal

```bash
ng update @kikita-labs/ui
```

#### terminal

```bash
ng update @kikita-labs/ui --migrate-only --from=1.8.0 --to=2.0.0
```
