import packageJson from '@kikita-labs/ui/package.json';

interface KikitaUiPackageJson {
  readonly version: string;
}

export const KIKITA_UI_PACKAGE_VERSION = (packageJson as KikitaUiPackageJson).version;
export const KIKITA_UI_PACKAGE_LABEL = `@kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
