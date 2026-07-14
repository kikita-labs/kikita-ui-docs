import { type CodeTabLanguage } from './code-tab-language';

export interface CodeTab {
  readonly label: string;
  readonly filename?: string;
  readonly code: string;
  readonly language: CodeTabLanguage;
}
