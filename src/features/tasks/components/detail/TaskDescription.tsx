import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

interface TaskDescriptionProps {
  description?: string;
}

export function TaskDescription({ description }: TaskDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto">
        {description ? (
          <p className="text-sm sm:text-base leading-6 sm:leading-7 whitespace-pre-wrap break-words [&:not(:first-child)]:mt-0">
            {description}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
            No description provided
          </p>
        )}
      </CardContent>
    </Card>
  );
}
