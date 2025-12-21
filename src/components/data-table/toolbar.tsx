import type { Table } from '@tanstack/react-table';
import { Settings, Undo2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SearchInput } from '@/components/custom/search-input.tsx';
import { Typography } from '@/components/ui/typography';
import { DataTableExport } from './data-export';
import type { ExportConfig, ToolbarSections } from './types';
import type { TableConfig } from './utils/table-config';
import { DataTableViewOptions } from './view-options';

// Helper functions for component sizing
const getButtonSizeClass = (size: 'sm' | 'default' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'h-8 px-3';
    case 'lg':
      return 'h-11 px-5';
    default:
      return '';
  }
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  totalSelectedItems?: number;
  deleteSelection?: () => void;
  getSelectedItems?: () => Promise<TData[]>;
  getAllItems?: () => TData[];
  config: TableConfig;
  resetColumnSizing?: () => void;
  resetColumnOrder?: () => void;
  tableId?: string;
  exportConfig?: ExportConfig;
  columnMapping?: Record<string, string>;
  customToolbarComponent?: ReactNode | ToolbarSections;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  getSelectedItems,
  getAllItems,
  config,
  resetColumnSizing,
  resetColumnOrder,
  tableId,
  exportConfig,
  columnMapping,
  customToolbarComponent,
  searchValue,
  onSearchChange,
}: Omit<DataTableToolbarProps<TData>, 'totalSelectedItems' | 'deleteSelection'>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    table.getState().globalFilter ||
    (config.manualSearching && searchValue);

  // Check if the customToolbarComponent is ToolbarSections (has left/right)
  const isToolbarSections =
    customToolbarComponent &&
    typeof customToolbarComponent === 'object' &&
    ('left' in customToolbarComponent || 'right' in customToolbarComponent);

  const toolbarSections = isToolbarSections ? (customToolbarComponent as ToolbarSections) : null;

  return (
    <div className="data-table-toolbar mb-2">
      {/* Desktop layouts */}
      <div className="toolbar-desktop hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
        {/* Left side - Search or Custom Left Section */}
        <div className="toolbar-left flex items-center gap-2">
          {toolbarSections ? (
            // If ToolbarSections, render a left section
            toolbarSections.left
          ) : (
            // Default: Search
            <>
              {config.enableSearch && (
                <SearchInput
                  placeholder="Search..."
                  value={
                    config.manualSearching
                      ? (searchValue ?? '')
                      : ((table.getState().globalFilter as string) ?? '')
                  }
                  onValueChange={value => {
                    if (config.manualSearching && onSearchChange) {
                      onSearchChange(value);
                    } else {
                      table.setGlobalFilter(value);
                    }
                  }}
                  className="w-full max-w-70 sm:max-w-xs"
                />
              )}
              {/* Clear filters */}
              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    table.resetColumnFilters();
                    if (config.manualSearching && onSearchChange) {
                      onSearchChange('');
                    } else {
                      table.setGlobalFilter('');
                    }
                  }}
                  leftIcon={<X className="h-4 w-4" />}
                  hideIcon={false}
                  className="h-8 px-2"
                  aria-label="Clear all filters"
                />
              )}
            </>
          )}
        </div>

        {/* Right side - Actions or Custom Right Section */}
        <div className="toolbar-right flex items-center gap-2">
          {toolbarSections
            ? // If ToolbarSections, render the right section
              toolbarSections.right
            : !isToolbarSections && customToolbarComponent
              ? (customToolbarComponent as ReactNode)
              : null}

          {config.enableExport && getAllItems && exportConfig && (
            <DataTableExport<TData>
              table={table}
              data={getAllItems()}
              selectedData={[]}
              getSelectedItems={getSelectedItems}
              entityName={exportConfig.filename || exportConfig.entityName}
              columnMapping={exportConfig.columnMapping}
              columnWidths={exportConfig.columnWidths}
              headers={exportConfig.headers}
              size={config.size}
            />
          )}

          {/* Column visibility */}
          {config.enableColumnVisibility && (
            <DataTableViewOptions
              table={table}
              size={config.size}
              tableId={tableId}
              columnMapping={columnMapping}
            />
          )}

          {/* Table settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={config.size === 'sm' ? 'sm' : 'default'}
                leftIcon={<Settings className="h-4 w-4" />}
                hideIcon={false}
                className={`${getButtonSizeClass(config.size)}`}
                aria-label="Open table settings"
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Typography variant="h4">Table Settings</Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    Manage table layout and column settings
                  </Typography>
                </div>
                <div className="grid gap-2">
                  {config.enableColumnResizing && resetColumnSizing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetColumnSizing}
                      className="justify-start"
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      Reset Column Sizes
                    </Button>
                  )}
                  {resetColumnOrder && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetColumnOrder}
                      className="justify-start"
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      Reset Column Order
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile layouts */}
      <div className="toolbar-mobile flex flex-col gap-2 lg:hidden">
        {toolbarSections ? (
          // If ToolbarSections, render mobile stacked layouts
          <>
            {toolbarSections.left && <div className="w-full">{toolbarSections.left}</div>}
            {/* Right section (filters) */}
            {toolbarSections.right && <div className="w-full">{toolbarSections.right}</div>}
            {/* Table controls (export, visibility, settings) in same row */}
            <div className="flex w-full items-center justify-end gap-2">
              {config.enableExport && getAllItems && exportConfig && (
                <DataTableExport<TData>
                  table={table}
                  data={getAllItems()}
                  selectedData={[]}
                  getSelectedItems={getSelectedItems}
                  entityName={exportConfig.filename || exportConfig.entityName}
                  columnMapping={exportConfig.columnMapping}
                  columnWidths={exportConfig.columnWidths}
                  headers={exportConfig.headers}
                  size={config.size}
                />
              )}

              {/* Column visibility */}
              {config.enableColumnVisibility && (
                <DataTableViewOptions
                  table={table}
                  size={config.size}
                  tableId={tableId}
                  columnMapping={columnMapping}
                />
              )}

              {/* Table settings */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size={config.size === 'sm' ? 'sm' : 'default'}
                    leftIcon={<Settings className="h-4 w-4" />}
                    hideIcon={false}
                    className={`${getButtonSizeClass(config.size)}`}
                    aria-label="Open table settings"
                  />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Typography variant="h4">Table Settings</Typography>
                      <Typography variant="small" className="text-muted-foreground">
                        Manage table layout and column settings
                      </Typography>
                    </div>
                    <div className="grid gap-2">
                      {config.enableColumnResizing && resetColumnSizing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetColumnSizing}
                          className="justify-start"
                        >
                          <Undo2 className="mr-2 h-4 w-4" />
                          Reset Column Sizes
                        </Button>
                      )}
                      {resetColumnOrder && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetColumnOrder}
                          className="justify-start"
                        >
                          <Undo2 className="mr-2 h-4 w-4" />
                          Reset Column Order
                        </Button>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </>
        ) : (
          // Default mobile layouts
          <>
            {/* First row - Search and table controls */}
            <div className="flex flex-wrap items-center gap-2">
              {config.enableSearch && (
                <SearchInput
                  placeholder="Search..."
                  value={
                    config.manualSearching
                      ? (searchValue ?? '')
                      : ((table.getState().globalFilter as string) ?? '')
                  }
                  onValueChange={value => {
                    if (config.manualSearching && onSearchChange) {
                      onSearchChange(value);
                    } else {
                      table.setGlobalFilter(value);
                    }
                  }}
                  className="flex-1"
                  inputClassName="w-full"
                />
              )}

              {/* Clear filters */}
              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    table.resetColumnFilters();
                    if (config.manualSearching && onSearchChange) {
                      onSearchChange('');
                    } else {
                      table.setGlobalFilter('');
                    }
                  }}
                  leftIcon={<X className="h-4 w-4" />}
                  hideIcon={false}
                  className="h-8 px-2"
                  aria-label="Clear all filters"
                />
              )}

              {/* Table controls */}
              <div className="flex shrink-0 items-center gap-2">
                {config.enableExport && getAllItems && exportConfig && (
                  <DataTableExport<TData>
                    table={table}
                    data={getAllItems()}
                    selectedData={[]}
                    getSelectedItems={getSelectedItems}
                    entityName={exportConfig.filename || exportConfig.entityName}
                    columnMapping={exportConfig.columnMapping}
                    columnWidths={exportConfig.columnWidths}
                    headers={exportConfig.headers}
                    size={config.size}
                  />
                )}

                {/* Column visibility */}
                {config.enableColumnVisibility && (
                  <DataTableViewOptions
                    table={table}
                    size={config.size}
                    tableId={tableId}
                    columnMapping={columnMapping}
                  />
                )}

                {/* Table settings */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={config.size === 'sm' ? 'sm' : 'default'}
                      leftIcon={<Settings className="h-4 w-4" />}
                      hideIcon={false}
                      className={`${getButtonSizeClass(config.size)}`}
                      aria-label="Open table settings"
                    />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-fit">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Typography variant="h4">Table Settings</Typography>
                        <Typography variant="small" className="text-muted-foreground">
                          Manage table layout and column settings
                        </Typography>
                      </div>
                      <div className="grid gap-2">
                        {config.enableColumnResizing && resetColumnSizing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetColumnSizing}
                            className="justify-start"
                          >
                            <Undo2 className="mr-2 h-4 w-4" />
                            Reset Column Sizes
                          </Button>
                        )}
                        {resetColumnOrder && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetColumnOrder}
                            className="justify-start"
                          >
                            <Undo2 className="mr-2 h-4 w-4" />
                            Reset Column Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Second row - Custom toolbar component (full width) */}
            {!isToolbarSections && customToolbarComponent && (
              <div className="w-full">{customToolbarComponent as ReactNode}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
