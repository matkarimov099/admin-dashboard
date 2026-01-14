import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import type { CustomsPost } from '@/data/posts';

export interface GetPostColumnsOptions {
  onSelectPost?: (post: CustomsPost) => void;
  onCloseModal?: () => void;
  enableRowSelection?: boolean;
  handleRowDeselection?: ((rowId: string) => void) | null;
}

export function getPostColumns({
  onSelectPost,
  onCloseModal,
  enableRowSelection = true,
  handleRowDeselection,
}: GetPostColumnsOptions): ColumnDef<CustomsPost>[] {
  const baseColumns: ColumnDef<CustomsPost>[] = [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kod" />,
      cell: ({ row }) => (
        <div
          className="cursor-pointer font-medium transition-colors hover:text-primary"
          onClick={() => {
            if (onSelectPost) {
              onSelectPost(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('code')}
        </div>
      ),
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ism" />,
      cell: ({ row }) => (
        <div
          className="max-w-md cursor-pointer truncate transition-colors hover:text-primary"
          title={row.getValue('name')}
          onClick={() => {
            if (onSelectPost) {
              onSelectPost(row.original);
            }
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          {row.getValue('name')}
        </div>
      ),
      size: 350,
      minSize: 200,
      maxSize: 500,
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Telefon" />,
      cell: ({ row }) => {
        const phone = row.getValue('phone') as string;
        if (!phone) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <div
            className="cursor-pointer transition-colors hover:text-primary"
            onClick={() => {
              if (onSelectPost) {
                onSelectPost(row.original);
              }
              if (onCloseModal) {
                onCloseModal();
              }
            }}
          >
            {phone}
          </div>
        );
      },
      size: 200,
      minSize: 150,
      maxSize: 300,
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
