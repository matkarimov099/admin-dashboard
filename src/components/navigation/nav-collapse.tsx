import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar.tsx';
import type { EnhancedMenuItemConfig } from '@/config/navigation/types/menu';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';
import { NavItem } from './nav-item';

interface NavCollapseProps {
  item: EnhancedMenuItemConfig;
  level: number;
}

/**
 * NavCollapse component for rendering collapsible menu items
 * Based on cargo-customs NavCollapse pattern
 *
 * Supports:
 * - Multi-level nesting (3+ levels)
 * - Collapsible sub-menus
 * - Popover menu when sidebar is collapsed
 * - Auto-expand when child is active
 * - Role-based access control
 * - Icons and badges
 */
export function NavCollapse({ item, level }: NavCollapseProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';
  const [isOpen, setIsOpen] = useState(false);

  // Check if user has permission to view this item
  if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
    return null;
  }

  // Check if disabled
  if (item.disabled) {
    return null;
  }

  const children = item.children || item.items || [];

  // Filter children based on roles
  const visibleChildren = children.filter(child => {
    if (child.roles && child.roles.length > 0) {
      return hasRole(child.roles);
    }
    return true;
  });

  // Don't render if no visible children
  if (visibleChildren.length === 0) {
    return null;
  }

  // Check if any child or nested child is active
  const hasActiveChild = (items: EnhancedMenuItemConfig[]): boolean => {
    return items.some(child => {
      const childPath = child.path || child.url || child.link || '';
      if (childPath === currentPath) return true;
      if (child.children || child.items) {
        return hasActiveChild(child.children || child.items || []);
      }
      return false;
    });
  };

  const isParentActive = hasActiveChild(visibleChildren);
  const titleText = typeof item.title === 'string' ? t(item.title) : item.title;

  // Auto-open if has active child
  useEffect(() => {
    if (isParentActive && !isCollapsed) {
      setIsOpen(true);
    }
  }, [isParentActive, currentPath, isCollapsed]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  // Render as popover when sidebar is collapsed
  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              tooltip={undefined}
              className={cn(
                'relative h-9 w-9 rounded-md p-0 transition-all duration-200',
                'text-sidebar-foreground'
              )}
              data-parent-item="true"
              data-active={isParentActive ? 'true' : 'false'}
            >
              <div className="flex size-4 items-center justify-center">{item.icon}</div>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-48 rounded-lg p-1.5 shadow-lg">
            <div className="mb-1 border-(--sidebar-border) border-b pb-1">
              <div className="flex items-center gap-2 px-1 font-medium text-gray-800 text-xs dark:text-gray-200">
                {item.icon && (
                  <span className="flex h-3 w-3 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span>{titleText}</span>
              </div>
            </div>
            <div className="space-y-0.5">
              {visibleChildren.map(child => renderChildItem(child, level + 1, true))}
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    );
  }

  // Render as expandable menu item when sidebar is expanded
  return (
    <SidebarMenuItem className="mb-1">
      {/* Main collapse button */}
      <SidebarMenuButton
        onClick={toggleOpen}
        className={cn(
          'relative h-9 w-full cursor-pointer rounded-lg transition-all duration-200',
          'text-sidebar-foreground text-sm',
          'hover:bg-sidebar-accent',
          isParentActive && 'bg-sidebar-accent',
          'px-3 py-1.5'
        )}
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {/* Icon */}
            {item.icon && (
              <span className="flex size-4 shrink-0 items-center justify-center">{item.icon}</span>
            )}

            {/* Title */}
            <span className="truncate font-medium text-sm" title={undefined}>
              {titleText}
            </span>
          </div>

          {/* Right side: Chip and Chevron */}
          <div className="flex shrink-0 items-center gap-1">
            {/* Chip */}
            {item.chip && (
              <span
                className={cn(
                  'rounded px-1 py-0.5 font-medium text-[10px]',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                )}
              >
                {item.chip.label}
              </span>
            )}

            {/* Expand/collapse indicator */}
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </div>
      </SidebarMenuButton>

      {/* Children */}
      {isOpen && (
        <SidebarMenuSub className="mt-0.5 space-y-0.5">
          {visibleChildren.map(child => renderChildItem(child, level + 1, false))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

/**
 * Helper function to render child items based on type
 * Supports recursive nesting for 3+ levels
 */
function renderChildItem(
  child: EnhancedMenuItemConfig,
  level: number,
  inPopover: boolean
): React.ReactNode {
  // For popover, render all as simple items (no nested collapses in popover)
  if (inPopover) {
    if (child.type === 'collapse' || child.children || child.items) {
      // Render collapse children as a flat list in popover
      const nestedChildren = child.children || child.items || [];
      return (
        <div key={child.id}>
          {/* Render the collapse header as a disabled item */}
          <div className="mt-1 mb-0.5 px-1 font-semibold text-[10px] text-gray-400 uppercase">
            {typeof child.title === 'string' ? child.title : ''}
          </div>
          {nestedChildren.map(nested => (
            <NavItem key={nested.id} item={nested} level={0} inPopover={true} />
          ))}
        </div>
      );
    }
    return <NavItem key={child.id} item={child} level={0} inPopover={true} />;
  }

  // For regular sidebar, support full nesting
  switch (child.type) {
    case 'collapse':
      return <NavCollapse key={child.id} item={child} level={level} />;
    case 'item':
      return <NavItem key={child.id} item={child} level={level} />;
    default:
      // If an item has children but no explicit type, treat as collapse
      if (child.children || child.items) {
        return <NavCollapse key={child.id} item={child} level={level} />;
      }
      return <NavItem key={child.id} item={child} level={level} />;
  }
}
