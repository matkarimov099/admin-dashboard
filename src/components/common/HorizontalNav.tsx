import { ChevronDown, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { mainMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/utils/utils';

export function HorizontalNav() {
  const location = useLocation();
  const { hasRole } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get the current path for comparison
  const currentPath = location.pathname;

  // Filter menu items based on roles
  const filteredMenuItems = mainMenuItems.filter(item => {
    // For parent items without URL, check if they have any visible subitems
    if (!item.url || item.url.trim() === '') {
      // If item has roles restriction, check user has those roles
      if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
        return false;
      }
      // Check if any subitems are visible
      if (item.items && item.items.length > 0) {
        const hasVisibleSubItems = item.items.some(subItem => {
          if (!subItem.roles || subItem.roles.length === 0) return true;
          return hasRole(subItem.roles);
        });
        return hasVisibleSubItems;
      }
      return true;
    }
    // For items with URL, check role permissions
    if (!item.roles || item.roles.length === 0) return true;
    return hasRole(item.roles);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Check if this item or any of its subitems is active
  const isItemActive = (item: any) => {
    const hasActiveSubItem = item.items?.some((subItem: any) => subItem.url === currentPath);
    const isDirectlyActive = item.url && item.url !== '' && item.url === currentPath;
    return hasActiveSubItem || isDirectlyActive;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
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
                      <span>{item.title}</span>
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
                              'w-full cursor-pointer flex items-center gap-2',
                              isSubActive && 'bg-(--color-primary)/10 text-(--color-primary) font-semibold'
                            )}
                          >
                            <span>{subItem.title}</span>
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
                  <span>{item.title}</span>
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
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Menu</h2>
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
                        <div className={cn(
                          'flex items-center gap-3 p-3 rounded-lg font-medium transition-colors',
                          isActive && 'bg-(--color-primary)/10 text-(--color-primary)',
                          'text-foreground'
                        )}>
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        <div className="ml-6 mt-1 space-y-1">
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
                                    'block p-2 text-sm rounded-md transition-colors',
                                    isSubActive
                                      ? 'bg-(--color-primary)/10 text-(--color-primary) font-semibold'
                                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                  )}
                                >
                                  {subItem.title}
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
                        'flex items-center gap-3 p-3 rounded-lg font-medium transition-colors',
                        isActive
                          ? 'bg-(--color-primary) text-white'
                          : 'text-foreground hover:bg-accent'
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
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