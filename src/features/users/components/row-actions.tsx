import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import { EditIcon, EllipsisIcon, TrashIcon } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/features/users/types';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useDisclosure } from '@/hooks/use-disclosure';
import { DeleteUser } from './actions/DeleteUser';

const UpdateUser = lazy(() => import('./actions/UpdateUser'));

interface DataTableRowActionsProps {
  row: Row<User>;
  table: TanstackTable<User>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { hasRole } = useAuthContext();
  const canManage = hasRole(['admin', 'manager']);
  const {
    isOpen: deleteDialogOpen,
    onOpen: openDeleteDialog,
    onOpenChange: setDeleteDialogOpen,
  } = useDisclosure();

  const {
    isOpen: updateDialogOpen,
    onOpen: openUpdateDialog,
    onOpenChange: setUpdateDialogOpen,
  } = useDisclosure();

  const user = row.original;

  // Hide actions menu for non-admin/manager users
  if (!canManage) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-50">
          <DropdownMenuItem onClick={openUpdateDialog} className="flex items-center gap-2">
            <EditIcon className="h-4 w-4" />
            Edit User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={openDeleteDialog}
            className="flex items-center gap-2 text-destructive focus:text-destructive"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {updateDialogOpen && (
        <Suspense fallback={null}>
          <UpdateUser open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} user={user} />
        </Suspense>
      )}

      {deleteDialogOpen && (
        <DeleteUser
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          userId={user.id}
          fullName={`${user.firstName} ${user.lastName}`}
        />
      )}
    </>
  );
}
