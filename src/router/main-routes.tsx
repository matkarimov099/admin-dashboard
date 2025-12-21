import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { generateRoutes } from '@/config/navigation/sidebar-menu.tsx';

export const mainRoutes: RouteObject[] = [
  // Default redirect to dashboard
  {
    index: true,
    element: <Navigate to="dashboard" replace />,
  },
  // All other routes are auto-generated from menu config
  ...generateRoutes(),
];
