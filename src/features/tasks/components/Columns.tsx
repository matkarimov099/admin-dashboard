import type { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DataTableRowActions } from '@/features/tasks/components/RowActions.tsx';
import { humanizeDateTime } from '@/utils/humanize';
import { cn } from '@/utils/utils.ts';
import type { Task } from '../types';
import { PriorityBadge } from './badges/PriorityBadge.tsx';
import { StatusBadge } from './badges/StatusBadge.tsx';
import { WorkTypeBadge } from './badges/WorkTypeBadge.tsx';

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Task>[] => {
  // Base columns without the select column
  const baseColumns: ColumnDef<Task>[] = [
    {
      accessorKey: 'taskKey',
      header: ({ column }) => <DataTableColumnHeader column={column} title="№" />,
      cell: ({ row }) => {
        const taskKey = row.original.taskKey;
        const handleCopyTaskUrl = async (e: React.MouseEvent) => {
          e.stopPropagation();
          const taskUrl = `${window.location.origin}/tasks/${taskKey}`;
          try {
            await navigator.clipboard.writeText(taskUrl);
            toast.success('Task URL copied to clipboard');
          } catch {
            toast.error('Failed to copy URL');
          }
        };

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleCopyTaskUrl}
                  className="group/copy flex items-center gap-1 font-medium font-mono text-muted-foreground transition-colors hover:text-primary"
                >
                  <span>{taskKey}</span>
                  <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover/copy:opacity-100" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium text-xs leading-none sm:text-sm">
                  Click to copy task URL
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      size: 70,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => {
        const title = row.original.title;
        const description = row.original.description;

        return (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help truncate text-left font-medium">{title}</div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-md">
                  <p className="font-medium text-xs leading-none sm:text-sm">{title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-help items-center truncate">
                      <span className="truncate text-muted-foreground text-xs">
                        {description.length > 40
                          ? `${description.substring(0, 40)}...`
                          : description}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-h-60 max-w-md overflow-y-auto">
                    <p className="font-medium text-xs leading-none sm:text-sm">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
      size: 300,
    },
    {
      accessorKey: 'project',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Project" />,
      cell: ({ row }) => {
        const projectName = row.original.project?.name;
        if (!projectName) {
          return <div className="text-muted-foreground italic">No Project</div>;
        }
        return <div className="truncate text-left">{projectName}</div>;
      },
      size: 150,
    },
    {
      accessorKey: 'workType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        return <WorkTypeBadge workType={row.original.workType} showIcon={false} size="xs" />;
      },
      size: 100,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        return <StatusBadge status={row.original.status} showIcon={false} size="xs" />;
      },
      size: 120,
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
      cell: ({ row }) => {
        return <PriorityBadge priority={row.original.priority} showIcon={false} size="xs" />;
      },
      size: 100,
    },
    {
      accessorKey: 'assignees',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Assignees" />,
      cell: ({ row }) => {
        const assignee = row.original.assignee;
        if (!assignee) {
          return <div className="text-muted-foreground text-sm italic">Unassigned</div>;
        }
        return (
          <div className="flex items-center gap-1">
            <div className="-space-x-2 flex">
              <TooltipProvider key={assignee.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={assignee.avatarUrl} alt={assignee.username || 'User'} />
                      <AvatarFallback className="text-xs">
                        {assignee.firstName?.[0] || assignee.username?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium text-xs leading-none sm:text-sm">
                      {assignee.firstName && assignee.lastName
                        ? `${assignee.firstName} ${assignee.lastName}`
                        : assignee.username}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      },
      size: 180,
    },
    {
      accessorKey: 'estimate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Estimate" />,
      cell: ({ row }) => {
        const estimate = row.original.estimate;
        if (!estimate) {
          return <div className="text-muted-foreground">-</div>;
        }
        return <div className="text-sm">{estimate}h</div>;
      },
      size: 90,
    },
    {
      accessorKey: 'deadline',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Deadline" />,
      cell: ({ row }) => {
        const deadline = row.original.deadline;
        if (!deadline) {
          return <div className="text-muted-foreground">-</div>;
        }

        const deadlineDate = new Date(deadline);
        const now = new Date();
        const isOverdue = deadlineDate < now && row.original.status !== 'done';

        return (
          <div className={cn('text-sm', isOverdue && 'font-medium text-destructive')}>
            {humanizeDateTime(deadline)}
          </div>
        );
      },
      size: 150,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        return (
          <div className="max-w-full truncate text-left">
            {humanizeDateTime(row.original.createdAt)}
          </div>
        );
      },
      size: 120,
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 100,
    },
  ];

  // Only include the select column if row selection is enabled
  if (handleRowDeselection !== null) {
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
                  // If we have a deselection handler, use it for better cross-page tracking
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
      },
      ...baseColumns,
    ];
  }

  // Return only the base columns if row selection is disabled
  return baseColumns;
};
