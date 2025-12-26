import type { TableConfig } from '@/components/data-table/utils/table-config';

export const tasksTableConfig: Partial<TableConfig> = {
  // Feature flags
  enableRowSelection: true,
  enableClickRowSelect: true,
  enableKeyboardNavigation: true,
  enableSearch: true,
  enableDateFilter: false,
  enableColumnFilters: false,
  enableColumnVisibility: true,
  enableToolbar: true,
  enablePagination: true,
  enableExport: true,
  enableUrlState: false,
  enableColumnResizing: true,

  // Configuration
  columnResizingTableId: 'tasks-table',
  size: 'default',

  // Manual mode flags (for backend pagination)
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  manualSearching: true,
};
