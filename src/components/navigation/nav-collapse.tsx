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
export function NavCollapse({ item, level }: NavCollapseProps) {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';
  const [isOpen, setIsOpen] = useState(false);

  // Role-based access control
  if (item.roles && item.roles.length > 0 && !hasRole(item.roles)) {
    return null;
  }

  // Don't render disabled items
  if (item.disabled) {
    return null;
  }

  // Get children (support both 'children' and 'items' properties)
  const children = item.children || item.items || [];

  // Filter visible children based on roles
  const visibleChildren = children.filter(child => {
    if (child.roles && child.roles.length > 0) {
      return hasRole(child.roles);
    }
    return !child.disabled;
  });

  // Don't render if no visible children
  if (visibleChildren.length === 0) {
    return null;
  }

  // Check if any child is active (recursive)
  const hasActiveChild = (items: EnhancedMenuItemConfig[]): boolean => {
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

  // Auto-expand when parent is active (contains active child)
  useEffect(() => {
    if (isParentActive && !isCollapsed) {
      setIsOpen(true);
    }
  }, [isParentActive, currentPath, isCollapsed]);

  // Toggle collapse/expand
  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  // Popover rendering (for collapsed sidebar)
  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              tooltip={titleText}
              className={cn(
                'relative size-9 rounded-md p-0 transition-all duration-200',
                'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
                'text-gray-700 hover:!text-gray-700 dark:text-gray-200 dark:hover:!text-white'
              )}
            >
              <div
                className={cn(
                  'flex size-4 items-center justify-center transition-colors duration-200',
                  isParentActive && 'text-[var(--color-primary)]',
                  !isParentActive && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {item.icon}
              </div>
            </SidebarMenuButton>
          </PopoverTrigger>

          <PopoverContent
            side="right"
            align="start"
            className="w-56 rounded-lg border border-gray-200 p-2 shadow-lg dark:border-gray-700"
          >
            {/* Popover header */}
            <div className="mb-2 border-b border-gray-200 pb-2 dark:border-gray-700">
              <div className="flex items-center gap-2 px-1.5 text-xs">
                {item.icon && (
                  <span className="flex size-3.5 shrink-0 items-center justify-center text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </span>
                )}
                <span className="font-semibold text-gray-700 uppercase tracking-wide dark:text-gray-300">
                  {titleText}
                </span>
              </div>
            </div>

            {/* Popover children */}
            <div className="space-y-1">
              {visibleChildren.map(child => renderChildItem(child, level + 1, true))}
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    );
  }

  // Regular sidebar rendering (expanded)
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleOpen}
        className={cn(
          'relative h-9 w-full cursor-pointer rounded-md px-2.5 py-2 transition-all duration-200',
          'hover:!bg-[var(--color-primary)]/10 dark:hover:!bg-[var(--color-primary)]/20',
          'text-gray-700 hover:!text-gray-700 dark:text-gray-200 dark:hover:!text-white'
        )}
      >
        <div className="flex w-full items-center justify-between gap-2.5">
          {/* Left side: Icon + Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {/* Icon */}
            {item.icon && (
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center transition-colors duration-200',
                  isParentActive && 'text-[var(--color-primary)]',
                  !isParentActive && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {item.icon}
              </span>
            )}

            {/* Title */}
            <span
              className={cn(
                'flex-1 truncate font-medium text-[13px] transition-colors duration-200',
                isParentActive && 'text-[var(--color-primary)]',
                !isParentActive && 'text-gray-700 dark:text-gray-200'
              )}
            >
              {titleText}
            </span>
          </div>

          {/* Right side: Chip + Chevron */}
          <div className="flex shrink-0 items-center gap-1.5">
            {/* Chip badge */}
            {item.chip && (
              <span className="rounded-md bg-[var(--color-primary)]/10 px-1.5 py-0.5 font-medium text-[10px] text-[var(--color-primary)]">
                {item.chip.label}
              </span>
            )}

            {/* Chevron indicator */}
            <ChevronDown
              className={cn(
                'size-3.5 shrink-0 transition-all duration-200',
                isParentActive && 'text-[var(--color-primary)]',
                !isParentActive && 'text-gray-400 dark:text-gray-500',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </div>
      </SidebarMenuButton>

      {/* Nested children */}
      {isOpen && (
        <SidebarMenuSub className="ml-2.5 mt-1 space-y-1 border-l border-gray-200 pl-2.5 dark:border-gray-700">
          {visibleChildren.map(child => renderChildItem(child, level + 1, false))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

/**
 * Helper function to render child items
 * Handles both collapse and item types recursively
 */
function renderChildItem(
  child: EnhancedMenuItemConfig,
  level: number,
  inPopover: boolean
): React.ReactNode {
  // Popover rendering - simplified structure
  if (inPopover) {
    // If child has nested children, show as a sub-group
    if (child.type === 'collapse' || child.children || child.items) {
      const nestedChildren = child.children || child.items || [];
      return (
        <div key={child.id} className="space-y-1">
          {/* Sub-group header */}
          <div className="px-1.5 pt-1.5 pb-0.5">
            <span className="font-semibold text-[10px] text-gray-500 uppercase tracking-wide dark:text-gray-400">
              {typeof child.title === 'string' ? child.title : ''}
            </span>
          </div>

          {/* Sub-group items */}
          {nestedChildren.map(nested => (
            <NavItem key={nested.id} item={nested} level={level} inPopover={true} />
          ))}
        </div>
      );
    }

    // Regular item in popover
    return <NavItem key={child.id} item={child} level={level} inPopover={true} />;
  }

  // Regular sidebar rendering - determine type
  switch (child.type) {
    case 'collapse':
      return <NavCollapse key={child.id} item={child} level={level} />;
    case 'item':
      return <NavItem key={child.id} item={child} level={level} />;
    default:
      // Auto-detect type based on children presence
      if (child.children || child.items) {
        return <NavCollapse key={child.id} item={child} level={level} />;
      }
      return <NavItem key={child.id} item={child} level={level} />;
  }
}
