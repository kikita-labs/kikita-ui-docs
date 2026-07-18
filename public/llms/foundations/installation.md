# Installation

> Package installation and global stylesheet setup.

- Status: available
- Route: /foundations/installation
- Package: @kikita-labs/ui@1.0.0

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
| --theme | boolean | - | Writes the default theme seed configuration into provideKikitaUi(). |
