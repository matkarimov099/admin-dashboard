import { ChevronDown } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import type { MenuItemConfig } from '@/types/navigation';
import { cn } from '@/utils/utils';
import { NavCollapsePopover } from './nav-collapse-popover';
import { NavItem } from './nav-item';
import { NavPopoverNested } from './nav-popover-nested';

interface NavCollapseProps {
  item: MenuItemConfig;
}

/**
 * NavCollapse - Collapsible navigation group component
 *
 * Features:
 * - Auto-expand when contains active child
 * - Smooth collapse/expand animation
 * - Dynamic theme color for active parent
 * - Popover support for collapsed sidebar
 * - Multi-level nesting (unlimited depth)
 * - Role-based access control
 * - Clean visual hierarchy
 */
export function NavCollapse({ item }: NavCollapseProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';
  const [isOpen, setIsOpen] = useState(false);

  // Get children (support both 'children' and 'items' properties)
  const children = item.children || item.items || [];

  // Filter visible children based on roles
  const visibleChildren = children.filter(child => {
    if (child.roles && child.roles.length > 0) {
      return hasRole(child.roles);
    }
    return !child.disabled;
  });

  // Check if any child is active (recursive)
  const hasActiveChild = (items: MenuItemConfig[]): boolean => {
    return items.some(child => {
      const childPath = child.path || child.url || child.link || '';
      if (childPath === currentPath) return true;

      // Check nested children recursively
      const nestedChildren = child.children || child.items || [];
      if (nestedChildren.length > 0) {
        return hasActiveChild(nestedChildren);
      }

      return false;
    });
  };

  const isParentActive = hasActiveChild(visibleChildren);
  const titleText = typeof item.title === 'string' ? t(item.title) : item.title;
  const tooltipText = typeof item.title === 'string' ? t(item.title) : undefined;

  // Auto-expand when the parent is active (contains active child)
  useEffect(() => {
    if (isParentActive && !isCollapsed) {
      setIsOpen(true);
    }
  }, [isParentActive, isCollapsed]);

  // Toggle collapse/expand
  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  // Role-based access control - checked after all hooks
  if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
    return null;
  }

  // Don't render disabled items
  if (item.disabled) {
    return null;
  }

  // Don't render if no visible children
  if (visibleChildren.length === 0) {
    return null;
  }

  // Helper function to render children in popover
  const renderPopoverChildren = (children: MenuItemConfig[]) => {
    return children.map(child => renderChildItem(child, true, t));
  };

  // Popover rendering (for collapsed sidebar)
  if (isCollapsed) {
    return (
      <NavCollapsePopover
        item={item}
        titleText={titleText}
        tooltipText={tooltipText}
        isParentActive={isParentActive}
        renderChildren={renderPopoverChildren}
        visibleChildren={visibleChildren}
      />
    );
  }

  // Regular sidebar rendering (expanded)
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleOpen}
        className={cn(
          'relative h-9 w-full cursor-pointer rounded-md px-2.5 py-2 transition-all duration-200',
          'hover:bg-(--color-primary)/10! dark:hover:bg-(--color-primary)/20!',
          'text-gray-700 hover:text-gray-700! dark:text-gray-200 dark:hover:text-white!'
        )}
      >
        <div className="flex w-full items-center justify-between gap-2.5">
          {/* Left side: Icon + Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {/* Icon */}
            {item.icon && (
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center transition-colors duration-200',
                  isParentActive && 'text-(--color-primary)',
                  !isParentActive && 'dark:text-white'
                )}
              >
                {item.icon}
              </span>
            )}

            {/* Title */}
            <span
              className={cn(
                'flex-1 truncate font-medium text-[14px] transition-colors duration-200',
                isParentActive && 'text-(--color-primary)',
                !isParentActive && 'text-gray-700 dark:text-white'
              )}
            >
              {titleText}
            </span>
          </div>

          {/* Right side: Chip + Chevron */}
          <div className="flex shrink-0 items-center gap-1.5">
            {/* Chip badge */}
            {item.chip && (
              <span className="rounded-md bg-(--color-primary)/10 px-1.5 py-0.5 font-medium text-(--color-primary) text-[10px]">
                {item.chip.label}
              </span>
            )}

            {/* Chevron indicator */}
            <ChevronDown
              className={cn(
                'size-4.5 shrink-0 transition-all duration-200',
                isParentActive && 'text-(--color-primary)',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </div>
      </SidebarMenuButton>

      {/* Nested children */}
      {isOpen && (
        <SidebarMenuSub className="mt-1 ml-2.5 space-y-1 border-l pl-2.5">
          {visibleChildren.map(child => renderChildItem(child, false, t))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

/**
 * Helper function to render child items
 * Handles both collapse and item types recursively
 * Supports nested popovers for items with children
 */
function renderChildItem(
  child: MenuItemConfig,
  inPopover: boolean,
  t: (key: string) => string
): ReactNode {
  // Popover rendering - with nested popover support
  if (inPopover) {
    // If a child has nested children, show as a nested popover
    if (child.type === 'collapse' || child.children || child.items) {
      // Helper to render nested children recursively
      const renderNestedChildren = (children: MenuItemConfig[]) => {
        return children.map(nested => renderChildItem(nested, true, t));
      };

      return (
        <NavPopoverNested
          key={child.id}
          child={child}
          t={t}
          renderChildren={renderNestedChildren}
        />
      );
    }

    // Regular item in popover
    return <NavItem key={child.id} item={child} inPopover={true} />;
  }

  // Regular sidebar rendering - determine type
  switch (child.type) {
    case 'collapse':
      return <NavCollapse key={child.id} item={child} />;
    case 'item':
      return <NavItem key={child.id} item={child} />;
    default:
      // Auto-detect type based on children's presence
      if (child.children || child.items) {
        return <NavCollapse key={child.id} item={child} />;
      }
      return <NavItem key={child.id} item={child} />;
  }
}
