import { type KuiFileUploadMessages } from '@kikita-labs/ui';

/** The message overrides the playground applies when its `messages` control is `custom`. */
export const FILE_UPLOAD_PLAYGROUND_MESSAGES: Partial<KuiFileUploadMessages> = {
  promptBefore: 'Drop files here or ',
  promptAction: 'browse your computer',
  attachFile: 'Add files',
};

/** Accept presets of the `accept` control; the first entry means "any file type". */
export const FILE_UPLOAD_PLAYGROUND_ACCEPT = {
  any: undefined,
  images: ['image/png', 'image/jpeg'],
  'images and pdf': ['image/png', 'image/jpeg', 'application/pdf'],
} as const;
