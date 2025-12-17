// Export config types
import type { ReactNode } from 'react';

export interface ExportConfig {
  filename?: string;
  entityName?: string;
  sheetName?: string;
  columnMapping?: Record<string, string>;
  columnWidths?: Array<{ wch: number }>;
  headers?: string[];
}

// Toolbar renders function types
export interface ToolbarRenderProps<T> {
  selectedRows: T[];
  allSelectedIds: (string | number)[];
  totalSelectedCount: number;
  resetSelection: () => void;
}

// Toolbar sections for left/right layout
export interface ToolbarSections {
  left?: ReactNode;
  right?: ReactNode;
}
