import type { VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react';
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
import { getLocalizedCountries } from '@/utils/country-helpers.ts';
import { cn } from '@/utils/utils.ts';

// ============================================================================
// Types
// ============================================================================

export interface CountrySelectProps
  extends Omit<React.ComponentProps<typeof Popover>, 'onChange' | 'value'> {
  /**
   * Currently selected country code
   */
  value?: string;

  /**
   * Callback when selection changes (returns country code)
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
   * Locale for country names (en, ru, uz, uzcyrl)
   */
  locale?: string;

  /**
   * Show country flags
   */
  showFlags?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const CountrySelect = React.forwardRef<React.ElementRef<typeof Popover>, CountrySelectProps>(
  ({
    value,
    onChange,
    trigger,
    size = 'default',
    placeholder = 'Search country...',
    heading,
    emptyText = 'No country found.',
    displayValue,
    popoverWidth = 400,
    align = 'center',
    showCheckIcon = true,
    allowClear = false,
    onClear,
    closeOnSelect = true,
    className,
    locale = 'en',
    showFlags = true,
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

    // Get localized countries
    const countries = React.useMemo(() => getLocalizedCountries(locale), [locale]);

    const selectedOption = countries.find(item => item.code === value);

    // Filter data by search query (search in name and code)
    const filteredData = React.useMemo(() => {
      if (!searchQuery.trim()) return countries;
      const query = searchQuery.toLowerCase();
      return countries.filter(
        item => item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query)
      );
    }, [countries, searchQuery]);

    const handleSelect = (selectedCode: string) => {
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
        return `${selectedOption.code} - ${selectedOption.name}`;
      }
      return placeholder || 'Select country...';
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
        <div className="mr-3 flex flex-1 items-center gap-2 truncate">
          {showFlags && selectedOption && (
            <span
              className={`fi fi-${selectedOption.countryId.toLowerCase()}`}
              style={{ fontSize: '1.25em' }}
            />
          )}
          {getDisplayLabel()}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {allowClear && value && (
            <button
              type="button"
              onClick={handleClear}
              className="-translate-y-1/2 absolute top-1/2 right-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-(--color-primary) focus:ring-2 focus:ring-inset"
            >
              <XIcon className="size-4!" />
            </button>
          )}
          {!selectedOption && (
            <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3">
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          )}
        </div>
      </Button>
    );

    const widthClass = `w-[${popoverWidth}px]`;

    // Prevent scroll from propagating to parent (modal)
    const handleWheel = (e: React.WheelEvent) => {
      e.stopPropagation();
    };

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
        <PopoverTrigger asChild>{trigger || defaultTrigger}</PopoverTrigger>
        <PopoverContent
          align={align}
          className={cn('min-w-md p-0', widthClass)}
          onWheel={handleWheel}
        >
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup heading={heading}>
                {filteredData.map((item, index) => {
                  const isSelected = item.code === value;
                  return (
                    <CommandItem
                      key={`${item.code}-${index}`}
                      value={item.code}
                      onSelect={handleSelect}
                      disabled={false}
                      className={cn(
                        'cursor-pointer rounded-md p-2 text-sm',
                        'transition-colors duration-150',
                        'data-[selected=true]:bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]',
                        'hover:bg-muted/50',
                        isSelected && 'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]'
                      )}
                    >
                      <div className="flex flex-1 items-center gap-2">
                        {showFlags && (
                          <span
                            className={`fi fi-${item.countryId.toLowerCase()}`}
                            style={{ fontSize: '1.25em' }}
                          />
                        )}
                        <span className="min-w-8.75 font-medium text-muted-foreground text-sm">
                          {item.code}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {showCheckIcon && isSelected && (
                        <CheckIcon className="ml-auto size-4 shrink-0 text-(--color-primary)" />
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

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;
