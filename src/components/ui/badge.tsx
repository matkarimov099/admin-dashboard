import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden font-sans',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:text-[var(--color-primary-light)] border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary-light)]/80 dark:hover:bg-[var(--color-primary)]/20',
        secondary:
          'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800',
        destructive:
          'bg-[var(--color-error)]/10 dark:bg-[var(--color-error)]/20 text-[var(--color-error)] border-[var(--color-error)]/20 dark:border-[var(--color-error)]/30 hover:bg-[var(--color-error)]/20 dark:hover:bg-[var(--color-error)]/30',
        success:
          'bg-[var(--color-success)]/10 dark:bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)]/20 dark:border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/20 cursor-pointer dark:hover:bg-[var(--color-success)]/30',
        warning:
          'bg-[var(--color-warning)]/10 dark:bg-[var(--color-warning)]/20 text-[var(--color-warning)] border-[var(--color-warning)]/20 dark:border-[var(--color-warning)]/30 hover:bg-[var(--color-warning)]/20 dark:hover:bg-[var(--color-warning)]/30',
        info: 'bg-[var(--color-info)]/10 dark:bg-[var(--color-info)]/20 text-[var(--color-info)] border-[var(--color-info)]/20 dark:border-[var(--color-info)]/30 hover:bg-[var(--color-info)]/20 dark:hover:bg-[var(--color-info)]/30',
        outline:
          'text-[var(--label)] border-[var(--border)] bg-transparent hover:bg-[var(--control-ghost-bg)]',
        purple:
          'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40',
        pink: 'bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/40',
      },
      size: {
        xs: 'px-2 py-0.5 text-[10px] rounded-full gap-1 [&>svg]:size-3',
        sm: 'px-2.5 py-1 text-xs rounded-full gap-1.5 [&>svg]:size-3.5',
        md: 'px-3 py-1.5 text-sm rounded-full gap-1.5 [&>svg]:size-4',
        lg: 'px-4 py-2 text-sm rounded-full gap-2 [&>svg]:size-4',
        xl: 'px-5 py-2.5 text-base rounded-full gap-2 [&>svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
