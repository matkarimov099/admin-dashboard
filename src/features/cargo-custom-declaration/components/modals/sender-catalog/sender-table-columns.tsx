import type { ColumnDef } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import type { Sender } from '@/features/cargo-custom-declaration/types';

export interface GetSenderColumnsOptions {
  onEdit: (sender: Sender) => void;
  onSelectSender?: (sender: Sender) => void;
  onCloseModal?: () => void;
  enableRowSelection?: boolean;
  handleRowDeselection?: ((rowId: string) => void) | null;
}

export function getSenderColumns({
  onEdit,
  onSelectSender,
  onCloseModal,
  enableRowSelection = true,
  handleRowDeselection,
}: GetSenderColumnsOptions): ColumnDef<Sender>[] {
  const baseColumns: ColumnDef<Sender>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ism" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('name')}
          onClick={() => {
            if (onSelectSender) {
              onSelectSender(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('name')}
        </div>
      ),
      size: 200,
      minSize: 150,
      maxSize: 400,
    },
    {
      accessorKey: 'address',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Manzil" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('address')}
          onClick={() => {
            if (onSelectSender) {
              onSelectSender(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('address')}
        </div>
      ),
      size: 300,
      minSize: 200,
      maxSize: 500,
    },
    {
      accessorKey: 'country',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Davlat" />,
      cell: ({ row }) => {
        const country = row.getValue('country') as string;
        if (!country) {
          return <span>-</span>;
        }
        return (
          <div className="flex items-center gap-2">
            <span
              className={`fi fi-${country.toLowerCase()}`}
              style={{ fontSize: '1.25em' }}
            />
            <span>{country}</span>
          </div>
        );
      },
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
