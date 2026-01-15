import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import type { CurrentUser } from '@/features/auth/types.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { useTheme } from '@/hooks/use-theme';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';
import { NavLink } from './nav-link.tsx';

interface NavUserProps {
  user?: CurrentUser | null;
  logout: () => void;
}
export function NavUser({ user, logout }: NavUserProps) {
  const { t } = useTranslation();
  const { isMobile, state } = useSidebar();
  const { theme } = useTheme();
  const { config } = useThemeConfig();
  const isCollapsed = state === 'collapsed';

  // Check if gradient is active (not default and light mode)
  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isGradientActive = !isDarkMode && config.backgroundGradient !== 'default';

  return (
    <div
      className={cn(
        'relative',
        'before:-top-3 before:absolute before:inset-x-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-(--border)/50 before:to-transparent'
      )}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={isCollapsed ? 'sm' : 'lg'}
                className={cn(
                  'group relative cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                  // Gradient active - white/10 hover and open state
                  isGradientActive && 'hover:bg-white/10! data-[state=open]:bg-white/20!',
                  // No gradient - default styling
                  !isGradientActive && 'hover:bg-(--color-primary)/10! hover:border-(--color-primary)/30 data-[state=open]:border-(--color-primary)/40 data-[state=open]:bg-(--control-ghost-bg)',
                  isCollapsed && 'h-9 w-9 justify-center p-0'
                )}
              >
                <div className="relative">
                  <Avatar
                    className={cn(
                      'h-9 w-9 rounded-lg border border-(--border)/30 transition-all duration-200',
                      isCollapsed && 'h-8 w-8'
                    )}
                  >
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback
                      className={cn(
                        'flex items-center justify-center rounded-lg bg-linear-to-br from-(--color-primary)/10 to-(--color-primary)/5 font-semibold text-(--color-primary)',
                        isCollapsed && 'text-xs'
                      )}
                    >
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() ||
                        'SU'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {!isCollapsed && (
                  <>
                    <div className="grid flex-1 text-left font-sans text-sm leading-tight transition-all duration-300">
                      <span className={cn(
                        'truncate font-medium',
                        isGradientActive ? 'text-white!' : 'text-(--label)'
                      )}>
                        {user?.firstName || 'First Name'}
                      </span>
                      <span className={cn(
                        'truncate text-xs',
                        isGradientActive ? 'text-white/70!' : 'text-(--secondaryLabel)'
                      )}>
                        {user?.lastName || 'Last Name'}
                      </span>
                    </div>
                    <ChevronsUpDown className={cn(
                      'ml-auto size-4 transition-colors',
                      isGradientActive ? 'text-white/70! group-hover:text-white!' : 'text-(--tertiaryLabel) group-hover:text-(--secondaryLabel)'
                    )} />
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                  <Avatar className="h-9 w-9 shrink-0 rounded-lg">
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback className="rounded-lg">
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {`${user?.firstName} ${user?.lastName}`}
                    </span>
                    <span className="truncate text-xs">{user?.username}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  {t('navigation.profile.upgradePro')}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <NavLink to="/profile">
                  <DropdownMenuItem>
                    <BadgeCheck />
                    {t('navigation.profile.title')}
                  </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem>
                  <CreditCard />
                  {t('navigation.profile.billing')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  {t('navigation.notifications.title')}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                {t('navigation.profile.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
