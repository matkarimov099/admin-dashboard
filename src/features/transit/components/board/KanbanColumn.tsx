import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography.tsx';
import { cn } from '@/utils/utils';
import type { Task, TaskStatus } from '../../types';
import { StatusBadge } from '../badges/StatusBadge';
import { KanbanCard } from './KanbanCard';

const CreateTask = lazy(() => import('../actions/CreateTask'));

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  taskCount: number;
  onTaskClick?: (taskKey: string) => void;
}

export function KanbanColumn({ status, tasks, taskCount, onTaskClick }: KanbanColumnProps) {
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: status,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: status,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const taskIds = tasks.map(task => task.id);

  return (
    <div
      ref={setSortableRef}
      style={style}
      className={cn(
        'flex h-full min-w-[320px] max-w-[320px] shrink-0 flex-col rounded-lg border border-border bg-muted/30',
        isDragging && 'opacity-50'
      )}
    >
      {/* Column Header */}
      <div className="flex-shrink-0 rounded-t-lg border-border border-b bg-background/95 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div
            {...attributes}
            {...listeners}
            className="flex flex-1 cursor-grab items-center gap-2 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <StatusBadge status={status} size="xs" />
          </div>
          <div className="flex items-center gap-2.5">
            <Typography variant="small" className="font-semibold text-muted-foreground">
              {taskCount}
            </Typography>
            <Suspense fallback={null}>
              <CreateTask
                purpose="board"
                initialStatus={status}
                triggerButton={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-2"
                    aria-label={`Create task in ${status}`}
                  >
                    <Plus className="!size-4" />
                  </Button>
                }
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Column Content with Vertical Scroll */}
      <div className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          <div
            ref={setDroppableRef}
            className={cn(
              'min-h-[200px] p-2 transition-colors',
              isOver && 'bg-primary/5 ring-2 ring-primary/20 ring-inset'
            )}
          >
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {tasks.map(task => (
                  <KanbanCard key={task.id} task={task} onTaskClick={onTaskClick} />
                ))}
              </div>
            </SortableContext>

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <Typography variant="muted">No tasks</Typography>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
