import { ClockIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { humanizeDateTime } from '@/utils/humanize.ts';

interface TimeTrackingCardProps {
  estimate?: number;
  deadline?: string;
  completedAt?: string;
}

interface TimeRowProps {
  label: string;
  value: string | number;
  isCompleted?: boolean;
}

function TimeRow({ label, value, isCompleted }: TimeRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400">{label}</p>
      <small
        className={`font-medium text-xs leading-none sm:text-sm ${
          isCompleted ? 'flex text-green-600 dark:text-green-400' : ''
        }`}
      >
        {value}
      </small>
    </div>
  );
}

function EmptyTimeRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400 [&:not(:first-child)]:mt-0">
        {label}
      </p>
      <p className="text-gray-600 text-xs italic sm:text-sm dark:text-gray-400 [&:not(:first-child)]:mt-0">
        Not set
      </p>
    </div>
  );
}

export function TimeTrackingCard({ estimate, deadline, completedAt }: TimeTrackingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <ClockIcon className="h-4 w-4" />
          <span className="text-gray-500 text-xs uppercase tracking-wide sm:text-sm dark:text-gray-500 [&:not(:first-child)]:mt-0">
            Time Tracking
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {estimate ? (
          <TimeRow label="Estimate" value={`${estimate}h`} />
        ) : (
          <EmptyTimeRow label="Estimate" />
        )}

        {deadline ? (
          <TimeRow label="Deadline" value={humanizeDateTime(deadline)} />
        ) : (
          <EmptyTimeRow label="Deadline" />
        )}

        {completedAt && (
          <TimeRow label="Completed" value={humanizeDateTime(completedAt)} isCompleted />
        )}
      </CardContent>
    </Card>
  );
}
