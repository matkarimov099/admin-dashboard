import type * as React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/logo.png';
import { NavLink } from '@/components/navigation/nav-link.tsx';
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
import type { SidebarVariant } from '@/config/theme/theme-config.types';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  variant?: SidebarVariant;
}

export function AppSidebar({ variant = 'floating', ...props }: AppSidebarProps) {
  const { t } = useTranslation();
  const { logout, currentUser } = useAuthContext();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      variant={variant}
      collapsible="icon"
      className={cn(
        'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
        'group-data-[state=collapsed]:backdrop-blur-xl'
      )}
      {...props}
    >
      <SidebarHeader
        className={cn(
          'p-2.5 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'flex items-center justify-center px-1.5 py-3'
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Cargo Customs"
              size="lg"
              asChild
              className={cn(
                'group h-9 w-full transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                'hover:border-(--color-primary)/30 hover:bg-(--color-primary)/10!',
                isCollapsed && 'h-9 justify-center px-0'
              )}
            >
              <NavLink
                to="/"
                className={cn(
                  'flex items-center',
                  isCollapsed ? 'justify-center' : 'justify-start gap-2.5'
                )}
              >
                <div
                  className={cn(
                    'relative flex items-center justify-center rounded-md transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                    isCollapsed ? 'size-10' : 'size-10',
                    'shrink-0'
                  )}
                >
                  <img
                    src={logo}
                    alt={t('app.name')}
                    className={cn(
                      'relative z-10 object-contain transition-transform duration-300 group-hover:scale-110',
                      isCollapsed ? 'size-8' : 'size-8'
                    )}
                  />
                </div>

                {!isCollapsed && (
                  <div className="text-left leading-tight transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                    <span className="truncate font-bold text-(--color-primary) text-base tracking-wide">
                      {t('app.name')}
                    </span>
                  </div>
                )}
              </NavLink>
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
