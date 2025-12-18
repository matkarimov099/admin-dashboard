import type * as React from 'react';

import { cn } from '@/utils/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content flex min-h-16 w-full rounded-md border-control bg-control px-3 py-2 text-base text-primary outline-none transition-fast placeholder:text-secondary placeholder:text-sm placeholder:opacity-75 focus:border-[var(--color-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
