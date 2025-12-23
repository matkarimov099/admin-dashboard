import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import menuItems, { hiddenRoutes } from '@/config/navigation/modules/index';
import { useCurrentPath } from '@/hooks/use-current-path.ts';
import type { BreadcrumbItem, BreadcrumbPathItem } from '@/types/breadcrumb';
import type { MenuItemConfig } from '@/types/navigation';

/**
 * Recursively search for a path in the menu structure
 * Returns the full breadcrumb path if found
 */
function findBreadcrumbPath(
  items: MenuItemConfig[],
  targetPath: string,
  currentPath: BreadcrumbPathItem[] = []
): BreadcrumbPathItem[] | null {
  for (const item of items) {
    // Check if this item matches the target path
    if (item.path === targetPath) {
      return [...currentPath, { item, path: item.path || '', level: currentPath.length }];
    }

    // Check children (nested items)
    const children = item.children || item.items;
    if (children && children.length > 0) {
      const result = findBreadcrumbPath(children, targetPath, [
        ...currentPath,
        { item, path: item.path || '', level: currentPath.length },
      ]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

export const useBreadcrumb = () => {
  const { t } = useTranslation();
  const currentPath = useCurrentPath();
  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [];

    // Always start with "Project"
    items.push({
      title: t('app.name'),
      url: '/',
      isActive: false,
    });

    // Collect all menu items to search
    const allMenuItems: MenuItemConfig[] = [...menuItems.items, ...hiddenRoutes];

    // Find the breadcrumb path for the current route
    const breadcrumbPath = findBreadcrumbPath(allMenuItems, currentPath);

    if (breadcrumbPath && breadcrumbPath.length > 0) {
      // Build breadcrumbs from the path
      for (let i = 0; i < breadcrumbPath.length; i++) {
        const { item, path } = breadcrumbPath[i];

        // Skip items without a breadcrumbs flag or without a path/url
        if (item.breadcrumbs === false) continue;

        // Get title - use translation if it's a string key
        const title = typeof item.title === 'string' ? t(item.title) : String(item.title);

        items.push({
          title,
          url: path || undefined, // Only add URL if a path exists
          isActive: i === breadcrumbPath.length - 1, // The last item is active
        });
      }
    } else {
      // Fallback: if no match found, use path segments
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        const fallbackTitle =
          lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');

        items.push({
          title: fallbackTitle,
          isActive: true,
        });
      } else {
        // Root path - show Dashboard
        items.push({
          title: t('navigation.dashboard.title'),
          isActive: true,
        });
      }
    }

    return items;
  }, [currentPath, t]);

  return { breadcrumbItems };
};
