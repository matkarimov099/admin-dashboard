import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { SidebarMenuItem } from '@/config/navigation/sidebar-menu';
import { mainMenuItems } from '@/config/navigation/sidebar-menu.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import { cn } from '@/utils/utils';

export function HorizontalNav() {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { hasRole } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter menu items based on roles
  const filteredMenuItems = mainMenuItems.filter(item => {
    // For parent items without URL, check if they have any visible subitems
    if (!item.url || item.url.trim() === '') {
      // If an item has roles restriction, check the user has those roles
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
  });

  // Check if this item or any of its subitems is active
  const isItemActive = (item: SidebarMenuItem) => {
    const hasActiveSubItem = item.items?.some(subItem => subItem.url === currentPath);
    const isDirectlyActive = item.url && item.url !== '' && item.url === currentPath;
    return hasActiveSubItem || isDirectlyActive;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center space-x-1 md:flex">
        {filteredMenuItems.map(item => {
          const hasSubItems = item.items && item.items.length > 0;
          const isActive = isItemActive(item);

          if (hasSubItems && (!item.url || item.url.trim() === '')) {
            // Dropdown menu for items with subitems but no direct URL
            return (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'h-9 gap-2 px-3 transition-colors',
                      isActive && 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{t(item.title)}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.items
                    ?.filter(subItem => {
                      if (!subItem.roles || subItem.roles.length === 0) return true;
                      return hasRole(subItem.roles);
                    })
                    .map(subItem => {
                      const isSubActive = subItem.url === currentPath;
                      return (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <NavLink
                            to={subItem.url}
                            className={cn(
                              'flex w-full cursor-pointer items-center gap-2',
                              isSubActive &&
                                'bg-(--color-primary)/10 font-semibold text-(--color-primary)'
                            )}
                          >
                            <span>{t(subItem.title)}</span>
                          </NavLink>
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          // Regular navigation link
          return (
            <Button
              key={item.title}
              asChild
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'h-9 gap-2 px-3 transition-colors',
                isActive && 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
              )}
            >
              <NavLink to={item.url || '#'}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{t(item.title)}</span>
                </div>
              </NavLink>
            </Button>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('common.navigation.menu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-semibold text-lg">{t('common.navigation.menu')}</h2>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {filteredMenuItems.map(item => {
                  const hasSubItems = item.items && item.items.length > 0;
                  const isActive = isItemActive(item);

                  if (hasSubItems && (!item.url || item.url.trim() === '')) {
                    // Expandable section for items with subitems
                    return (
                      <div key={item.title}>
                        <div
                          className={cn(
                            'flex items-center gap-3 rounded-lg p-3 font-medium transition-colors',
                            isActive && 'bg-(--color-primary)/10 text-(--color-primary)',
                            'text-foreground'
                          )}
                        >
                          {item.icon}
                          <span>{t(item.title)}</span>
                        </div>
                        <div className="mt-1 ml-6 space-y-1">
                          {item.items
                            ?.filter(subItem => {
                              if (!subItem.roles || subItem.roles.length === 0) return true;
                              return hasRole(subItem.roles);
                            })
                            .map(subItem => {
                              const isSubActive = subItem.url === currentPath;
                              return (
                                <NavLink
                                  key={subItem.title}
                                  to={subItem.url}
                                  className={cn(
                                    'block rounded-md p-2 text-sm transition-colors',
                                    isSubActive
                                      ? 'bg-(--color-primary)/10 font-semibold text-(--color-primary)'
                                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                  )}
                                >
                                  {t(subItem.title)}
                                </NavLink>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }

                  // Regular navigation link
                  return (
                    <NavLink
                      key={item.title}
                      to={item.url || '#'}
                      className={cn(
                        'flex items-center gap-3 rounded-lg p-3 font-medium transition-colors',
                        isActive
                          ? 'bg-(--color-primary) text-white'
                          : 'text-foreground hover:bg-accent'
                      )}
                    >
                      {item.icon}
                      <span>{t(item.title)}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
