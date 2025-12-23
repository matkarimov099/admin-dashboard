import type { RouteObject } from 'react-router';
import { ProtectedRoute } from '@/components/auth/router-components.tsx';
import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { PageTitle } from '@/components/custom/page-title.tsx';
import type { MenuItemConfig } from '../types/menu';
import menuItems from './index';
import { hiddenRoutes } from './index';

/**
 * Recursively collect all menu items that have a path and component
 * Supports unlimited nesting levels
 */
function collectRouteItems(items: MenuItemConfig[]): MenuItemConfig[] {
  const routeItems: MenuItemConfig[] = [];

  for (const item of items) {
    // If item has a path and component, it's a route
    if (item.path && item.component) {
      routeItems.push(item);
    }

    // Recursively collect from children or items (both are used)
    if (item.children && item.children.length > 0) {
      routeItems.push(...collectRouteItems(item.children));
    }
    if (item.items && item.items.length > 0) {
      routeItems.push(...collectRouteItems(item.items));
    }
  }

  return routeItems;
}

/**
 * Generate React Router routes from menu configuration
 * Works with the new modules system
 */
export function generateRoutes(): RouteObject[] {
  // Collect all menu items from main items and hidden routes
  const allItems = [
    ...menuItems.items,
    ...hiddenRoutes,
  ];

  // Flatten nested items recursively
  const routeItems = collectRouteItems(allItems);

  const routes: RouteObject[] = [];

  for (const item of routeItems) {
    const { path, title, component: Component, roles } = item;

    // Skip if no path or component
    if (!path || !Component) continue;

    // Remove leading slash for React Router (uses relative paths)
    const routePath = path.startsWith('/') ? path.slice(1) : path;

    // Title for PageTitle - only use string (translation key), skip ReactNode
    const titleStr = typeof title === 'string' ? title : String(title);

    // Create a page element with lazy loading and title
    const pageElement = (
      <LazyComponent>
        <PageTitle title={titleStr} />
        <Component />
      </LazyComponent>
    );

    // Wrap with ProtectedRoute if roles are specified
    const element =
      roles && roles.length > 0 ? (
        <ProtectedRoute roles={roles}>{pageElement}</ProtectedRoute>
      ) : (
        pageElement
      );

    routes.push({
      path: routePath,
      element,
    });
  }

  return routes;
}
