import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, Copy, Link2, Paperclip, UserPlus } from 'lucide-react';
import type * as React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AvatarGroup } from '@/components/common/avatar-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/utils';
import { useAssignToMe } from '../../hooks/use-tasks';
import type { Task } from '../../types';
import { PriorityBadge } from '../badges/PriorityBadge';
import { WorkTypeBadge } from '../badges/WorkTypeBadge';

interface KanbanCardProps {
  task: Task;
  onTaskClick?: (taskKey: string) => void;
}

export function KanbanCard({ task, onTaskClick }: KanbanCardProps) {
  const navigate = useNavigate();
  const { mutate: assignToMe, isPending: isAssigning } = useAssignToMe();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on assign button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    // Use onTaskClick if provided (for modal), otherwise navigate
    if (onTaskClick) {
      onTaskClick(task.taskKey);
    } else {
      navigate(`/tasks/${task.taskKey}`);
    }
  };

  const handleAssignToMe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    assignToMe(task.id, {
      onSuccess: () => {
        toast.success('Task assigned to you successfully');
      },
      onError: error => {
        toast.error(error.message || 'Failed to assign task');
      },
    });
  };

  const handleCopyTaskUrl = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const taskUrl = `${window.location.origin}/tasks/${task.taskKey}`;
    try {
      await navigator.clipboard.writeText(taskUrl);
      toast.success('Task URL copied to clipboard');
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const linkedTasksCount = task.linkedTasks?.length ?? 0;
  const attachmentsCount = task.assets?.length ?? 0;

  // Single assignee user for avatar
  const assigneeUser = task.assignee
    ? {
        id: task.assignee.id,
        name:
          task.assignee.firstName && task.assignee.lastName
            ? `${task.assignee.firstName} ${task.assignee.lastName}`
            : task.assignee.username,
        image: task.assignee.avatarUrl,
        role: task.assignee.position || task.assignee.role,
      }
    : null;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={cn(
          'group cursor-pointer py-3 transition-all duration-200 hover:border-primary/50 hover:shadow-lg',
          isDragging && 'scale-105 opacity-50 shadow-xl ring-2 ring-primary'
        )}
        onClick={handleClick}
      >
        <CardHeader className="px-4">
          <div className="flex items-center justify-between gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleCopyTaskUrl}
                  className="group/copy flex items-center gap-1 font-mono font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                    {task.taskKey}
                  </p>
                  <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover/copy:opacity-100" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col gap-2 space-y-1">
                  <p className="font-semibold">{task.project.name}</p>
                  <p className="text-muted-foreground">Click to copy task URL</p>
                </div>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1.5">
              <WorkTypeBadge workType={task.workType} iconOnly size="xs" />
              <PriorityBadge priority={task.priority} showIcon={false} size="xs" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 py-0">
          <p className="line-clamp-2 break-words transition-colors group-hover:text-primary">
            {task.title}
          </p>

          {task.description && (
            <p className="line-clamp-2 overflow-hidden break-all">{task.description}</p>
          )}
        </CardContent>

        <CardFooter className="px-4">
          <div className="flex w-full items-center justify-between gap-2">
            {/* Assignee */}
            {assigneeUser ? (
              <div className="relative">
                <AvatarGroup users={[assigneeUser]} maxVisible={1} size="xs" />
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAssignToMe}
                    disabled={isAssigning}
                    className="h-6 px-2 text-muted-foreground text-xs hover:text-foreground"
                  >
                    <UserPlus className="mr-1 h-3 w-3" />
                    Assign to me
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Assign this task to yourself</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Metadata Icons */}
            <TooltipProvider delayDuration={0}>
              <div className="flex items-center gap-2">
                {task.estimate && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                        <Clock className="h-3 w-3" />
                        <p className="font-medium text-xs">{task.estimate}h</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated time</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {task.deadline && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                        <Calendar className="h-3 w-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {new Date(task.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {linkedTasksCount > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                        <Link2 className="h-3 w-3" />
                        <p className="font-medium text-xs">{linkedTasksCount}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{linkedTasksCount} linked tasks</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {attachmentsCount > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                        <Paperclip className="h-3 w-3" />
                        <p className="font-medium text-xs">{attachmentsCount}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{attachmentsCount} attachments</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
