import { ChevronDown, ChevronRightIcon } from 'lucide-react';
import { LocalizedNavLink } from '@/components/layout/localized-nav-link.tsx';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx';
import menuItems from '@/config/navigation/modules';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import type { MenuGroupConfig, MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils.ts';
import { NavCollapse } from './nav-collapse';
import { NavGroup } from './nav-group';
import { NavItem } from './nav-item';

/**
 * NavMain component
 * Main navigation component with support for:
 * - Menu groups with headers
 * - Multi-level nesting (3+ levels)
 * - Collapsible menu items
 * - Role-based access control
 * - Icons, chips, and badges
 * - Breadcrumb control
 * - Auto-expand active items
 */
export function NavMain() {
  const { hasRole } = useAuthContext();

  // Filter menu items based on roles
  const visibleItems = menuItems.items.filter((item: MenuItemConfig | MenuGroupConfig) => {
    if (item.roles && item.roles.length > 0) {
      return hasRole(item.roles);
    }
    return true;
  });

  return <>{visibleItems.map((item: MenuItemConfig | MenuGroupConfig) => renderMenuItem(item))}</>;
}

/**
 * Helper function to render menu items based on type
 */
function renderMenuItem(item: MenuItemConfig | MenuGroupConfig) {
  // Handle groups
  if (item.type === 'group') {
    return <NavGroup key={item.id} group={item as MenuGroupConfig} />;
  }

  const toggleOpen = () => {
    setOpenItems(prev =>
      prev.includes(item.title) ? prev.filter(id => id !== item.title) : [...prev, item.title]
    );
  };

  return (
    <SidebarMenuItem key={item.title}>
      {/* Main item button */}
      {item.url && item.url.trim() !== '' ? (
        // Item with direct URL
        <LocalizedNavLink to={item.url} className="block">
          <SidebarMenuButton
            tooltip={isCollapsed ? t(item.title) : undefined}
            className={cn(
              'relative h-9 w-full rounded-sm px-2 transition-all duration-200',

              // oddiy holat
              'hover:!bg-[var(--color-primary)] hover:!text-white text-gray-900 dark:text-gray-200',

              // ACTIVE holat
              isDirectlyActive && [
                // light mode → ochiq havorang
                'bg-blue-100 font-semibold text-[var(--color-primary)]',

                // dark mode → qora / to‘q fon
                'dark:bg-black/50 dark:text-[var(--color-primary)]',

                // hover paytida
                'hover:!bg-[var(--color-primary-hover)]',
              ],

              // collapsed holat
              isCollapsed && 'w-9 justify-center p-0'
            )}
          >
            <div className={cn('flex items-center gap-2', isCollapsed && 'justify-center')}>
              {item.icon}
              {!isCollapsed && <span className="font-medium">{t(item.title)}</span>}
            </div>
          </SidebarMenuButton>
        </LocalizedNavLink>
      ) : (
        // Item without direct URL (parent only) - acts as a toggle
        <SidebarMenuButton
          onClick={hasSubItems ? toggleOpen : undefined}
          tooltip={isCollapsed ? t(item.title) : undefined}
          className={cn(
            'relative h-9 w-full rounded-sm px-2 transition-all duration-200',
            'hover:!bg-[var(--color-primary)] hover:!text-white text-gray-700 dark:text-gray-200',
            isParentActive &&
              '!text-[var(--color-primary)] !font-semibold hover:!bg-[var(--color-primary-hover)]',
            isCollapsed && 'w-9 justify-center p-0'
          )}
        >
          <div
            className={cn(
              'flex items-center',
              isCollapsed ? 'justify-center' : 'w-full justify-between'
            )}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {!isCollapsed && <span className="font-medium">{t(item.title)}</span>}
            </div>
            {!isCollapsed && hasSubItems && (
              <ChevronDown
                className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
              />
            )}
          </div>
        </SidebarMenuButton>
      )}

      {/* Subitems for expanded sidebar */}
      {!isCollapsed && hasSubItems && isOpen && (
        <div>
          <SidebarMenuSub className="ml-4 space-y-1 border-(--sidebar-border) border-l pl-3">
            {item.items
              ?.filter(subItem => {
                // If no roles specified, visible to all
                if (!subItem.roles || subItem.roles.length === 0) return true;
                // Check if user has required roles
                return hasRole(subItem.roles);
              })
              .map(subItem => {
                const isSubActive = subItem.url === currentPath;
                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      className={cn(
                        'h-8 w-full rounded-sm px-2 transition-colors duration-200',
                        'hover:!bg-[var(--color-primary)] hover:!text-white text-gray-800 dark:text-gray-200',
                        isSubActive &&
                          '!text-[var(--color-primary)] !font-semibold hover:!bg-[var(--color-primary-hover)]'
                      )}
                    >
                      <LocalizedNavLink to={subItem.url}>
                        <span className="flex items-center gap-0.5 text-sm">
                          <ChevronRightIcon className="size-4" />
                          {t(subItem.title)}
                        </span>
                      </LocalizedNavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
          </SidebarMenuSub>
        </div>
      )}
    </SidebarMenuItem>
  );
}

/**
 * Helper function to render individual menu items by type
 */
function renderMenuItemByType(item: MenuItemConfig) {
  switch (item.type) {
    case 'collapse':
      return <NavCollapse key={item.id} item={item} />;
    case 'item':
      return <NavItem key={item.id} item={item} />;
    default:
      // If an item has children but no explicit type, treat as collapse
      if (item.children || item.items) {
        return <NavCollapse key={item.id} item={item} />;
      }
      return <NavItem key={item.id} item={item} />;
  }
}
