import { Bug, CheckSquare, FileText, Layers } from 'lucide-react';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { cn } from '@/utils/utils.ts';
import type { TaskWorkType } from '../../types.ts';

interface WorkTypeBadgeProps {
  workType: TaskWorkType;
  showIcon?: boolean;
  iconOnly?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getWorkTypeIcon = (workType: TaskWorkType) => {
  const iconMap = {
    bug: Bug,
    task: CheckSquare,
    story: FileText,
    epic: Layers,
  };
  return iconMap[workType];
};

const formatWorkTypeText = (workType: TaskWorkType) => {
  const textMap = {
    bug: 'Bug',
    task: 'Task',
    story: 'Story',
    epic: 'Epic',
  };
  return textMap[workType];
};

export const WorkTypeBadge = memo(function WorkTypeBadge({
  workType,
  showIcon = true,
  iconOnly = false,
  size = 'sm',
  className,
}: WorkTypeBadgeProps) {
  const Icon = getWorkTypeIcon(workType);
  const workTypeText = formatWorkTypeText(workType);

  const workTypeStyles = {
    bug: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50',
    task: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50',
    story:
      'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50',
    epic: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50',
  };

  const badge = (
    <Badge
      size={size}
      className={cn(
        'inline-flex items-center border font-semibold transition-colors',
        iconOnly && 'px-1.5',
        workTypeStyles[workType],
        className
      )}
    >
      {(showIcon || iconOnly) && <Icon className={cn(iconOnly && 'mr-0')} />}
      {!iconOnly && <span>{workTypeText}</span>}
    </Badge>
  );

  // Wrap with tooltip only when iconOnly is true
  if (iconOnly) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent>
            <span>{workTypeText}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
});
