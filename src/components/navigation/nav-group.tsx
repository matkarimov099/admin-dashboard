import { useTranslation } from 'react-i18next';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar.tsx';
import type { EnhancedMenuItemConfig, MenuGroupConfig } from '@/config/navigation/types/menu';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';
import { NavCollapse } from './nav-collapse';
import { NavItem } from './nav-item';

interface NavGroupProps {
  group: MenuGroupConfig;
  level?: number;
}

/**
 * NavGroup component for rendering menu groups
 * Based on a cargo-customs NavGroup pattern
 *
 * Groups are top-level sections with headers that contain menu items
 */
export function NavGroup({ group, level = 0 }: NavGroupProps) {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Don't render group label when collapsed to save space
  const showLabel = !isCollapsed;

  return (
    <SidebarGroup
      className={cn('transition-all duration-300', isCollapsed ? 'mb-0 py-0' : 'mb-2 py-0')}
    >
      {showLabel && (
        <SidebarGroupLabel
          className={cn(
            'mb-1 px-2 py-2 font-semibold text-xs uppercase tracking-wide transition-colors duration-150',
            'text-gray-500 dark:text-gray-500'
          )}
        >
          {typeof group.title === 'string' ? t(group.title) : group.title}
        </SidebarGroupLabel>
      )}

      <SidebarMenu className="space-y-0.5 px-0">
        {group.children?.map(item => renderMenuItem(item, level))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

/**
 * Helper function to render menu items based on type
 */
function renderMenuItem(item: EnhancedMenuItemConfig, level: number) {
  switch (item.type) {
    case 'collapse':
      return <NavCollapse key={item.id} item={item} level={level} />;
    case 'item':
      return <NavItem key={item.id} item={item} level={level} />;
    case 'group':
      // Nested groups are treated as collapses in most cases
      return <NavCollapse key={item.id} item={item} level={level} />;
    default:
      console.warn(`Unknown menu item type for item:`, item);
      return null;
  }
}
