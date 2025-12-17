import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import { EditIcon, EllipsisIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDisclosure } from '@/hooks/use-disclosure.ts';
import { useDeleteTask } from '../hooks/use-tasks.ts';
import type { Task } from '../types.ts';
import { DeleteTask } from './actions/DeleteTask.tsx';

const UpdateTask = lazy(() => import('./actions/UpdateTask.tsx'));

interface DataTableRowActionsProps {
  row: Row<Task>;
  table: TanstackTable<Task>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const navigate = useNavigate();

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

  const task = row.original;
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask('table');

  const handleViewTask = () => {
    navigate(`/tasks/${task.taskKey}`);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id, {
      onSuccess: response => {
        toast.success(response?.message || 'Task deleted successfully');
        setDeleteDialogOpen(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to delete task');
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleViewTask} className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openUpdateDialog} className="flex items-center gap-2">
            <EditIcon className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={openDeleteDialog}
            className="flex items-center gap-2 text-destructive focus:text-destructive"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {updateDialogOpen && (
        <Suspense fallback={null}>
          <UpdateTask
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
            task={task}
            purpose="table"
          />
        </Suspense>
      )}

      {deleteDialogOpen && (
        <DeleteTask
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          taskTitle={task.title}
          isDeleting={isDeleting}
          onConfirm={handleDeleteTask}
        />
      )}
    </>
  );
}
