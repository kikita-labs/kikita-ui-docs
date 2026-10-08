import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const CAROUSEL_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const CAROUSEL_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const CAROUSEL_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'carousel.ts',
    language: 'ts',
    code: `import { KuiCarousel, KuiCarouselSlide } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
