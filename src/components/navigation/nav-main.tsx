import {ChevronDown, ChevronRightIcon} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LocalizedNavLink} from '@/components/layout/localized-nav-link.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx';
import {mainMenuItems} from '@/config/navigation/sidebar-menu.tsx';
import {useAuthContext} from '@/hooks/use-auth-context.ts';
import {useCurrentPath} from '@/hooks/use-current-path.ts';
import {useSidebar} from '@/hooks/use-sidebar';
import {cn} from '@/utils/utils';

export function NavMain() {
    const {t} = useTranslation();
    const currentPath = useCurrentPath();
    const {state} = useSidebar();
    const {hasRole} = useAuthContext();
    const isCollapsed = state === 'collapsed';
    const [openItems, setOpenItems] = useState<string[]>([]);

    // Auto-open a menu if it has an active subitem
    useEffect(() => {
        const shouldBeOpen: string[] = [];

        for (const item of mainMenuItems) {
            if (item.items && item.items.length > 0) {
                const hasActiveSubItem = item.items.some(subItem => subItem.url === currentPath);
                if (hasActiveSubItem) {
                    shouldBeOpen.push(item.title);
                }
            }
        }

        // Only update if there's a difference
        if (shouldBeOpen.length > 0) {
            setOpenItems(prev => {
                return [...new Set([...prev, ...shouldBeOpen])];
            });
        }
    }, [currentPath]);

    return (
        <SidebarGroup>
            <SidebarGroupLabel
                className={cn(
                    'px-2 font-semibold text-xs uppercase tracking-wider transition-colors duration-200',
                    isCollapsed ? 'text-transparent' : 'text-gray-600 dark:text-gray-400'
                )}
            >
                {t('common.navigation.menu')}
            </SidebarGroupLabel>

            <SidebarMenu className="space-y-1">
                {mainMenuItems
                    .filter(item => {
                        // For parent items without URL, check if they have any visible subitems
                        if (!item.url || item.url.trim() === '') {
                            // If item has roles restriction, check user has those roles
                            if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
                                return false;
                            }
                            // Check if any subitems are visible
                            if (item.items && item.items.length > 0) {
                                return item.items.some(subItem => {
                                    if (!subItem.roles || subItem.roles.length === 0) return true;
                                    return hasRole(subItem.roles);
                                });
                            }
                            return true;
                        }
                        // For items with URL, check role permissions
                        if (!item.roles || item.roles.length === 0) return true;
                        return hasRole(item.roles);
                    })
                    .map(item => {
                        // Get the current path for comparison
                        const currentPath = location.pathname;

                        // Check if this item or any of its subitems is active
                        const hasActiveSubItem = item.items?.some(subItem => subItem.url === currentPath);
                        const isDirectlyActive = item.url && item.url !== '' && item.url === currentPath;
                        const isParentActive = hasActiveSubItem || isDirectlyActive;
                        const hasSubItems = item.items && item.items.length > 0;
                        // For collapsed sidebar with subitems
                        if (isCollapsed && hasSubItems && (!item.url || item.url.trim() === '')) {
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={t(item.title)}
                                                className={cn(
                                                    'relative h-9 w-9 rounded-lg p-0 transition-all duration-200',
                                                    'text-gray-800 hover:bg-(--color-primary)! hover:text-white! dark:text-gray-200',
                                                    isParentActive &&
                                                    'font-semibold! text-(--color-primary)! hover:bg-(--color-primary-hover)!'
                                                )}
                                            >
                                                <div className="flex items-center justify-center">{item.icon}</div>
                                            </SidebarMenuButton>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="right"
                                            align="start"
                                            className="w-48 rounded-lg p-2 shadow-lg"
                                        >
                                            <div className="mb-2 border-(--sidebar-border) border-b pb-2">
                                                <div
                                                    className="flex items-center gap-2 px-1 font-medium text-gray-800 text-sm dark:text-gray-200">
                                                    {t(item.title)}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
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
                                                            <LocalizedNavLink
                                                                key={subItem.title}
                                                                to={subItem.url}
                                                                className="group block"
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-200',
                                                                        'text-gray-700 hover:bg-(--color-primary) hover:text-white dark:text-gray-200',
                                                                        isSubActive && 'font-semibold text-(--color-primary)'
                                                                    )}
                                                                >
                                                                    {t(subItem.title)}
                                                                </div>
                                                            </LocalizedNavLink>
                                                        );
                                                    })}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </SidebarMenuItem>
                            );
                        }

                        // For regular items (with or without subitems)
                        const isOpen = openItems.includes(item.title);

                        const toggleOpen = () => {
                            setOpenItems(prev =>
                                prev.includes(item.title)
                                    ? prev.filter(id => id !== item.title)
                                    : [...prev, item.title]
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
                                                'text-gray-700 dark:text-gray-200 hover:!bg-[var(--color-primary)] hover:!text-white',

                                                // ACTIVE holat
                                                isDirectlyActive &&
                                                [
                                                    // light mode → ochiq havorang
                                                    'bg-blue-100 text-[var(--color-primary)] font-semibold',

                                                    // dark mode → qora / to‘q fon
                                                    'dark:bg-black/50 dark:text-[var(--color-primary)]',

                                                    // hover paytida
                                                    'hover:!bg-[var(--color-primary-hover)]'
                                                ],

                                                // collapsed holat
                                                isCollapsed && 'w-9 justify-center p-0'
                                            )}
                                        >
                                            <div
                                                className={cn('flex items-center gap-2', isCollapsed && 'justify-center')}
                                            >
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
                                            isParentActive && '!text-[var(--color-primary)] !font-semibold hover:!bg-[var(--color-primary-hover)]',
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
                                                    className={cn(
                                                        'h-4 w-4 transition-transform duration-300',
                                                        isOpen && 'rotate-180'
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </SidebarMenuButton>
                                )}

                                {/* Subitems for expanded sidebar */}
                                {!isCollapsed && hasSubItems && isOpen && (
                                    <div>
                                        <SidebarMenuSub
                                            className="ml-4 space-y-1 border-(--sidebar-border) border-l pl-3">
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
                                                                    isSubActive && '!text-[var(--color-primary)] !font-semibold hover:!bg-[var(--color-primary-hover)]'
                                                                )}
                                                            >
                                                                <LocalizedNavLink to={subItem.url}>
                                  <span className="flex items-center gap-0.5 text-sm">
                                    <ChevronRightIcon className="size-4"/>
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
                    })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
