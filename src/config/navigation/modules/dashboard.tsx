import { BarChart3, ChartNoAxesCombinedIcon, Home } from 'lucide-react';
import { lazy } from 'react';
import type { MenuItemConfig } from '../types/menu';

/**
 * Dashboard menu section
 * Main overview and analytics
 */
const dashboard: MenuItemConfig = {
  id: 'dashboard',
  title: 'common.navigation.dashboard',
  type: 'collapse',
  icon: <ChartNoAxesCombinedIcon />,
  roles: [], // Accessible to all authenticated users
  children: [
    {
      id: 'dashboard-overview',
      title: 'common.dashboard.overview',
      type: 'item',
      path: '/dashboard',
      icon: <Home />,
      roles: [],
      component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
      breadcrumbs: true,
    },
    {
      id: 'dashboard-analytics',
      title: 'common.dashboard.analytics',
      type: 'item',
      path: '/dashboard/analytics',
      icon: <BarChart3 />,
      roles: [],
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
