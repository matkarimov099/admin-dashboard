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
 * NavItem - Individual navigation item component
 *
 * Features:
 * - Dynamic theme color support via CSS variables
 * - Active/hover states with proper visual feedback
 * - Light/dark mode support
 * - Collapsed sidebar with tooltip
 * - Popover rendering for nested items
 * - Role-based access control
 * - External link support
 */
export function NavItem({ item, level, inPopover = false }: NavItemProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';

  // Role-based access control
  if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
    return null;
  }

  // Don't render disabled items
  if (item.disabled) {
    return null;
  }

  // Extract item properties
  const itemPath = item.path || item.url || item.link || '';
  const isActive = itemPath === currentPath;
  const isExternalLink = item.external || item.target === '_blank';
  const titleText = typeof item.title === 'string' ? t(item.title) : item.title;

  // Popover rendering (for collapsed sidebar dropdown)
  if (inPopover) {
    return (
      <LocalizedNavLink
        to={itemPath}
        className="block"
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
      >
        <div
          className={cn(
            'flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-200',
            'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
            // Active state - only text color
            isActive && '!text-[var(--color-primary)] font-medium',
            // Inactive state
            !isActive &&
              'hover:!text-gray-700 dark:hover:!text-white text-gray-700 dark:text-gray-200'
          )}
        >
          {item.icon && (
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center transition-colors duration-200',
                isActive && 'text-[var(--color-primary)]',
                !isActive && 'text-gray-500 dark:text-gray-400'
              )}
            >
              {item.icon}
            </span>
          )}

          <span className="flex-1 truncate">{titleText}</span>

          {/* Badge and chip support */}
          {(item.chip || item.badge !== undefined) && (
            <div className="flex shrink-0 items-center gap-1.5">
              {item.chip && (
                <span className="rounded-md bg-[var(--color-primary)]/10 px-1.5 py-0.5 font-medium text-[10px] text-[var(--color-primary)]">
                  {item.chip.label}
                </span>
              )}
              {item.badge !== undefined && (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-red-500 font-semibold text-[10px] text-white">
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </div>
      </LocalizedNavLink>
    );
  }

  // Regular sidebar rendering
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={isCollapsed ? titleText : undefined}
        className={cn(
          'relative h-fit w-full rounded-md transition-all duration-200',
          'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
          // Active state - only text color
          isActive && '!text-[var(--color-primary)] font-medium',
          // Inactive state
          !isActive &&
            'hover:!text-gray-700 dark:hover:!text-white text-gray-700 dark:text-gray-200',
          // Collapsed sidebar specific styles
          isCollapsed ? 'size-9 justify-center p-0' : 'px-2.5'
        )}
      >
        <LocalizedNavLink
          to={itemPath}
          target={isExternalLink ? '_blank' : undefined}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
        >
          <div className={cn('flex w-full items-center gap-2.5', isCollapsed && 'justify-center')}>
            {/* Icon */}
            {item.icon && (
              <span
                className={cn(
                  'flex shrink-0 items-center justify-center transition-colors duration-200',
                  isCollapsed ? 'size-4.5' : 'size-4',
                  isActive && 'text-[var(--color-primary)]',
                  !isActive && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {item.icon}
              </span>
            )}

            {/* Title */}
            {!isCollapsed && <span className="flex-1 font-medium text-[13px]">{titleText}</span>}

            {/* Badges and chips (only when expanded) */}
            {!isCollapsed && (item.chip || item.badge !== undefined) && (
              <div className="flex shrink-0 items-center gap-1.5">
                {item.chip && (
                  <span className="rounded-md bg-[var(--color-primary)]/10 px-1.5 py-0.5 font-medium text-[10px] text-[var(--color-primary)]">
                    {item.chip.label}
                  </span>
                )}
                {item.badge !== undefined && (
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-red-500 font-semibold text-[10px] text-white">
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
