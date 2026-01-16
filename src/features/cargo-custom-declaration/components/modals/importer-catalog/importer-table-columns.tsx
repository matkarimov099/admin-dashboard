import type { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import type { Importer } from '@/features/cargo-custom-declaration/types';

export interface GetImporterColumnsOptions {
  onEdit: (item: Importer) => void;
  onSelectItem?: (item: Importer) => void;
  onCloseModal?: () => void;
  enableRowSelection?: boolean;
  handleRowDeselection?: ((rowId: string) => void) | null;
}

export function getImporterColumns({
  onEdit,
  onSelectItem,
  onCloseModal,
  enableRowSelection = true,
  handleRowDeselection,
}: GetImporterColumnsOptions): ColumnDef<Importer>[] {
  const baseColumns: ColumnDef<Importer>[] = [
    {
      accessorKey: 'ktut',
      header: ({ column }) => <DataTableColumnHeader column={column} title="KTUT" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('ktut')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('ktut') || '-'}
        </div>
      ),
      size: 100,
      minSize: 80,
      maxSize: 120,
    },
    {
      accessorKey: 'stir',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STIR" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('stir')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('stir') || '-'}
        </div>
      ),
      size: 120,
      minSize: 100,
      maxSize: 150,
    },
    {
      accessorKey: 'nameAndAddress',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name and Address" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('nameAndAddress')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('nameAndAddress')}
        </div>
      ),
      size: 300,
      minSize: 200,
      maxSize: 500,
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
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
