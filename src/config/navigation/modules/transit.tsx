import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BriefcaseBusiness,
  CarFront,
  CheckSquareIcon,
  FileSliders,
  FileText,
  GitCompareArrows,
  LayoutGrid,
  LayoutListIcon,
  Map as MapIcon,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import { lazy } from 'react';
import type { MenuItemConfig } from '@/types/navigation';

const transit: MenuItemConfig[] = [
  {
    id: 'dashboard-overview',
    title: 'Dashboard',
    type: 'item',
    path: '/dashboard',
    icon: <LayoutGrid size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
    breadcrumbs: true,
  },
  {
    id: 'transit-at',
    title: 'Tranzit (AT)',
    type: 'item',
    path: '/transit-at',
    icon: <ArrowDownToLine size={20} />,
    roles: [], // Accessible to all authenticated users
    component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Export (EK)',
    type: 'item',
    path: '/export',
    icon: <ArrowUpFromLine size={20} />,
    roles: [], // Accessible to all authenticated users
    component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Majburiyatnoma (MB)',
    type: 'item',
    path: '/majburiyatnoma',
    icon: <CarFront size={20} />,
    roles: [], // Accessible to all authenticated users
    component: lazy(() => import('@/pages/majburiyatnoma/Undertaking.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Tolling (TL)',
    type: 'item',
    path: '/tolling',
    icon: <GitCompareArrows size={20} />,
    roles: [], // Accessible to all authenticated users
    component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Transport nazorati',
    path: '/transport-inspector',
    type: 'item',
    icon: <Truck size={20} />,
    roles: [], // Accessible to all authenticated users
    component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Tamaki tranziti',
    path: '/tobacco-transit',
    type: 'item',
    icon: <TriangleAlert size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/users/Users.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Hisobotlar',
    path: '/reports',
    type: 'item',
    icon: <FileText size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/users/Users.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Kuzatuv dalolatnomasi',
    path: '/observation-report',
    type: 'item',
    icon: <FileSliders size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/users/Users.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Xizmat malumotlari',
    type: 'item',
    path: '/service-information',
    icon: <BriefcaseBusiness size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/users/Users.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Elektron plombalar haritasi',
    type: 'item',
    path: '/electronic-seals',
    icon: <MapIcon size={20} />,
    roles: [],
    component: lazy(() => import('@/pages/users/Users.tsx')),
  },
  {
    id: 'transit-at',
    title: 'Xizmat malumotlari',
    type: 'collapse',
    path: '', // Parent-only menu (no direct route)
    icon: <CheckSquareIcon size={20} />,
    roles: [], // Accessible to all authenticated users
    children: [
      {
        id: 'tsk-table',
        title: 'Tasks Table',
        type: 'item',
        path: '/tasks/table',
        icon: <LayoutListIcon />,
        roles: [],
        component: lazy(() => import('@/pages/tasks/TasksTable.tsx')),
      },
      {
        id: 'task-board',
        title: 'Tasks Board',
        path: '/tasks/board',
        type: 'item',
        icon: <CheckSquareIcon />,
        roles: [],
        component: lazy(() => import('@/pages/tasks/TasksTable.tsx')),
      },
    ],
  },
];

export default transit;
