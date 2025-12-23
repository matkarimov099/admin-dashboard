import type * as React from 'react';
import { useLocation } from 'react-router';
import { LocalizedNavLink } from '@/components/layout/localized-nav-link.tsx';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { footerMenuItems } from '@/config/navigation/modules';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import type { MenuGroupConfig, MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

export function NavSecondary({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarGroup className={cn('transition-all duration-200')} {...props}>
      <SidebarGroupContent>
        <SidebarMenu className={cn('space-y-1')}>
          {footerMenuItems.items
            .filter((item: MenuItemConfig | MenuGroupConfig): item is MenuItemConfig => {
              // Filter out MenuGroupConfig items (they don't have a path)
              return item.type !== 'group';
            })
            .filter((item: MenuItemConfig) => {
              // If an item has no roles specified, it's visible to all
              if (!item.roles || item.roles.length === 0) return true;
              // Check if a user has any of the required roles
              return hasRole(item.roles);
            })
            .map((item: MenuItemConfig) => {
              const currentPath = location.pathname;
              const isActive = item.path ? item.path === currentPath : false;
              return (
                <SidebarMenuItem key={item.id}>
                  <LocalizedNavLink to={item.path ?? '/'} className="block">
                    <SidebarMenuButton
                      tooltip={
                        isCollapsed
                          ? typeof item.title === 'string'
                            ? item.title
                            : undefined
                          : undefined
                      }
                      className={cn(
                        'relative h-9 w-full rounded-lg px-2 transition-all duration-200',
                        'text-(--sidebar-foreground) hover:bg-blue-500! hover:text-white!',
                        isActive && 'font-semibold! text-blue-500! hover:bg-blue-600!',
                        isCollapsed && 'w-9 justify-center p-0'
                      )}
                    >
                      <div
                        className={cn('flex items-center gap-2', isCollapsed && 'justify-center')}
                      >
                        {item.icon}
                        {!isCollapsed && (
                          <span className="font-medium text-xs">
                            {typeof item.title === 'string' ? item.title : String(item.title)}
                          </span>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </LocalizedNavLink>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
