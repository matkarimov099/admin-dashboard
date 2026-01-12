import type { VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import type { buttonVariants } from '@/components/ui/button-variants.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/utils/utils.ts';

// ============================================================================
// Types
// ============================================================================

export interface CommandPopoverOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  className?: string;
}

export interface CommandPopoverProps
  extends Omit<React.ComponentProps<typeof Popover>, 'onChange' | 'value'> {
  /**
   * Array of options to display in the command menu
   */
  data: CommandPopoverOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Custom trigger component
   */
  trigger?: React.ReactNode;

  /**
   * Size variant for the trigger button (if using default trigger)
   */
  size?: VariantProps<typeof buttonVariants>['size'];

  /**
   * Placeholder for the search input
   */
  placeholder?: string;

  /**
   * Heading for the command group
   */
  heading?: string;

  /**
   * Text to display when no results found
   */
  emptyText?: string;

  /**
   * Display selected item's label in trigger
   */
  displayValue?: string;

  /**
   * Width of the popover content
   */
  popoverWidth?: string | number;

  /**
   * Alignment of the popover
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Whether to show check icon for selected item
   */
  showCheckIcon?: boolean;

  /**
   * Whether to allow clearing selection
   */
  allowClear?: boolean;

  /**
   * Callback when cleared
   */
  onClear?: () => void;

  /**
   * Whether to close popover on select
   */
  closeOnSelect?: boolean;
  /**
   * Represents the CSS class or classes to be applied to a component or element.
   * This is an optional string that can be used to customize styling by specifying one or more class names.
   */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export const CommandPopover = React.forwardRef<
  React.ElementRef<typeof Popover>,
  CommandPopoverProps
>(
  ({
    data = [],
    value,
    onChange,
    trigger,
    size = 'default',
    placeholder = 'Search...',
    heading,
    emptyText = 'No results found.',
    displayValue,
    popoverWidth = 400,
    align = 'start',
    showCheckIcon = true,
    allowClear = false,
    onClear,
    closeOnSelect = true,
    className,
    open,
    onOpenChange,
    ...props
  }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isOpen = open !== undefined ? open : internalOpen;
    const handleOpenChange = (newOpen: boolean) => {
      onOpenChange?.(newOpen);
      setInternalOpen(newOpen);
    };

    const selectedOption = data.find(item => item.value === value);

    // Filter data by search query (search in label and value/code)
    const filteredData = React.useMemo(() => {
      if (!searchQuery.trim()) return data;
      const query = searchQuery.toLowerCase();
      return data.filter(
        item => item.label.toLowerCase().includes(query) || item.value.toLowerCase().includes(query)
      );
    }, [data, searchQuery]);

    // Helper to format label with a bold type
    const formatLabel = (label: string) => {
      const parts = label.split(' ');
      if (parts.length >= 3) {
        const [type, code, ...nameParts] = parts;
        const name = nameParts.join(' ');
        return (
          <>
            <span className="font-bold">{type}</span> <span>{code}</span> <span>{name}</span>
          </>
        );
      }
      return label;
    };

    const handleSelect = (selectedValue: string) => {
      // If clicking the same value and allowClear is enabled, clear it
      if (allowClear && selectedValue === value) {
        onClear?.();
        onChange?.('');
        return;
      }

      onChange?.(selectedValue);
      if (closeOnSelect) {
        handleOpenChange(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
      onChange?.('');
    };

    const getDisplayLabel = () => {
      if (displayValue) return displayValue;
      return selectedOption?.label || 'Select...';
    };

    // Default trigger button
    const defaultTrigger = (
      <Button
        variant="outline"
        size={size}
        className={cn(
          'w-full justify-between text-left font-normal',
          !value && 'text-muted-foreground',
          className
        )}
      >
        <span className="truncate">{getDisplayLabel()}</span>
        <div className="flex items-center gap-1">
          {allowClear && value && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-(--color-primary) focus:ring-2 focus:ring-inset"
            >
              ✕
            </button>
          )}
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </div>
      </Button>
    );

    const widthClass = `w-[${popoverWidth}px]`;

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
        <PopoverTrigger asChild>{trigger || defaultTrigger}</PopoverTrigger>
        <PopoverContent align={align} className={cn('p-0', widthClass)}>
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup heading={heading}>
                {filteredData.map((item, index) => {
                  const isSelected = item.value === value;
                  return (
                    <CommandItem
                      key={`${item.value}-${index}`}
                      value={item.value}
                      onSelect={handleSelect}
                      disabled={item.disabled}
                      className={cn(
                        'cursor-pointer',
                        isSelected && 'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]'
                      )}
                    >
                      {item.icon && <span className="mr-2 shrink-0">{item.icon}</span>}
                      <span className="flex-1 truncate">{formatLabel(item.label)}</span>
                      {showCheckIcon && isSelected && (
                        <CheckIcon className="ml-auto size-4 shrink-0 text-(--color-primary)" />
                      )}
                      {item.shortcut && (
                        <span className="ml-auto text-muted-foreground text-xs">
                          {item.shortcut}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

CommandPopover.displayName = 'CommandPopover';

export default CommandPopover;
