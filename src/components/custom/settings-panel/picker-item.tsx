import { CheckIcon } from 'lucide-react';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/utils/utils';

// ============================
// Reusable Picker Item Component
// ============================

interface PickerItemProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  isSelected: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  iconContainerClassName?: string;
  children?: React.ReactNode;
}

export const PickerItem = forwardRef<HTMLButtonElement, PickerItemProps>(
  (
    {
      isSelected,
      icon: Icon,
      label,
      description,
      iconContainerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const hasVisualContent = Icon || children;
    const isTextOnly = !hasVisualContent;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'group relative rounded-md border-2 transition-colors duration-200',
          'bg-card',
          isTextOnly
            ? 'flex-col items-start justify-start px-3 py-2 text-left'
            : hasVisualContent
              ? 'flex-col items-center justify-center p-2.5'
              : 'flex-col items-center justify-center p-2.5',
          isSelected
            ? 'border-(--color-primary)'
            : 'border-border hover:border-(--color-primary)/60',
          className
        )}
        {...props}
      >
        {/* Content */}
        <div className={cn('text-center', isTextOnly ? 'text-left' : 'text-center')}>
          {/* Icon or Custom Content */}
          {hasVisualContent &&
            (Icon ? (
              <div
                className={cn(
                  'mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-lg transition-colors duration-200',
                  isSelected
                    ? 'bg-(--color-primary) text-white'
                    : 'bg-muted-foreground/80 text-muted-foreground',
                  iconContainerClassName
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
            ) : (
              <div className="mx-auto mb-1.5 flex h-5 items-center justify-center">{children}</div>
            ))}

          {/* Label */}
          <span
            className={cn(
              'block font-medium text-xs transition-colors duration-200',
              isSelected ? 'font-semibold text-(--color-primary)' : 'text-foreground'
            )}
          >
            {label}
          </span>

          {/* Description */}
          {description && (
            <span className="mt-0.5 block text-[10px] text-muted-foreground">{description}</span>
          )}
        </div>

        {/* Check Icon */}
        {isSelected && (
          <div
            className={cn(
              'absolute rounded-full border border-white bg-(--color-primary) p-0.5 shadow-md',
              isTextOnly ? 'top-2 right-2' : '-top-1.5 -right-1.5'
            )}
          >
            <CheckIcon className="h-3 w-3 text-white" />
          </div>
        )}
      </button>
    );
  }
);

PickerItem.displayName = 'PickerItem';
