import { InfoIcon } from 'lucide-react';
import type * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col gap-6 rounded-lg border bg-card px-4 py-6 text-primary shadow-sm backdrop-blur',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.ComponentProps<'div'> {
  infoTitle?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function CardTitle({ className, infoTitle, rightSection, children, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn('flex items-center gap-2 font-semibold text-primary leading-none', className)}
      {...props}
    >
      {children}
      {infoTitle && (
        <Popover>
          <PopoverTrigger asChild>
            <InfoIcon
              strokeWidth={2.2}
              className="h-4 w-4 shrink-0 cursor-help"
              style={{ color: 'var(--color-primary)' }}
            />
          </PopoverTrigger>
          <PopoverContent className="max-h-[60vh] w-[calc(100vw-2rem)] overflow-y-auto sm:w-fit md:max-w-md lg:max-w-xl">
            {typeof infoTitle === 'string' ? <p className="text-sm">{infoTitle}</p> : infoTitle}
          </PopoverContent>
        </Popover>
      )}
      {rightSection && <div className="-my-3 ml-auto">{rightSection}</div>}
    </div>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('font text-secondary text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6 text-primary', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center px-6 text-primary [.border-t]:border [.border-t]:pt-6',
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
