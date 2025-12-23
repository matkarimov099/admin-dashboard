import menuItems, { hiddenRoutes } from '@/config/navigation/modules/index';
import type { MenuItemConfig } from '@/types/navigation';
import type { BreadcrumbItem, BreadcrumbPathItem } from '@/types/breadcrumb';

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

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const currentPath = pathname;
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with "Project"
  breadcrumbs.push({
    title: 'Project',
    url: '/',
  });

  // Collect all menu items to search
  const allMenuItems: MenuItemConfig[] = [...menuItems.items, ...hiddenRoutes];

  // Find the breadcrumb path for current route
  const breadcrumbPath = findBreadcrumbPath(allMenuItems, currentPath);

  if (breadcrumbPath && breadcrumbPath.length > 0) {
    // Build breadcrumbs from the path
    for (let i = 0; i < breadcrumbPath.length; i++) {
      const { item, path } = breadcrumbPath[i];

      // Skip items without breadcrumbs flag or without a path/url
      if (item.breadcrumbs === false) continue;

      // Get title - use string directly (translation happens in component)
      const title = typeof item.title === 'string' ? item.title : String(item.title);

      breadcrumbs.push({
        title,
        titleKey: typeof item.title === 'string' ? item.title : undefined,
        url: path || undefined, // Only add URL if path exists
        isActive: i === breadcrumbPath.length - 1, // Last item is active
      });
    }
  } else {
    // If no match found, try to infer from a path
    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      breadcrumbs.push({
        title: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' '),
        isActive: true,
      });
    }
  }

  return breadcrumbs;
}
