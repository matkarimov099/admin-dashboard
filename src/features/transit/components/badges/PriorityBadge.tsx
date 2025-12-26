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
      'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/30 dark:bg-[var(--color-error)]/20 dark:text-[var(--color-error)] dark:border-[var(--color-error)]/40 ring-1 ring-[var(--color-error)]/20 dark:ring-[var(--color-error)]/30 hover:bg-[var(--color-error)]/20 dark:hover:bg-[var(--color-error)]/30',
    high: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20 dark:bg-[var(--color-warning)]/20 dark:text-[var(--color-warning)] dark:border-[var(--color-warning)]/30 hover:bg-[var(--color-warning)]/20 dark:hover:bg-[var(--color-warning)]/30',
    medium:
      'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20 dark:bg-[var(--color-info)]/20 dark:text-[var(--color-info)] dark:border-[var(--color-info)]/30 hover:bg-[var(--color-info)]/20 dark:hover:bg-[var(--color-info)]/30',
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
