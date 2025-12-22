import { useTranslation } from 'react-i18next';
import { LocalizedNavLink } from '@/components/layout/localized-nav-link.tsx';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import type { EnhancedMenuItemConfig } from '@/config/navigation/types/menu';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

interface NavItemProps {
  item: EnhancedMenuItemConfig;
  level: number;
  inPopover?: boolean;
}

/**
 * NavItem component for rendering individual menu items
 * Based on a cargo-customs NavItem pattern
 *
 * Supports:
 * - Icons
 * - Active state detection
 * - Role-based access control
 * - Tooltips when collapsed
 * - Multi-level indentation
 * - Chips/badges (future enhancement)
 */
export function NavItem({ item, level, inPopover = false }: NavItemProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';

  // Check if user has permission to view this item
  if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
    return null;
  }

  // Check if disabled
  if (item.disabled) {
    return null;
  }

  const itemPath = item.path || item.url || item.link || '';
  const isActive = itemPath === currentPath;
  const isExternalLink = item.external || item.target === '_blank';

  const titleText = typeof item.title === 'string' ? t(item.title) : item.title;

  // For popover rendering (when sidebar is collapsed)
  if (inPopover) {
    return (
      <LocalizedNavLink
        to={itemPath}
        className="group block"
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
      >
        <div
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-200',
            'text-gray-700 dark:text-gray-200',
            'hover:bg-blue-50 hover:text-blue-600',
            'dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
            isActive &&
              'bg-blue-100 font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
          )}
        >
          {item.icon && <span className="size-3 shrink-0">{item.icon}</span>}
          <span className="flex-1">{titleText}</span>
          {item.chip && (
            <span className="rounded bg-blue-100 px-1 py-0.5 font-medium text-[10px] text-blue-800">
              {item.chip.label}
            </span>
          )}
          {item.badge !== undefined && (
            <span className="flex size-4 items-center justify-center rounded-full bg-red-500 font-semibold text-[10px] text-white">
              {item.badge}
            </span>
          )}
        </div>
      </LocalizedNavLink>
    );
  }

  // For regular rendering in sidebar
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={isCollapsed ? undefined : undefined}
        className={cn(
          'relative h-fit w-full rounded-md transition-all duration-200',
          'text-gray-700 text-sm dark:text-gray-200',
          'hover:bg-blue-50 hover:text-blue-600',
          'dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
          isActive &&
            'bg-blue-100 font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
          isCollapsed && 'h-9 w-9 justify-center p-0',
          !isCollapsed && 'px-2'
        )}
      >
        <LocalizedNavLink
          to={itemPath}
          target={isExternalLink ? '_blank' : undefined}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
        >
          <div className={cn('flex w-full items-center gap-2', isCollapsed && 'justify-center')}>
            {/* Icon */}
            {!isCollapsed && item.icon && (
              <span className="flex size-4.5 shrink-0 items-center justify-center text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                {item.icon}
              </span>
            )}

            {/* Icon when collapsed */}
            {isCollapsed && item.icon && (
              <span className="flex size-4 shrink-0 items-center justify-center text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                {item.icon}
              </span>
            )}

            {/* Title */}
            {!isCollapsed && (
              <span className="font-medium text-[13px]" title={undefined}>
                {titleText}
              </span>
            )}

            {/* Right side: Chip/Badge */}
            {!isCollapsed && (item.chip || item.badge !== undefined) && (
              <div className="flex shrink-0 items-center gap-1">
                {item.chip && (
                  <span
                    className={cn(
                      'rounded px-1 py-0.5 font-medium text-[10px]',
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    )}
                  >
                    {item.chip.label}
                  </span>
                )}
                {item.badge !== undefined && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-red-500 font-semibold text-[10px] text-white">
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </div>
        </LocalizedNavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
