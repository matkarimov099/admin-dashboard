import { ChevronDown, Menu } from 'lucide-react';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import logo from '@/assets/logo.png';
import { LocalizedNavLink } from '@/components/layout/localized-nav-link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import menuItems from '@/config/navigation/modules';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import type { Role } from '@/types/common';
import type { MenuGroupConfig, MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';

/**
 * HorizontalNavNestedItem - Nested popover item for horizontal nav
 * Opens new popovers to the right when hovering over items with children
 */
function HorizontalNavNestedItem({
  item,
  t,
  currentPath,
  hasRole,
  depth = 0,
}: {
  item: MenuItemConfig;
  t: (key: string) => string;
  currentPath: string;
  hasRole: (roles: Role | Role[]) => boolean;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = item.path === currentPath || item.url === currentPath;
  const nestedChildren = item.children || item.items || [];

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimeout();
    // Longer delay to allow smooth navigation to nest popovers
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400); // 400ms delay for a smoother experience
  }, [clearCloseTimeout]);

  // Cleanup timeout on unmounting
  useEffect(() => {
    return () => clearCloseTimeout();
  }, [clearCloseTimeout]);

  // Filter children by roles
  const visibleChildren = nestedChildren.filter(child => {
    return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
  });

  const titleText = typeof item.title === 'string' ? t(item.title) : item.title;
  const hasNestedChildren = visibleChildren.length > 0;

  if (hasNestedChildren) {
    // Item with children - use nested popover
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-200',
              isActive && 'bg-(--color-primary)/10 font-semibold text-(--color-primary)',
              !isActive &&
                'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
              'hover:!text-gray-700 dark:hover:!text-white text-gray-700 dark:text-gray-200'
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              {item.icon && (
                <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                  {item.icon}
                </span>
              )}
              <span className="flex-1">{titleText}</span>
            </div>
            <ChevronDown
              className={cn(
                'size-4 shrink-0 text-gray-400 transition-transform duration-200 dark:text-gray-500',
                isOpen ? 'rotate-0' : '-rotate-90'
              )}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          side="right"
          align="start"
          className="w-fit rounded-lg border border-gray-200 p-2 shadow-lg dark:border-gray-700"
          onOpenAutoFocus={e => e.preventDefault()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Nested popover header */}
          <div className="mb-2 border-gray-200 border-b pb-1.5 dark:border-gray-700">
            <div className="flex items-center gap-2 px-1.5 py-1 text-xs">
              {item.icon && (
                <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                  {item.icon}
                </span>
              )}
              <span className="font-semibold text-gray-700 uppercase tracking-wide dark:text-gray-300">
                {titleText}
              </span>
            </div>
          </div>

          {/* Nested popover children */}
          <div className="space-y-1">
            {visibleChildren.map(child => (
              <HorizontalNavNestedItem
                key={child.id}
                item={child}
                t={t}
                currentPath={currentPath}
                hasRole={hasRole}
                depth={depth + 1}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Simple item without children - make it a link
  return (
    <NavLink
      to={item.path || item.url || '#'}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-200',
        isActive && 'bg-(--color-primary)/10 font-semibold text-(--color-primary)',
        !isActive && 'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
        'hover:!text-gray-700 dark:hover:!text-white text-gray-700 dark:text-gray-200'
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        {item.icon && (
          <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
            {item.icon}
          </span>
        )}
        <span className="flex-1">{titleText}</span>
      </div>
    </NavLink>
  );
}

export function HorizontalNav() {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { hasRole } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter menu items based on roles
  const filterMenuItems = (items: (MenuItemConfig | MenuGroupConfig)[]) => {
    return items.filter(item => {
      if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
        return false;
      }
      // For groups, also filter children
      if ('children' in item && item.children) {
        const filteredChildren = item.children.filter(child => {
          return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
        });
        return filteredChildren.length > 0;
      }
      return true;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems.items);

  // Check if this item or any of its subitems is active
  const isItemActive = (
    item: MenuItemConfig | MenuGroupConfig,
    path: string = currentPath
  ): boolean => {
    if ('path' in item && item.path === path) return true;
    if ('url' in item && item.url === path) return true;
    if ('children' in item && item.children) {
      return item.children.some(child => isItemActive(child, path));
    }
    if ('items' in item && item.items) {
      return item.items.some(child => isItemActive(child, path));
    }
    return false;
  };

  // Render menu group popover (for groups like Export/Import/Transit)
  const renderMenuGroupPopover = (group: MenuGroupConfig) => {
    const isActive = isItemActive(group);
    const titleText = typeof group.title === 'string' ? t(group.title) : group.title;

    // Filter children by roles
    const visibleChildren = group.children.filter(child => {
      return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
    });

    return (
      <Popover key={group.id}>
        <PopoverTrigger asChild>
          <Button
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'h-9 gap-2 px-3 transition-colors',
              isActive && 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
            )}
          >
            <div className="flex items-center gap-2">
              {group.icon && (
                <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                  {group.icon}
                </span>
              )}
              <span>{titleText}</span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-fit p-0" sideOffset={4}>
          <div className="p-2">
            {/* Header with icon and title */}
            <div className="mb-1 flex items-center gap-2 px-2 py-2">
              {group.icon && (
                <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                  {group.icon}
                </span>
              )}
              <p className="font-medium text-sm">{titleText}</p>
            </div>
            <Separator className="mb-2" />
            {/* Children with nested popover support */}
            <ScrollArea className="max-h-80">
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
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  // Render simple collapse item (for items like Dashboard)
  const renderCollapseItem = (item: MenuItemConfig) => {
    const isActive = isItemActive(item);
    const titleText = typeof item.title === 'string' ? t(item.title) : item.title;
    const children = item.items || [];
    const visibleChildren = children.filter(child => {
      return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
    });

    if (visibleChildren.length > 0) {
      // Item with children - show as popover
      return (
        <Popover key={item.id}>
          <PopoverTrigger asChild>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'h-9 gap-2 px-3 transition-colors',
                isActive && 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon && (
                  <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                    {item.icon}
                  </span>
                )}
                <span>{titleText}</span>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-fit p-2" sideOffset={4}>
            {/* Header */}
            <div className="mb-2 border-gray-200 border-b pb-1.5 dark:border-gray-700">
              <div className="flex items-center gap-2 px-1.5 py-1 text-xs">
                {item.icon && (
                  <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                    {item.icon}
                  </span>
                )}
                <span className="font-semibold text-gray-700 uppercase tracking-wide dark:text-gray-300">
                  {titleText}
                </span>
              </div>
            </div>
            {/* Children */}
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

    // Simple item without children
    return (
      <Button
        key={item.id}
        asChild
        variant={isActive ? 'default' : 'ghost'}
        size="sm"
        className={cn(
          'h-9 gap-2 px-3 transition-colors',
          isActive && 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
        )}
      >
        <NavLink to={item.path || item.url || '#'}>
          <div className="flex items-center gap-2">
            {item.icon && (
              <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                {item.icon}
              </span>
            )}
            <span>{titleText}</span>
          </div>
        </NavLink>
      </Button>
    );
  };

  // Mobile menu item renderer
  const renderMobileMenuItem = (
    item: MenuItemConfig | MenuGroupConfig,
    depth: number = 0
  ): ReactNode => {
    const isActive = isItemActive(item);

    if ('children' in item && item.children) {
      // Group
      const titleText = typeof item.title === 'string' ? t(item.title) : item.title;
      return (
        <div key={item.id}>
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors',
              isActive && 'bg-(--color-primary)/10 text-(--color-primary)',
              'text-foreground'
            )}
          >
            {item.icon && (
              <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                {item.icon}
              </span>
            )}
            <span>{titleText}</span>
          </div>
          <div className="mt-1 space-y-1">
            {item.children
              .filter(child => {
                return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
              })
              .map(child => renderMobileMenuItem(child, depth + 1))}
          </div>
        </div>
      );
    }

    // MenuItemConfig (not a group)
    const menuItem = item as MenuItemConfig;
    const titleText = typeof menuItem.title === 'string' ? t(menuItem.title) : menuItem.title;
    const hasChildren = menuItem.items && menuItem.items.length > 0;
    const visibleChildren = hasChildren
      ? menuItem.items?.filter((child: MenuItemConfig) => {
          return !(child.roles && child.roles.length > 0 && !hasRole(child.roles));
        })
      : [];

    if (hasChildren && visibleChildren && visibleChildren.length > 0) {
      return (
        <div key={menuItem.id}>
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors',
              isActive && 'bg-(--color-primary)/10 text-(--color-primary)',
              'text-foreground'
            )}
          >
            {menuItem.icon && (
              <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                {menuItem.icon}
              </span>
            )}
            <span>{titleText}</span>
          </div>
          <div className="mt-1 space-y-1">
            {visibleChildren?.map((child: MenuItemConfig) =>
              renderMobileMenuItem(child, depth + 1)
            )}
          </div>
        </div>
      );
    }

    // Simple item
    return (
      <NavLink
        key={menuItem.id}
        to={menuItem.path || menuItem.url || '#'}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors',
          isActive ? 'bg-(--color-primary) text-white' : 'text-foreground hover:bg-accent'
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {menuItem.icon && (
          <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
            {menuItem.icon}
          </span>
        )}
        <span>{titleText}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-4 md:flex">
        {/* Logo */}
        <LocalizedNavLink
          to="/"
          className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80"
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md">
            <img src={logo} alt={t('app.name')} className="size-10 object-contain" />
          </div>
          <span className="truncate font-bold font-sans text-(--color-primary) text-base tracking-wide">
            {t('app.name')}
          </span>
        </LocalizedNavLink>

        <Separator orientation="vertical" className="h-6" />

        {/* Menu Items */}
        <div className="flex items-center space-x-1">
          {filteredMenuItems.map(item => {
            if (item.type === 'group') {
              return renderMenuGroupPopover(item as MenuGroupConfig);
            }
            if (item.type === 'collapse') {
              return renderCollapseItem(item as MenuItemConfig);
            }
            // Simple item
            return renderCollapseItem(item as MenuItemConfig);
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('navigation.menu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 border-b p-4">
              <LocalizedNavLink
                to="/"
                className="flex items-center gap-2.5 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative flex size-9 shrink-0 items-center justify-center rounded-md">
                  <img src={logo} alt={t('app.name')} className="size-9 object-contain" />
                </div>
                <span className="truncate font-bold font-sans text-(--color-primary) text-sm tracking-wide">
                  {t('app.name')}
                </span>
              </LocalizedNavLink>
            </div>

            {/* Navigation Items */}
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-4">
                {filteredMenuItems.map(item => renderMobileMenuItem(item))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
