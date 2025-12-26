import {BadgeCheck, CreditCard, LogOut, Sparkles, User, UserRoundIcon} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {NavLink} from 'react-router';
import AvatarImg from "../../assets/images/logo/hacker.png";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useAuthContext} from '@/hooks/use-auth-context';

export function ProfileDropdown() {
    const {t} = useTranslation();
    const {currentUser: user, logout} = useAuthContext();

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-colors duration-200 hover:border-(--color-primary)/30 hover:bg-muted/50"
                    >
                        <div className="relative flex h-full w-full items-center justify-center">
                            <User className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"/>
                        </div>
                        <span className="sr-only">{t('common.entities.profile')} {t('common.ui.menu')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80" sideOffset={4}>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-left">
                            <Avatar className="h-9 w-9 shrink-0 rounded-lg">
                                <AvatarImage src={AvatarImg} alt={user?.firstName}/>
                                <AvatarFallback className="rounded-lg">
                                    {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid min-w-0 flex-1">
                                <span className="truncate font-semibold text-base">
                                  {/*{`${user?.firstName} ${user?.lastName}`}*/} Soatov Sanjar Safarovich
                                </span>
                                <span className="truncate text-sm text-foreground-muted">
                                    {user?.username}
                                    Adminstrator DBK (Dasturchi)
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <NavLink
                                to="/profile"
                                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2"
                            >
                                <User className="h-4 w-4"/>
                                {t('profile.title')}
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-3 py-2">
                            <BadgeCheck className="h-4 w-4"/>
                            {t('common.entities.account')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-3 py-2">
                            <CreditCard className="h-4 w-4"/>
                            {t('common.table.billing')}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-3 py-2">
                            <Sparkles className="h-4 w-4"/>
                            {t('common.table.upgradePro')}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        onClick={logout}
                        className="flex cursor-pointer items-center gap-3 px-3 py-2"
                    >
                        <LogOut className="h-4 w-4"/>
                        {t('common.actions.logout')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
