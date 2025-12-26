import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { humanizeDateTime } from '@/utils/humanize.ts';

interface TimelineCardProps {
  createdAt: string;
  updatedAt: string;
}

interface TimelineRowProps {
  label: string;
  date: string;
}

function TimelineRow({ label, date }: TimelineRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400">{label}</p>
      <small className="flex font-medium text-xs leading-none sm:text-sm">
        {humanizeDateTime(date)}
      </small>
    </div>
  );
}

export function TimelineCard({ createdAt, updatedAt }: TimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <span className="text-gray-500 text-xs uppercase tracking-wide sm:text-sm dark:text-gray-500">
            Timeline
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <TimelineRow label="Created" date={createdAt} />
        <TimelineRow label="Updated" date={updatedAt} />
      </CardContent>
    </Card>
  );
}
