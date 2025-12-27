import { ChevronDown, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import menuItems from '@/config/navigation/modules';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useCurrentPath } from '@/hooks/use-current-path';
import type { Role } from '@/types/common';
import type { MenuGroupConfig, MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

/* ================= NESTED ITEM ================= */

function HorizontalNavNestedItem({
  item,
  t,
  currentPath,
  hasRole,
}: {
  item: MenuItemConfig;
  t: (key: string) => string;
  currentPath: string;
  hasRole: (roles: Role | Role[]) => boolean;
}) {
  const isActive = item.path === currentPath || item.url === currentPath;
  const children = item.items || item.children || [];

  const visibleChildren = children.filter(c => !c.roles?.length || hasRole(c.roles));

  const title = typeof item.title === 'string' ? t(item.title) : item.title;

  if (visibleChildren.length > 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-[15px]',
              isActive && 'bg-(--color-primary)/10 text-(--color-primary)'
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {title}
            </span>
            <ChevronDown className="size-4" />
          </div>
        </PopoverTrigger>

        <PopoverContent side="right" align="start" className="w-64 p-2">
          <div className="space-y-1">
            {visibleChildren.map(child => (
              <HorizontalNavNestedItem
                key={child.id}
                item={child}
                t={t}
                currentPath={currentPath}
                hasRole={hasRole}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <NavLink
      to={item.path || item.url || '#'}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-[15px]',
        isActive ? 'bg-(--color-primary)/10 text-(--color-primary)' : 'hover:bg-accent'
      )}
    >
      {item.icon}
      {title}
    </NavLink>
  );
}

/* ================= MAIN ================= */

export function HorizontalNav() {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { hasRole } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* -------- ROLE FILTER -------- */

  const filteredMenuItems = useMemo(
    () =>
      menuItems.items.filter(item => {
        if (item.roles?.length && !hasRole(item.roles)) return false;

        if ('children' in item && item.children) {
          return item.children.some(c => !c.roles?.length || hasRole(c.roles));
        }
        return true;
      }),
    [hasRole]
  );

  /* -------- DEFAULT 6 -------- */

  const DEFAULT_VISIBLE = 6;

  const visibleItems = filteredMenuItems.slice(0, DEFAULT_VISIBLE);
  const moreItems = filteredMenuItems.slice(DEFAULT_VISIBLE);

  /* -------- ACTIVE -------- */

  const isItemActive = (item: MenuItemConfig | MenuGroupConfig): boolean => {
    if ('path' in item && item.path === currentPath) return true;
    if ('url' in item && item.url === currentPath) return true;
    if ('children' in item && item.children) {
      return item.children.some(child => isItemActive(child));
    }
    return false;
  };

  /* -------- RENDER TOP ITEM -------- */

  const renderTopItem = (item: MenuItemConfig | MenuGroupConfig) => {
    const title = typeof item.title === 'string' ? t(item.title) : item.title;
    const active = isItemActive(item);

    if (item.type === 'group' || item.type === 'collapse') {
      return (
        <Popover key={item.id}>
          <PopoverTrigger asChild>
            <Button
              variant={active ? 'default' : 'ghost'}
              size="sm"
              className="h-9 px-3 text-[15px]"
            >
              {title}
              <ChevronDown className="ml-1 size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-64 p-2">
            <ScrollArea className="max-h-80">
              <div className="space-y-1">
                {(item.children || []).map(child => (
                  <HorizontalNavNestedItem
                    key={child.id}
                    item={child}
                    t={t}
                    currentPath={currentPath}
                    hasRole={hasRole}
                  />
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Button
        key={item.id}
        asChild
        variant={active ? 'default' : 'ghost'}
        size="sm"
        className="h-9 px-3"
      >
        <NavLink to={item.path || item.url || '#'} className="flex items-center gap-2 text-[15px]">
          {item.icon && (
            <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
              {item.icon}
            </span>
          )}
          <span>{title}</span>
        </NavLink>
      </Button>
    );
  };

  /* ================= JSX ================= */

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden w-full items-center gap-4 md:flex">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} className="size-9" alt={'fd'} />
          <span className="font-bold text-lg">{t('app.name')}</span>
        </NavLink>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          {visibleItems.map(renderTopItem)}

          {moreItems.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 px-3 text-[15px]">
                  Barchasi
                  <ChevronDown className="ml-1 size-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="w-72 p-2">
                <div className="space-y-1">
                  {moreItems.map(item => (
                    <HorizontalNavNestedItem
                      key={item.id}
                      item={item as MenuItemConfig}
                      t={t}
                      currentPath={currentPath}
                      hasRole={hasRole}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>

      {/* MOBILE */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {filteredMenuItems.map(item => (
                <NavLink
                  key={item.id}
                  to={'#'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md p-2 hover:bg-accent"
                >
                  {typeof item.title === 'string' ? t(item.title) : item.title}
                </NavLink>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
