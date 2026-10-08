import { Component, signal } from '@angular/core';

import { KuiPagination, type KuiPaginationMessages, type KuiSize } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_MESSAGES_CONTROL,
  playgroundBinding,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { PAGINATION_API_ROWS } from '../pagination.api-schema';
import { PAGINATION_API_DESCRIPTION } from '../pagination.docs-content';
import { PAGINATION_PLAYGROUND_MESSAGES } from './constants';

const PAGINATION_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'variant',
    label: 'variant',
    kind: 'enum',
    options: ['compact', 'simple', 'full'],
    defaultValue: 'compact',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'totalPages', label: 'totalPages', kind: 'number', defaultValue: 20 },
  { key: 'totalItems', label: 'totalItems (0 = automatic)', kind: 'number', defaultValue: 0 },
  { key: 'siblingCount', label: 'siblingCount', kind: 'number', defaultValue: 1 },
  { key: 'boundaryCount', label: 'boundaryCount', kind: 'number', defaultValue: 1 },
  { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: '' },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type PaginationPlaygroundValues = PlaygroundValues<typeof PAGINATION_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-pagination-playground-page',
  imports: [ApiPlayground, ApiTable, KuiPagination, PlaygroundEventLogView],
  templateUrl: './pagination-playground-page.html',
  styleUrl: './pagination-playground-page.scss',
})
export class PaginationPlaygroundPage {
  protected readonly apiDescription = PAGINATION_API_DESCRIPTION;
  protected readonly apiRows = PAGINATION_API_ROWS;
  protected readonly page = signal(1);
  protected readonly pageSize = signal(25);
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = PAGINATION_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: PaginationPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'variant', value: values.variant, defaultValue: 'compact' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      playgroundBinding('totalPages', String(values.totalPages)),
      playgroundBinding('totalItems', values.totalItems > 0 ? String(values.totalItems) : null),
      playgroundBinding(
        'siblingCount',
        values.siblingCount === 1 ? null : String(values.siblingCount),
      ),
      playgroundBinding(
        'boundaryCount',
        values.boundaryCount === 1 ? null : String(values.boundaryCount),
      ),
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
      { name: 'disabled', value: values.disabled },
    ]);
    const pageSize = values.variant === 'full' ? ' [(pageSize)]="pageSize"' : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-pagination [(currentPage)]="page"${pageSize}${attrString} />`,
      },
    ];
  };

  protected variantOf(values: PaginationPlaygroundValues): 'compact' | 'simple' | 'full' {
    return values.variant;
  }

  protected sizeOf(values: PaginationPlaygroundValues): KuiSize {
    return values.size;
  }

  protected totalPagesOf(values: PaginationPlaygroundValues): number {
    return Math.max(1, Math.round(values.totalPages));
  }

  protected totalItemsOf(values: PaginationPlaygroundValues): number | undefined {
    return values.totalItems > 0 ? values.totalItems : undefined;
  }

  protected siblingCountOf(values: PaginationPlaygroundValues): number {
    return Math.max(0, Math.round(values.siblingCount));
  }

  protected boundaryCountOf(values: PaginationPlaygroundValues): number {
    return Math.max(0, Math.round(values.boundaryCount));
  }

  protected ariaLabelOf(values: PaginationPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(
    values: PaginationPlaygroundValues,
  ): Partial<KuiPaginationMessages> | undefined {
    return values.messages === 'custom' ? PAGINATION_PLAYGROUND_MESSAGES : undefined;
  }

  protected disabledOf(values: PaginationPlaygroundValues): boolean {
    return values.disabled;
  }

  protected onPageChange(page: number): void {
    this.page.set(page);
    this.eventLog.log('currentPageChange', page);
  }

  protected onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.eventLog.log('pageSizeChange', pageSize);
  }
}
