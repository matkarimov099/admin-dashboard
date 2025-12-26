import { ChevronDown, Menu } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import Logo from '@/assets/images/logo/logo.png';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { menuConfig } from '@/config/navigation/app-menu';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useResponsiveMenu } from '@/hooks/use-responsive-menu';
import { cn } from '@/utils/utils';

interface MenuItem {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  roles?: string[];
  items?: MenuItem[];
}

export function HorizontalNav() {
  const location = useLocation();
  const { hasRole } = useAuthContext();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = location.pathname;

  const { containerRef, maxVisibleItems } = useResponsiveMenu({
    itemWidth: 160,
    gap: 8,
    reservedItems: 1,
  });

  const filteredMenuItems = useMemo<MenuItem[]>(() => {
    return menuConfig.filter(item => {
      if (!item.url) {
        if (item.roles?.length && !hasRole(item.roles)) return false;
        if (item.items?.length) {
          return item.items.some(sub => !sub.roles?.length || hasRole(sub.roles));
        }
        return true;
      }
      return !item.roles?.length || hasRole(item.roles);
    });
  }, [hasRole]);

  const isItemActive = (item: MenuItem) =>
    item.url === currentPath || item.items?.some(sub => sub.url === currentPath);

  const MIN_VISIBLE = 2;
  const DEFAULT_VISIBLE = 6;
  const calculatedVisible = maxVisibleItems;

  const safeVisibleCount = Math.max(MIN_VISIBLE, Math.min(DEFAULT_VISIBLE, calculatedVisible));
  const visibleMenuItems = useMemo(
    () => filteredMenuItems.slice(0, safeVisibleCount),
    [filteredMenuItems, safeVisibleCount]
  );

  const moreMenuItems = useMemo(
    () => filteredMenuItems.slice(safeVisibleCount),
    [filteredMenuItems, safeVisibleCount]
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <div className="flex w-full items-center">
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <img src={Logo} alt="Logo" className="size-8" />
        <h1 className="font-bold text-blue-950 text-xl dark:text-blue-100">Cargo Customs</h1>
      </div>
      <nav
        ref={containerRef}
        className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden md:flex"
      >
        {visibleMenuItems.map(item => {
          const isActive = isItemActive(item);
          return item.items && item.items.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="md"
                  className="h-11 shrink-0 px-4 font-[600] text-[15px]"
                >
                  {t(item.title)}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center" className="w-60">
                {item.items.map(item => (
                  <DropdownMenuItem key={item.title} asChild>
                    <NavLink to={item.url || '#'} className="flex items-center gap-2 text-[15px]">
                      {item.icon}
                      <span className="whitespace-nowrap">{t(item.title)}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              key={item.title}
              asChild
              variant={isActive ? 'default' : 'ghost'}
              size="md"
              className={cn(
                'shrink-0 px-4 font-medium text-[15px]',
                isActive && 'bg-(--color-primary) font-bold text-white'
              )}
            >
              <NavLink to={item.url || '#'} className="flex items-center gap-2 font-[600]">
                {item.icon}
                <span className="whitespace-nowrap">{t(item.title)}</span>
              </NavLink>
            </Button>
          );
        })}

        {/* MORE */}
        {moreMenuItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="md"
                className="h-11 shrink-0 px-4 font-[600] text-[15px]"
              >
                Barchasi
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-60">
              {moreMenuItems.map(item => (
                <DropdownMenuItem key={item.title} asChild>
                  <NavLink to={item.url || '#'} className="flex items-center gap-2 text-[15px]">
                    {item.icon}
                    <span className="whitespace-nowrap">{t(item.title)}</span>
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      {/* RIGHT - MOBILE MENU */}
      <div className="shrink-0 md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="lg" className="h-9 w-9 p-0">
              <Menu className="h-9 w-9" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-4">
            <div className="space-y-2">
              {filteredMenuItems.map(item => (
                <NavLink
                  key={item.title}
                  to={item.url || '#'}
                  className={cn(
                    'flex items-center gap-3 rounded-lg p-3',
                    isItemActive(item) ? 'bg-(--color-primary) text-white' : 'hover:bg-accent'
                  )}
                >
                  {item.icon}
                  <span>{t(item.title)}</span>
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
