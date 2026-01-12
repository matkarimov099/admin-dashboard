import type { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import type { Exporter } from '@/features/cargo-custom-declaration/types';

export interface GetExporterColumnsOptions {
  onEdit: (exporter: Exporter) => void;
  onSelectExporter?: (exporter: Exporter) => void;
  onCloseModal?: () => void;
  enableRowSelection?: boolean;
  handleRowDeselection?: ((rowId: string) => void) | null;
}

export function getExporterColumns({
  onEdit,
  onSelectExporter,
  onCloseModal,
  enableRowSelection = true,
  handleRowDeselection,
}: GetExporterColumnsOptions): ColumnDef<Exporter>[] {
  const baseColumns: ColumnDef<Exporter>[] = [
    {
      accessorKey: 'nameAndAddress',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nomi va manzil" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('nameAndAddress')}
          onClick={() => {
            if (onSelectExporter) {
              onSelectExporter(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('nameAndAddress')}
        </div>
      ),
      size: 400,
      minSize: 200,
      maxSize: 600,
    },
    {
      accessorKey: 'country',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Davlat" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span
            className={`fi fi-${row.original.country.toLowerCase()}`}
            style={{ fontSize: '1.25em' }}
          />
          <span>{row.getValue('country')}</span>
        </div>
      ),
      size: 150,
      minSize: 100,
      maxSize: 200,
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amallar" />,
      cell: ({ row }) => (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={e => {
            e.stopPropagation();
            onEdit(row.original);
          }}
        >
          <EditIcon className="h-5! w-5! text-blue-500" />
        </Button>
      ),
      size: 100,
      minSize: 80,
      maxSize: 120,
    },
  ];

  // Only include the select column if row selection is enabled
  if (enableRowSelection && handleRowDeselection !== null) {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <div className="truncate pl-2">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="truncate">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => {
                if (value) {
                  row.toggleSelected(true);
                } else {
                  row.toggleSelected(false);
                  if (handleRowDeselection) {
                    handleRowDeselection(row.id);
                  }
                }
              }}
              aria-label="Select row"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
        minSize: 50,
        maxSize: 50,
      },
      ...baseColumns,
    ];
  }

  return baseColumns;
}
