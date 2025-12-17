import { memo } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/utils/utils.ts';
import type { TaskStatus } from '../../types.ts';
import { formatStatusText, getStatusIcon } from '../../utils/task-helpers.ts';

interface StatusBadgeProps {
  status: TaskStatus;
  showIcon?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const StatusBadge = memo(function StatusBadge({
  status,
  showIcon = true,
  size = 'sm',
  className,
}: StatusBadgeProps) {
  const Icon = getStatusIcon(status);

  const statusStyles = {
    done: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20 dark:bg-[var(--color-success)]/20 dark:text-[var(--color-success)] dark:border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/20 dark:hover:bg-[var(--color-success)]/30',
    in_progress:
      'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 dark:bg-[var(--color-primary)]/20 dark:text-[var(--color-primary)] dark:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/20 dark:hover:bg-[var(--color-primary)]/30',
    in_review:
      'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20 dark:bg-[var(--color-info)]/20 dark:text-[var(--color-info)] dark:border-[var(--color-info)]/30 hover:bg-[var(--color-info)]/20 dark:hover:bg-[var(--color-info)]/30',
    paused:
      'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20 dark:bg-[var(--color-warning)]/20 dark:text-[var(--color-warning)] dark:border-[var(--color-warning)]/30 hover:bg-[var(--color-warning)]/20 dark:hover:bg-[var(--color-warning)]/30',
    cancelled:
      'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20 dark:bg-[var(--color-error)]/20 dark:text-[var(--color-error)] dark:border-[var(--color-error)]/30 hover:bg-[var(--color-error)]/20 dark:hover:bg-[var(--color-error)]/30',
    todo: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/50',
    backlog:
      'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/50',
  };

  return (
    <Badge
      size={size}
      className={cn(
        'inline-flex items-center border font-semibold transition-colors',
        statusStyles[status],
        className
      )}
    >
      {showIcon && <Icon />}
      <span>{formatStatusText(status)}</span>
    </Badge>
  );
});
