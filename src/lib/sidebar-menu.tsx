import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';
import { LazyComponent } from '@/components/common/LazyComponent.tsx';
import { PageTitle } from '@/components/common/PageTitle.tsx';
import { ProtectedRoute } from '@/components/common/RouterComponents.tsx';
import type { Role } from '@/types/common.ts';
import { footerMenuConfig, hiddenRoutes, menuConfig } from './app-menu.tsx';

export interface SidebarMenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  roles?: Role[];
  isActive?: boolean;
  disabled?: boolean;
  items?: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  roles?: Role[];
  disabled?: boolean;
}

export interface SidebarFooterItem {
  title: string;
  url: string;
  icon: ReactNode;
  roles?: Role[];
}

/**
 * Main sidebar menu items
 * Auto-generated from a menu.config.tsx
 */
export const mainMenuItems: SidebarMenuItem[] = menuConfig.map(config => ({
  title: config.title,
  url: config.path,
  icon: config.icon,
  roles: config.roles,
  disabled: config.disabled,
  items: config.items?.map(item => ({
    title: item.title,
    url: item.path,
    icon: item.icon,
    roles: item.roles,
    disabled: item.disabled,
  })),
}));

/**
 * Footer sidebar menu items
 * Auto-generated from menu.config.tsx
 */
export const footerMenuItems: SidebarFooterItem[] = footerMenuConfig.map(config => ({
  title: config.title,
  url: config.path,
  icon: config.icon,
  roles: config.roles,
}));

export function generateRoutes(): RouteObject[] {
  const allConfigs = [
    ...menuConfig,
    ...footerMenuConfig,
    ...hiddenRoutes, // Include hidden routes (Profile, Analysis, etc.)
    // Flatten nested items
    ...menuConfig.flatMap(c => c.items || []),
  ];

  const routes: RouteObject[] = [];

  for (const config of allConfigs) {
    const { path, title, component: Component, roles } = config;

    // Skip if no path or component
    if (!path || !Component) continue;

    // Remove leading slash for React Router (uses relative paths)
    const routePath = path.startsWith('/') ? path.slice(1) : path;

    // Create a page element with lazy loading and title
    const pageElement = (
      <LazyComponent>
        <PageTitle title={title} />
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
