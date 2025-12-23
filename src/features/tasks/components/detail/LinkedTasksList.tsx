import { ExternalLink, LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import type { LinkedTask } from '@/features/tasks/types.ts';

interface LinkedTasksListProps {
  linkedTaskUrls: LinkedTask[];
}

export function LinkedTasksList({ linkedTaskUrls }: LinkedTasksListProps) {
  if (!linkedTaskUrls || linkedTaskUrls.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wide">Linked Tasks</span>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">({linkedTaskUrls.length})</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {linkedTaskUrls.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:border-primary hover:bg-accent/50"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              <small className="text-xs sm:text-sm font-medium leading-none min-w-0 flex-1 break-all text-primary hover:underline">
                {link.url}
              </small>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
