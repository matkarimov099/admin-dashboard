import { BarChart3, ChartNoAxesCombinedIcon, Home } from 'lucide-react';
import { lazy } from 'react';
import type { MenuItemConfig } from '../types/menu';

/**
 * Dashboard menu section
 * Main overview and analytics
 */
const dashboard: MenuItemConfig = {
  id: 'dashboard',
  title: 'navigation.dashboard.title',
  type: 'collapse',
  icon: <ChartNoAxesCombinedIcon />,
  roles: [], // Accessible to all authenticated users
  children: [
    {
      id: 'dashboard-overview',
      title: 'navigation.dashboard.overview.title',
      type: 'item',
      path: '/dashboard',
      icon: <Home />,
      roles: [],
      component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
      breadcrumbs: true,
    },
    {
      id: 'dashboard-analytics',
      title: 'navigation.dashboard.analytics.title',
      type: 'item',
      path: '/dashboard/analytics',
      icon: <BarChart3 />,
      roles: [],
      component: lazy(() => import('@/pages/dashboard/DashboardAnalytics.tsx')),
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
