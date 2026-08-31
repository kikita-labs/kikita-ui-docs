import { type CodeTabLanguage } from '../types';

export interface CodeTab {
  readonly label: string;
  readonly filename?: string;
  readonly code: string;
  readonly language: CodeTabLanguage;
}
