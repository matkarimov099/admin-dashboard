import type { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import type { TIFIndividual } from '@/features/cargo-custom-declaration/types';

export interface GetIndividualColumnsOptions {
  onEdit: (item: TIFIndividual) => void;
  onSelectItem?: (item: TIFIndividual) => void;
  onCloseModal?: () => void;
  enableRowSelection?: boolean;
  handleRowDeselection?: ((rowId: string) => void) | null;
}

export function getIndividualColumns({
  onEdit,
  onSelectItem,
  onCloseModal,
  enableRowSelection = true,
  handleRowDeselection,
}: GetIndividualColumnsOptions): ColumnDef<TIFIndividual>[] {
  const baseColumns: ColumnDef<TIFIndividual>[] = [
    {
      accessorKey: 'pinfl',
      header: ({ column }) => <DataTableColumnHeader column={column} title="PINFL" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('pinfl')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('pinfl')}
        </div>
      ),
      size: 150,
      minSize: 120,
      maxSize: 180,
    },
    {
      accessorKey: 'district',
      header: ({ column }) => <DataTableColumnHeader column={column} title="District" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('district')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('district') || '-'}
        </div>
      ),
      size: 120,
      minSize: 100,
      maxSize: 150,
    },
    {
      accessorKey: 'fullName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('fullName')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('fullName')}
        </div>
      ),
      size: 200,
      minSize: 150,
      maxSize: 300,
    },
    {
      accessorKey: 'address',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('address')}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('address')}
        </div>
      ),
      size: 200,
      minSize: 150,
      maxSize: 300,
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
