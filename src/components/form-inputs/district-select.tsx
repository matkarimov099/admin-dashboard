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
import { districts, getDistrictsByRegion, type District } from '@/data/districts';
import { cn } from '@/utils/utils.ts';

// ============================================================================
// Types
// ============================================================================

export interface DistrictSelectProps
  extends Omit<React.ComponentProps<typeof Popover>, 'onChange' | 'value'> {
  /**
   * Currently selected district code
   */
  value?: string;

  /**
   * Callback when selection changes (returns district code)
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
   * CSS class for the component
   */
  className?: string;

  /**
   * Whether to group districts by region
   */
  groupByRegion?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const DistrictSelect = React.forwardRef<
  React.ElementRef<typeof Popover>,
  DistrictSelectProps
>(
  (
    {
      value,
      onChange,
      trigger,
      size = 'default',
      placeholder = 'Tumanni qidirish...',
      emptyText = 'Tuman topilmadi.',
      displayValue,
      popoverWidth = 450,
      align = 'start',
      showCheckIcon = true,
      allowClear = false,
      onClear,
      closeOnSelect = true,
      className,
      groupByRegion = true,
      open,
      onOpenChange,
      ...props
    },
    _ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isOpen = open !== undefined ? open : internalOpen;
    const handleOpenChange = (newOpen: boolean) => {
      onOpenChange?.(newOpen);
      setInternalOpen(newOpen);
    };

    const selectedOption = districts.find(item => item.code === value);

    // Filter data by search query (search in name and code)
    const filteredData = React.useMemo(() => {
      if (!searchQuery.trim()) return districts;
      const query = searchQuery.toLowerCase();
      return districts.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query) ||
          item.region.toLowerCase().includes(query)
      );
    }, [searchQuery]);

    // Group filtered data by region
    const groupedData = React.useMemo(() => {
      if (!groupByRegion) return null;

      const regionMap = new Map<string, District[]>();
      filteredData.forEach(district => {
        const existing = regionMap.get(district.region) || [];
        existing.push(district);
        regionMap.set(district.region, existing);
      });

      return Array.from(regionMap.entries()).map(([name, items]) => ({
        name,
        districts: items,
      }));
    }, [filteredData, groupByRegion]);

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
      return placeholder || 'Tumanni tanlang...';
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
        <div className="mr-3 flex flex-1 items-center gap-2 truncate">{getDisplayLabel()}</div>
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
            <CommandList className="max-h-80">
              <CommandEmpty>{emptyText}</CommandEmpty>
              {groupByRegion && groupedData
                ? groupedData.map(region => (
                    <CommandGroup key={region.name} heading={region.name}>
                      {region.districts.map((item, index) => {
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
                              isSelected &&
                                'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]'
                            )}
                          >
                            <div className="flex flex-1 items-center gap-2">
                              <span className="min-w-18 font-medium text-muted-foreground text-sm">
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
                  ))
                : filteredData.map((item, index) => {
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
                          isSelected &&
                            'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]'
                        )}
                      >
                        <div className="flex flex-1 items-center gap-2">
                          <span className="min-w-18 font-medium text-muted-foreground text-sm">
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

DistrictSelect.displayName = 'DistrictSelect';

export default DistrictSelect;
