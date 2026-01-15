import { ChevronDown } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import type { MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

interface NavPopoverNestedProps {
  child: MenuItemConfig;
  t: (key: string) => string;
  renderChildren: (children: MenuItemConfig[]) => ReactNode;
}

/**
 * NavPopoverNested - Nested popover item component
 *
 * Features:
 * - State management for popover open/close
 * - Chevron rotation animation
 * - Nested popover support (recursive)
 * - Hover effects matching menu items
 */
export function NavPopoverNested({ child, t, renderChildren }: NavPopoverNestedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = useCurrentPath();
  const nestedChildren = child.children || child.items || [];
  const titleText = typeof child.title === 'string' ? t(child.title) : child.title;

  // Check if any child is active (recursive)
  const hasActiveChild = (items: MenuItemConfig[]): boolean => {
    return items.some(item => {
      const itemPath = item.path || item.url || item.link || '';
      if (itemPath === currentPath) return true;
      const children = item.children || item.items || [];
      if (children.length > 0) return hasActiveChild(children);
      return false;
    });
  };

  const isParentActive = hasActiveChild(nestedChildren);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex cursor-pointer items-center justify-between gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-200',
            'hover:bg-(--color-primary)/10! dark:hover:bg-(--color-primary)/20!',
            // Parent active - theme color background and text
            isParentActive && 'bg-(--color-primary)/10! text-(--color-primary)! font-bold',
            // Inactive
            !isParentActive && 'text-gray-700 hover:text-gray-700! dark:text-gray-200 dark:hover:text-white!'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {child.icon && (
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center',
                  isParentActive && 'text-(--color-primary)!',
                  !isParentActive && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {child.icon}
              </span>
            )}
            <span className="flex-1">{titleText}</span>
          </div>
          <ChevronDown
            className={cn(
              'size-4.5 shrink-0 transition-transform duration-200',
              isParentActive && 'text-(--color-primary)!',
              !isParentActive && 'text-gray-400 dark:text-gray-500',
              isOpen ? 'rotate-0' : '-rotate-90'
            )}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        className="w-56 rounded-lg border border-gray-200 p-2 shadow-lg dark:border-gray-700"
      >
        {/* Nested popover header */}
        <div className="mb-2 border-gray-200 border-b pb-2 dark:border-gray-700">
          <div className="flex items-center gap-2 px-1.5 py-1.5 text-xs">
            {child.icon && (
              <span
                className={cn(
                  'flex size-4.5 shrink-0 items-center justify-center',
                  isParentActive && 'text-(--color-primary)!',
                  !isParentActive && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {child.icon}
              </span>
            )}
            <span
              className={cn(
                'font-semibold uppercase tracking-wide',
                isParentActive && 'text-(--color-primary)!',
                !isParentActive && 'text-gray-700 dark:text-gray-300'
              )}
            >
              {titleText}
            </span>
          </div>
        </div>

        {/* Nested popover children */}
        <div className="space-y-1">{renderChildren(nestedChildren)}</div>
      </PopoverContent>
    </Popover>
  );
}
