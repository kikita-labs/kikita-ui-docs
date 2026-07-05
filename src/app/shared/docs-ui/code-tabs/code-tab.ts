import { CodeTabLanguage } from './code-tab-language';

export interface CodeTab {
  readonly label: string;
  readonly code: string;
  readonly language: CodeTabLanguage;
}
