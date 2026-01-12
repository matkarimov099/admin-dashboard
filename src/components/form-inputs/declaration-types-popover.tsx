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

export interface DeclarationTypeOption {
  code: string;
  type: string;
  name: string;
  npa?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  className?: string;
}

export interface DeclarationTypesPopoverProps
  extends Omit<React.ComponentProps<typeof Popover>, 'onChange' | 'value'> {
  /**
   * Array of declaration type options to display in the command menu
   */
  data: DeclarationTypeOption[];

  /**
   * Currently selected declaration type code
   */
  value?: string;

  /**
   * Callback when selection changes (returns declaration type code)
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

  /**
   * Whether to show NPA (normative legal act) information
   */
  showNpa?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const DeclarationTypesPopover = React.forwardRef<
  React.ElementRef<typeof Popover>,
  DeclarationTypesPopoverProps
>(
  ({
    data = [],
    value,
    onChange,
    trigger,
    size = 'default',
    placeholder = 'Search declaration type...',
    heading,
    emptyText = 'No declaration type found.',
    displayValue,
    popoverWidth = 400,
    align = 'center',
    showCheckIcon = true,
    allowClear = false,
    onClear,
    closeOnSelect = true,
    className,
    showNpa = false,
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

    const selectedOption = data.find(item => item.code === value);

    // Filter data by search query (search in type, name, and code)
    const filteredData = React.useMemo(() => {
      if (!searchQuery.trim()) return data;
      const query = searchQuery.toLowerCase();
      return data.filter(
        item =>
          item.type.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query)
      );
    }, [data, searchQuery]);

    const handleSelect = (selectedValue: string) => {
      // Extract the actual code from the unique value (format: "code-type" or "code")
      const selectedCode = selectedValue.split('-')[0];

      // If clicking the same value and allowClear is enabled, clear it
      if (allowClear && selectedCode === value) {
        onClear?.();
        onChange?.('');
        return;
      }

      onChange?.(selectedCode);
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
      if (selectedOption) {
        return `${selectedOption.type} ${selectedOption.code} ${selectedOption.name}`;
      }
      return 'Select declaration type...';
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
        <PopoverContent align={align} className={cn('min-w-md p-0', widthClass)}>
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup heading={heading}>
                {filteredData.map((item, index) => {
                  const isSelected = item.code === value;
                  // Use unique value combining code and type to avoid hover conflicts
                  const uniqueValue = `${item.code}-${item.type}`;
                  return (
                    <CommandItem
                      key={`${item.code}-${index}`}
                      value={uniqueValue}
                      onSelect={handleSelect}
                      disabled={item.disabled}
                      className={cn(
                        'cursor-pointer rounded-md p-2! text-sm',
                        'transition-colors duration-150',
                        'data-[selected=true]:bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]',
                        'hover:bg-muted/50',
                        isSelected && 'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]',
                        'p-1'
                      )}
                    >
                      {item.icon && <span className="mr-2 shrink-0">{item.icon}</span>}
                      <div className="flex flex-1 items-center gap-2">
                        <span className="min-w-7.5 font-bold text-sm">{item.type}</span>
                        <span className="min-w-6.25 font-medium text-muted-foreground text-sm">
                          {item.code}
                        </span>
                        <span className="text-sm">
                          {item.name}
                          {showNpa && item.npa && (
                            <span className="text-muted-foreground text-xs"> ({item.npa})</span>
                          )}
                        </span>
                      </div>
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

DeclarationTypesPopover.displayName = 'DeclarationTypesPopover';

export default DeclarationTypesPopover;
