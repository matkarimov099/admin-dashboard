import type { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { useTheme } from '@/hooks/use-theme';
import { useThemeConfig } from '@/hooks/use-theme-config';
import type { MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

interface NavCollapsePopoverProps {
  item: MenuItemConfig;
  titleText: string | ReactNode;
  tooltipText?: string;
  isParentActive: boolean;
  renderChildren: (children: MenuItemConfig[]) => ReactNode;
  visibleChildren: MenuItemConfig[];
}

/**
 * NavCollapsePopover - Collapsed sidebar popover component
 *
 * Features:
 * - Shown when the sidebar is collapsed
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
  const { theme } = useTheme();
  const { config } = useThemeConfig();

  // Check if gradient is active (not default and light mode)
  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isGradientActive = !isDarkMode && config.backgroundGradient !== 'default';

  return (
    <SidebarMenuItem>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton
            tooltip={tooltipText}
            className={cn(
              'relative size-9 rounded-md p-0 transition-all duration-200',
              'hover:bg-(--color-primary)/10! dark:hover:bg-(--color-primary)/20!',
              // Gradient active with active child - semi-transparent white background
              isGradientActive && isParentActive && 'bg-white/20! text-white! hover:bg-white/20!',
              // Gradient active without active child - white text, white/10 hover
              isGradientActive && !isParentActive && 'text-white! hover:text-white! hover:bg-white/10!',
              // No gradient
              !isGradientActive && 'text-gray-700 hover:text-gray-700! dark:text-gray-200 dark:hover:text-white!'
            )}
          >
            <div
              className={cn(
                'flex size-5 items-center justify-center transition-colors duration-200',
                // With gradient - always white icon
                isGradientActive && 'text-white!',
                // Without gradient - theme color if active
                !isGradientActive && isParentActive && 'text-(--color-primary)',
                !isGradientActive && !isParentActive && 'text-gray-500 dark:text-gray-400'
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
                <span
                  className={cn(
                    'flex size-4.5 shrink-0 items-center justify-center',
                    isParentActive && 'text-(--color-primary)!',
                    !isParentActive && 'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {item.icon}
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

          {/* Popover children */}
          <div className="space-y-1">{renderChildren(visibleChildren)}</div>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  );
}
