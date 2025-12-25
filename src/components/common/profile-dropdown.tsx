import { BadgeCheck, CreditCard, LogOut, Sparkles, User, UserRoundIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthContext } from '@/hooks/use-auth-context';

export function ProfileDropdown() {
  const { t } = useTranslation();
  const { currentUser: user, logout } = useAuthContext();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            data-header-trigger="true"
            className="group relative h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-all duration-200"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <UserRoundIcon className="h-5! w-5! transition-transform duration-200 group-hover:scale-110" />
            </div>
            <span className="sr-only">{t('navigation.profile.title')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" sideOffset={4}>
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
            <DropdownMenuItem asChild>
              <NavLink
                to="/profile"
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2"
              >
                <User className="h-4 w-4" />
                {t('navigation.profile.title')}
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink
                to="/account"
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2"
              >
                <BadgeCheck className="h-4 w-4" />
                {t('navigation.settings.account.title')}
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink
                to="/billing"
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2"
              >
                <CreditCard className="h-4 w-4" />
                {t('navigation.profile.billing')}
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <NavLink
                to="/upgrade"
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2"
              >
                <Sparkles className="h-4 w-4" />
                {t('navigation.profile.upgradePro')}
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="flex cursor-pointer items-center gap-3 px-3 py-2"
          >
            <LogOut className="h-4 w-4" />
            {t('navigation.profile.logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
