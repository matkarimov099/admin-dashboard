import { useId } from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/utils/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  disabled?: boolean;
}

export interface RadioOptionsProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'card';
  name?: string;
  disabled?: boolean;
}

export function RadioOptions({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  orientation = 'vertical',
  variant = 'default',
  name,
  disabled = false,
}: RadioOptionsProps) {
  const id = useId();

  if (variant === 'card') {
    return (
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        className={cn(
          'gap-0 space-y-2 rounded-md *:rounded-lg',
          orientation === 'horizontal' && 'flex flex-row space-x-2 space-y-0',
          className
        )}
      >
        {options.map(option => (
          <div
            key={`${id}-${option.value}`}
            className={cn(
              'relative flex flex-col gap-4 border border-input p-4 outline-none transition-all',
              'has-data-[state=checked]:z-10 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground',
              'hover:border-primary/50',
              option.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <div className="group flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  id={`${id}-${option.value}`}
                  value={option.value}
                  disabled={option.disabled || disabled}
                  aria-label={`${name}-radio-${option.value}`}
                  className="bg-accent text-primary after:absolute after:inset-0 data-[state=checked]:border-primary-foreground data-[state=checked]:bg-primary-foreground! data-[state=checked]:[&_svg]:fill-primary"
                  aria-describedby={option.description ? `${id}-${option.value}-desc` : undefined}
                />
                <Label
                  className="inline-flex cursor-pointer items-center gap-2"
                  htmlFor={`${id}-${option.value}`}
                >
                  {option.label}
                  {option.badge && (
                    <Badge
                      variant={option.badge.variant || 'outline'}
                      className={cn('rounded-sm px-1.5 py-px text-xs', option.badge.className)}
                    >
                      {option.badge.label}
                    </Badge>
                  )}
                </Label>
              </div>
              {option.description && (
                <div
                  id={`${id}-${option.value}-desc`}
                  className="text-muted-foreground text-xs leading-[inherit] group-has-checked:text-primary-foreground"
                >
                  {option.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    );
  }

  // Default variant
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      className={cn(
        'gap-2',
        orientation === 'horizontal' && 'flex flex-row',
        orientation === 'vertical' && 'flex flex-col',
        className
      )}
    >
      {options.map(option => {
        const isSelected = value === option.value;

        return (
          <label
            key={`${id}-${option.value}`}
            htmlFor={`${id}-${option.value}`}
            className={cn(
              'group flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all',
              // Border colors
              isSelected
                ? 'border-[var(--color-primary)]'
                : 'border-gray-300 dark:border-gray-600',
              // Background colors
              isSelected
                ? 'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]'
                : 'bg-background',
              // Hover states - theme color based background only
              !isSelected && !option.disabled && 'hover:bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)]',
              // Shadow
              'hover:shadow-md',
              // Disabled state
              option.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              disabled={option.disabled || disabled}
              aria-label={`${name}-radio-${option.value}`}
              className={cn(
                'border-gray-400 dark:border-gray-500',
                'data-[state=checked]:border-[var(--color-primary)] data-[state=checked]:bg-[var(--color-primary)]',
                'data-[state=checked]:[&_svg]:!fill-white data-[state=checked]:[&_svg]:!stroke-white'
              )}
            />
            <div className="flex flex-1 items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{option.label}</span>
                {option.badge && (
                  <Badge
                    variant={option.badge.variant || 'outline'}
                    className={cn('rounded-sm px-1.5 py-px text-xs', option.badge.className)}
                  >
                    {option.badge.label}
                  </Badge>
                )}
              </div>
              {option.description && (
                <span className="text-muted-foreground text-xs">{option.description}</span>
              )}
            </div>
          </label>
        );
      })}
    </RadioGroup>
  );
}
