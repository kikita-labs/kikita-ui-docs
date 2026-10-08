import { Component } from '@angular/core';

import { OTP_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/otp-input.generated';
import { OTP_INPUT_MESSAGES } from '@generated/library-tables/messages.generated';
import { OTP_INPUT_DEFAULTS } from '@generated/library-tables/otp-input.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';

import { BasicOtpInputExample, OtpInputFieldExample, OtpInputVariantsExample } from './examples';
import { OTP_INPUT_API_ROWS } from './otp-input.api-schema';
import {
  OTP_INPUT_API_DESCRIPTION,
  OTP_INPUT_IMPORT_TABS,
  OTP_INPUT_STATUS,
} from './otp-input.docs-content';

@Component({
  selector: 'app-otp-input-page',
  imports: [
    ApiTable,
    BasicOtpInputExample,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    OtpInputFieldExample,
    OtpInputVariantsExample,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
  ],
  templateUrl: './otp-input-page.html',
  styleUrl: './otp-input-page.scss',
})
export class OtpInputPage {
  protected readonly status = OTP_INPUT_STATUS;
  protected readonly apiDescription = OTP_INPUT_API_DESCRIPTION;
  protected readonly defaults = OTP_INPUT_DEFAULTS;
  protected readonly messageGroups = [OTP_INPUT_MESSAGES];
  protected readonly apiRows = OTP_INPUT_API_ROWS;

  protected readonly importTabs = OTP_INPUT_IMPORT_TABS;

  protected readonly basicTabs = OTP_INPUT_EXAMPLE_SOURCES['basic-otp-input-example'];

  protected readonly variantsTabs = OTP_INPUT_EXAMPLE_SOURCES['otp-input-variants-example'];

  protected readonly fieldTabs = OTP_INPUT_EXAMPLE_SOURCES['otp-input-field-example'];
}
