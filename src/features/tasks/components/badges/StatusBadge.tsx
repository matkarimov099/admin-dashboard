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
		done: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
		in_progress:
			'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50',
		in_review:
			'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/50',
		paused:
			'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50',
		cancelled:
			'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50',
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
