// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const browserGlobals = [
  'document',
  'history',
  'IntersectionObserver',
  'localStorage',
  'location',
  'matchMedia',
  'MutationObserver',
  'navigator',
  'requestAnimationFrame',
  'ResizeObserver',
  'sessionStorage',
  'setInterval',
  'setTimeout',
  'window',
].map((name) => ({
  name,
  message: 'Use a capability from src/app/core/platform instead.',
}));

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'playwright.config.ts',
            'tests/e2e/*.ts',
            'tests/e2e/support/*.ts',
            'tools/agent-surface/*.ts',
          ],
        },
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/prefer-readonly': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-restricted-globals': ['error', ...browserGlobals],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/common',
              importNames: ['DOCUMENT'],
              message: 'Inject a focused capability from src/app/core/platform instead.',
            },
            {
              name: '@angular/core',
              importNames: ['DOCUMENT'],
              message: 'Inject a focused capability from src/app/core/platform instead.',
            },
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@angular/(?!core/rxjs-interop$)'],
            ['^@angular/core/rxjs-interop$', '^rxjs(?:/|$)'],
            ['^@kikita-labs/ui$'],
            [
              '^@?(?!app(?:/|$)|core(?:/|$)|generated(?:/|$)|layout(?:/|$)|pages(?:/|$)|shared(?:/|$))',
            ],
            ['^@(app|core|generated|layout|pages|shared)(?:/|$)'],
            ['^\\.'],
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/core/platform/**/*.ts'],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['tests/e2e/**/*.ts'],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
