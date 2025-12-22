import { Network, Zap } from 'lucide-react';
import type * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LocalizedNavLink } from '@/components/layout/localized-nav-link';
import { NavMain } from '@/components/navigation/nav-main.tsx';
import { NavSecondary } from '@/components/navigation/nav-secondary.tsx';
import { NavUser } from '@/components/navigation/nav-user.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { logout, currentUser } = useAuthContext();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={cn(
        'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
        'group-data-[state=collapsed]:backdrop-blur-xl'
      )}
      {...props}
    >
      <SidebarHeader
        className={cn(
          'p-3 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'flex items-center justify-center p-1.5'
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              asChild
              className={cn(
                'group h-11 w-full transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                'hover:bg-sidebar-accent',
                isCollapsed && 'h-11 w-11 justify-center px-0'
              )}
            >
              <LocalizedNavLink
                to="/"
                className={cn(
                  'flex items-center',
                  isCollapsed ? 'justify-center' : 'justify-start gap-2.5'
                )}
              >
                <div
                  className={cn(
                    'relative flex items-center justify-center rounded-md transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                    isCollapsed ? 'size-7' : 'size-8',
                    'shrink-0 bg-(--color-primary)'
                  )}
                >
                  {/* Dynamic icon based on the collapse state */}
                  {isCollapsed ? (
                    <Zap className="relative z-10 size-4 text-white transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <Network className="relative z-10 size-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>

                {!isCollapsed && (
                  <div className="text-left leading-tight transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                    <span className="truncate font-bold font-sans text-(--color-primary) text-base tracking-wide">
                      {t('app.name')}
                    </span>
                  </div>
                )}
              </LocalizedNavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          'px-1.5 pt-2 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'px-1.5'
        )}
      >
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>

      <SidebarFooter
        className={cn(
          'p-2 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'items-center justify-center p-2'
        )}
      >
        <NavUser user={currentUser} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
