import { Component } from '@angular/core';

import {
  KuiAlert,
  KuiAlertActions,
  KuiAlertIcon,
  KuiAlertMessage,
  KuiAlertTitle,
  KuiBadge,
  KuiButton,
  KuiIcon,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-custom-content-example',
  imports: [
    KuiAlert,
    KuiAlertActions,
    KuiAlertIcon,
    KuiAlertMessage,
    KuiAlertTitle,
    KuiBadge,
    KuiButton,
    KuiIcon,
  ],
  templateUrl: './alert-custom-content-example.html',
  styleUrl: './alert-custom-content-example.scss',
})
export class AlertCustomContentExample {}
