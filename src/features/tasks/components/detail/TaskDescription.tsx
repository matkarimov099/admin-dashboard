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
          <p className="whitespace-pre-wrap break-words text-sm leading-6 sm:text-base sm:leading-7 [&:not(:first-child)]:mt-0">
            {description}
          </p>
        ) : (
          <p className="text-gray-600 text-xs italic sm:text-sm dark:text-gray-400">
            No description provided
          </p>
        )}
      </CardContent>
    </Card>
  );
}
