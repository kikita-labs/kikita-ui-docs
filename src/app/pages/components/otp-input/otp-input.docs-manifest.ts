import type { DocsComponentManifest } from '@core/docs-registry';

export const OTP_INPUT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'otp-input',
  label: 'OTP Input',
  category: 'forms',
  description: 'Row of single-character cells for a one-time code or PIN.',
  importName: 'KuiOtpInput',
  status: 'available',
  exampleIds: ['basic-otp-input-example', 'otp-input-variants-example', 'otp-input-field-example'],
  loadPage: () => import('./otp-input-page').then((module) => module.OtpInputPage),
  loadPlayground: () =>
    import('./playground/otp-input-playground-page').then(
      (module) => module.OtpInputPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
