import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar.tsx';
import menuItems from '@/config/navigation/modules';
import type { MenuGroupConfig, MenuItemConfig } from '@/config/navigation/types/menu';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
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
  const visibleItems = menuItems.items.filter(item => {
    if (item.roles && item.roles.length > 0) {
      return hasRole(item.roles);
    }
    return true;
  });

  return <>{visibleItems.map(item => renderMenuItem(item))}</>;
}

/**
 * Helper function to render menu items based on type
 */
function renderMenuItem(item: MenuItemConfig | MenuGroupConfig) {
  // Handle groups
  if (item.type === 'group') {
    return <NavGroup key={item.id} group={item as MenuGroupConfig} />;
  }

  // Handle non-group items at top level
  // For top-level items that are not groups, wrap them in a SidebarGroup
  return (
    <SidebarGroup key={item.id} className="mb-0 py-0">
      <SidebarMenu className="space-y-0.5 px-0">
        {renderMenuItemByType(item as MenuItemConfig)}
      </SidebarMenu>
    </SidebarGroup>
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
