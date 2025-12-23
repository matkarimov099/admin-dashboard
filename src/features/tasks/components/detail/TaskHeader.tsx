import {
  ArrowLeftIcon,
  Copy,
  EditIcon,
  Trash2Icon,
  UserMinusIcon,
  UserPlusIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import type { Task } from '../../types.ts';
import { PriorityBadge } from '../badges/PriorityBadge.tsx';
import { StatusBadge } from '../badges/StatusBadge.tsx';
import { WorkTypeBadge } from '../badges/WorkTypeBadge.tsx';

interface TaskHeaderProps {
  task: Task;
  isAssigning: boolean;
  isUnassigning: boolean;
  currentUserId?: string;
  onBack: () => void;
  onEdit: () => void;
  onAssignToMe: () => void;
  onUnassignFromMe: () => void;
  onDelete: () => void;
}

export function TaskHeader({
  task,
  isAssigning,
  isUnassigning,
  currentUserId,
  onBack,
  onEdit,
  onAssignToMe,
  onUnassignFromMe,
  onDelete,
}: TaskHeaderProps) {
  const isAssignedToCurrentUser = task.assignee?.id === currentUserId;

  const handleCopyTaskUrl = async () => {
    const taskUrl = `${window.location.origin}/tasks/${task.taskKey}`;
    try {
      await navigator.clipboard.writeText(taskUrl);
      toast.success('Task URL copied to clipboard');
    } catch {
      toast.error('Failed to copy URL');
    }
  };
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-1 items-start gap-3 sm:gap-4">
        <Button variant="outline" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="mb-2 break-words font-semibold text-base text-gray-900 sm:text-lg dark:text-gray-100">
            {task.title}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleCopyTaskUrl}
                  className="group/copy inline-flex items-center gap-1"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer font-mono text-xs shadow-sm transition-colors group-hover/copy:border-primary group-hover/copy:text-primary"
                  >
                    {task.taskKey}
                  </Badge>
                  <Copy className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover/copy:opacity-100" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <small className="font-medium text-xs leading-none sm:text-sm">
                  Click to copy task URL
                </small>
              </TooltipContent>
            </Tooltip>
            <WorkTypeBadge workType={task.workType} />
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            <small className="flex items-center gap-1.5 font-medium text-xs leading-none sm:text-sm">
              <span>#{task.taskNumber}</span>
            </small>

            {task.project.url ? (
              <a
                target="_blank"
                href={task.project.url}
                className="flex items-center gap-1.5 text-xs hover:underline"
              >
                <span>{task.project.name}</span>
              </a>
            ) : (
              <small className="font-medium text-xs leading-none sm:text-sm">
                {task.project.name}
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        {isAssignedToCurrentUser ? (
          <Button
            variant="destructive"
            onClick={onUnassignFromMe}
            disabled={isUnassigning}
            className="flex-1 sm:flex-none"
          >
            <UserMinusIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              {isUnassigning ? 'Unassigning...' : 'Unassign from Me'}
            </span>
            <span className="sm:hidden">Unassign</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={onAssignToMe}
            disabled={isAssigning}
            className="flex-1 sm:flex-none"
          >
            <UserPlusIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              {isAssigning ? 'Assigning...' : 'Assign to Me'}
            </span>
            <span className="sm:hidden">Assign</span>
          </Button>
        )}
        <Button onClick={onEdit} className="flex-1 sm:flex-none">
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete} className="flex-1 sm:flex-none">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
