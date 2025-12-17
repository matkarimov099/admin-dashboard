import { memo } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/utils/utils.ts';
import type { TaskPriority } from '../../types.ts';
import { formatPriorityText, getPriorityIcon } from '../../utils/task-helpers.ts';

interface PriorityBadgeProps {
  priority: TaskPriority;
  showIcon?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriorityBadge = memo(function PriorityBadge({
  priority,
  showIcon = true,
  size = 'sm',
  className,
}: PriorityBadgeProps) {
  const Icon = getPriorityIcon(priority);

  const priorityStyles = {
    urgent:
      'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800 ring-1 ring-rose-200 dark:ring-rose-900 hover:bg-rose-100 dark:hover:bg-rose-900/50',
    high: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50',
    medium:
      'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/50',
    low: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/50',
  };

  return (
    <Badge
      size={size}
      className={cn(
        'inline-flex items-center border font-semibold transition-colors',
        priorityStyles[priority],
        className
      )}
    >
      {showIcon && <Icon />}
      <span>{formatPriorityText(priority)}</span>
    </Badge>
  );
});
