import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const TOOLTIP_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const TOOLTIP_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const TOOLTIP_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'tooltip.ts',
    language: 'ts',
    code: `import { KuiTooltip } from '@kikita-labs/ui';`,
  },
];

export const TOOLTIP_PROVIDER_TABS: readonly CodeTab[] = [
  {
    label: 'app.config.ts',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { type ApplicationConfig } from '@angular/core';

import {
  KuiTooltipTriggerType,
  provideKikitaUi,
  provideKuiDefaults,
} from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi({ defaults: { tooltip: { triggerType: KuiTooltipTriggerType.Auto } } })],
};

// In a component or route subtree instead:
// providers: [provideKuiDefaults({ tooltip: { triggerType: KuiTooltipTriggerType.Hover } })]`,
  },
];
