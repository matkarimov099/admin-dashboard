import { UsersRoundIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function UsersTooltip({ className }: { className?: string }) {
  const { t } = useTranslation();

  // TODO: Replace with actual data from API
  const registeredUsers = 1250;
  const activeUsers = 342;

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group relative ml-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-all duration-200"
          >
            <UsersRoundIcon className="h-5! w-5!" />
            <span className="sr-only">{t('active-users.title')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end" className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">{t('active-users.registered')}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {registeredUsers.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">{t('active-users.active')}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {activeUsers.toLocaleString()}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
