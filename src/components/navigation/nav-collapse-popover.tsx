import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import type { MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

interface NavCollapsePopoverProps {
  item: MenuItemConfig;
  titleText: string | React.ReactNode;
  tooltipText?: string;
  isParentActive: boolean;
  renderChildren: (children: MenuItemConfig[]) => React.ReactNode;
  visibleChildren: MenuItemConfig[];
}

/**
 * NavCollapsePopover - Collapsed sidebar popover component
 *
 * Features:
 * - Shown when sidebar is collapsed
 * - Displays menu item children in a popover
 * - Hover-triggered popover
 * - Active state indication
 * - Custom header with icon and title
 */
export function NavCollapsePopover({
  item,
  titleText,
  tooltipText,
  isParentActive,
  renderChildren,
  visibleChildren,
}: NavCollapsePopoverProps) {
  return (
    <SidebarMenuItem>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton
            tooltip={tooltipText}
            className={cn(
              'relative size-9 rounded-md p-0 transition-all duration-200',
              'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
              'hover:!text-gray-700 dark:hover:!text-white text-gray-700 dark:text-gray-200'
            )}
          >
            <div
              className={cn(
                'flex size-5 items-center justify-center transition-colors duration-200',
                isParentActive && 'text-[var(--color-primary)]',
                !isParentActive && 'text-gray-500 dark:text-gray-400'
              )}
            >
              {item.icon}
            </div>
          </SidebarMenuButton>
        </PopoverTrigger>

        <PopoverContent
          side="right"
          align="start"
          className="w-56 rounded-lg border border-gray-200 p-2 shadow-lg dark:border-gray-700"
        >
          {/* Popover header */}
          <div className="mb-2 border-gray-200 border-b pb-2 dark:border-gray-700">
            <div className="flex items-center gap-2 px-1.5 py-1.5 text-xs">
              {item.icon && (
                <span className="flex size-4.5 shrink-0 items-center justify-center text-gray-500 dark:text-gray-400">
                  {item.icon}
                </span>
              )}
              <span className="font-semibold text-gray-700 uppercase tracking-wide dark:text-gray-300">
                {titleText}
              </span>
            </div>
          </div>

          {/* Popover children */}
          <div className="space-y-1">{renderChildren(visibleChildren)}</div>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  );
}
