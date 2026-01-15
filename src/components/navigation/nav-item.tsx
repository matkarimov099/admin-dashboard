import { useTranslation } from 'react-i18next';
import { NavLink } from '@/components/navigation/nav-link.tsx';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { useTheme } from '@/hooks/use-theme';
import { useThemeConfig } from '@/hooks/use-theme-config';
import type { MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

interface NavItemProps {
  item: MenuItemConfig;
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
export function NavItem({ item, inPopover = false }: NavItemProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { hasRole } = useAuthContext();
  const { theme } = useTheme();
  const { config } = useThemeConfig();
  const isCollapsed = state === 'collapsed';

  // Check if gradient is active (not default and light mode)
  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isGradientActive = !isDarkMode && config.backgroundGradient !== 'default';

  // Close the sidebar on mobile when clicking a link
  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

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
  const tooltipText = typeof item.title === 'string' ? t(item.title) : undefined;

  // Popover rendering (for collapsed sidebar dropdown)
  if (inPopover) {
    return (
      <NavLink
        to={itemPath}
        className="block"
        onClick={handleClick}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
      >
        <div
          className={cn(
            'flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-200',
            'hover:bg-(--color-primary)/10! dark:hover:bg-(--color-primary)/20!',
            // Active state - theme color text
            isActive && 'font-bold text-(--color-primary)! hover:text-(--color-primary)!',
            // Inactive state
            !isActive && 'text-gray-700 hover:text-gray-700! dark:text-white dark:hover:text-white!'
          )}
        >
          {item.icon && (
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center transition-colors duration-200',
                // Active - theme color
                isActive && 'text-(--color-primary) hover:text-(--color-primary)! dark:text-(--color-primary)!',
                // Inactive
                !isActive && 'dark:text-white hover:text-current'
              )}
            >
              {item.icon}
            </span>
          )}

          <span className="flex-1">
            {titleText}
          </span>

          {/* Badge and chip support */}
          {(item.chip || item.badge !== undefined) && (
            <div className="flex shrink-0 items-center gap-1.5">
              {item.chip && (
                <span className="rounded-md bg-(--color-primary)/10 px-1.5 py-0.5 font-medium text-(--color-primary) text-[10px]">
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
      </NavLink>
    );
  }

  // Regular sidebar rendering
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={isCollapsed ? tooltipText : undefined}
        className={cn(
          'relative h-fit w-full rounded-md transition-all duration-200',
          'hover:bg-(--color-primary)/10! dark:hover:bg-(--color-primary)/20!',
          // Active state with gradient - semi-transparent white background, white text
          isActive && isGradientActive && 'bg-white/20! font-medium text-white! hover:bg-white/20!',
          // Active state without gradient - only text color
          isActive && !isGradientActive && 'font-medium text-(--color-primary)! hover:text-(--color-primary)!',
          // Inactive state with gradient - white text
          !isActive && isGradientActive && 'text-white! hover:text-white! hover:bg-white/10!',
          // Inactive state without gradient
          !isActive && !isGradientActive && 'text-gray-700 hover:text-gray-700! dark:text-white dark:hover:text-white!',
          // Collapsed sidebar specific styles
          isCollapsed ? 'size-9 justify-center p-0' : 'px-2.5'
        )}
      >
        <NavLink
          to={itemPath}
          onClick={handleClick}
          target={isExternalLink ? '_blank' : undefined}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
        >
          <div className={cn('flex w-full items-center gap-2.5', isCollapsed && 'justify-center')}>
            {/* Icon */}
            {item.icon && (
              <span
                className={cn(
                  'flex shrink-0 items-center justify-center transition-colors duration-200',
                  isCollapsed ? 'size-6' : 'size-5',
                  // With gradient - always white
                  isGradientActive && 'text-white!',
                  // Active without gradient
                  !isGradientActive && isActive && 'text-(--color-primary) hover:text-(--color-primary)!',
                  // Inactive without gradient
                  !isGradientActive && !isActive && 'hover:text-current'
                )}
              >
                {item.icon}
              </span>
            )}

            {/* Title */}
            {!isCollapsed && (
              <span
                className={cn(
                  'flex-1 font-bold',
                  isGradientActive && 'text-white!'
                )}
              >
                {titleText}
              </span>
            )}

            {/* Badges and chips (only when expanded) */}
            {!isCollapsed && (item.chip || item.badge !== undefined) && (
              <div className="flex shrink-0 items-center gap-1.5">
                {item.chip && (
                  <span className="rounded-md bg-(--color-primary)/10 px-1.5 py-0.5 font-medium text-(--color-primary) text-[10px]">
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
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
