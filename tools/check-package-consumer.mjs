import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workspace = resolve('.');
const packageRoot = resolve(workspace, 'node_modules/@kikita-labs/ui');
const [workspacePackage, installedPackage, angularWorkspace] = await Promise.all([
  readJson(resolve(workspace, 'package.json')),
  readJson(resolve(packageRoot, 'package.json')),
  readJson(resolve(workspace, 'angular.json')),
]);
const publicTypes = await readFile(resolve(packageRoot, installedPackage.typings), 'utf8');

const declaredVersion = workspacePackage.dependencies?.['@kikita-labs/ui'];
const configuredStyles =
  angularWorkspace.projects?.['kikita-ui-docs']?.architect?.build?.options?.styles ?? [];
const requiredExports = [
  'DEFAULT_KUI_THEME',
  'createKuiTheme',
  'createKuiThemeCssText',
  'createKuiThemeStyleSheet',
  'createKuiThemeVariableMap',
  'KuiButtonDirective',
  'KuiDensity',
  'KuiFieldComponent',
  'KuiInputDirective',
  'kuiDialog',
  'provideKikitaUi',
];
const failures = [];

if (declaredVersion !== installedPackage.version) {
  failures.push(
    `declared version ${declaredVersion} does not match installed ${installedPackage.version}`,
  );
}

if (!configuredStyles.includes('node_modules/@kikita-labs/ui/styles/kikita-ui.css')) {
  failures.push('angular.json does not register the installed package stylesheet');
}

for (const exportName of requiredExports) {
  if (!new RegExp(`\\b${exportName}\\b`).test(publicTypes)) {
    failures.push(`installed public typings do not export ${exportName}`);
  }
}

if (failures.length > 0) {
  console.error(`Package consumer contract failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(
    `Package consumer contract passed for @kikita-labs/ui@${installedPackage.version} (${requiredExports.length} public exports and stylesheet wiring).`,
  );
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
