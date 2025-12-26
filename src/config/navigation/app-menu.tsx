import {
    CheckSquareIcon,
    LayoutListIcon,
    LayoutGrid,
    ArrowDownToLine,
    ArrowUpFromLine,
    CarFront,
    GitCompareArrows,
    TriangleAlert,
    FileText,
    FileSliders,
    BriefcaseBusiness,
    Map,
    Truck
} from 'lucide-react';
import {type ComponentType, lazy, type ReactNode} from 'react';
import type {Role} from '@/types/common.ts';

/**
 * Menu item configuration interface
 */

export interface MenuItemConfig {
    title: string; // Translation key
    path: string;
    icon?: ReactNode;
    roles?: Role[];
    component?: ComponentType;
    items?: MenuSubItemConfig[];
    disabled?: boolean;
}

/**
 * Sub-menu item configuration interface
 */
export interface MenuSubItemConfig {
    title: string; // Translation key
    path: string;
    icon?: ReactNode;
    roles?: Role[];
    component?: ComponentType;
    disabled?: boolean;
}

export const menuConfig: MenuItemConfig[] = [
    {
        title: 'menu.dashboard',
        path: '/dashboard',
        icon: <LayoutGrid size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
    },
    {
        title: 'menu.transit',
        path: '/transit-at',
        icon: <ArrowDownToLine size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/transit/index.tsx')),
    },
    {
        title: 'menu.export',
        path: '/export',
        icon: <ArrowUpFromLine size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.undertaking',
        path: '/majburiyatnoma',
        icon: <CarFront size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/majburiyatnoma/Majburiyatnoma.tsx')),
    },
    {
        title: 'menu.tolling',
        path: '/tolling',
        icon: <GitCompareArrows size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.transportInspector',
        path: '/transport-inspector',
        icon: <Truck size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.tobaccoTransit',
        path: '/tobacco-transit',
        icon: <TriangleAlert size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.reports',
        path: '/reports',
        icon: <FileText size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.observationReport',
        path: '/observation-report',
        icon: <FileSliders size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.serviceInformation',
        path: '/service-information',
        icon: <BriefcaseBusiness size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'menu.electronicSeals',
        path: '//electronic-seals',
        icon: <Map size={20}/>,
        roles: [],
        component: lazy(() => import('@/pages/users/Users.tsx')),
    },
    {
        title: 'tasks.title', // Use tasks title from root level
        path: '', // Parent-only menu (no direct route)
        icon: <CheckSquareIcon size={20}/>,
        roles: [], // Accessible to all authenticated users
        items: [
            {
                title: 'tasks.table',
                path: '/tasks/table',
                icon: <LayoutListIcon/>,
                roles: [],
                component: lazy(() => import('@/pages/tasks/TasksTable.tsx')),
            },
            {
                title: 'tasks.board',
                path: '/tasks/board',
                icon: <CheckSquareIcon/>,
                roles: [],
                component: lazy(() => import('@/pages/tasks/TasksBoard.tsx')),
            },
        ],
    },
];

/**
 * Footer menu configuration (e.g., Settings)
 */
export const footerMenuConfig: MenuItemConfig[] = [];

/**
 * Additional routes that don't appear in sidebar menu
 * These pages are accessible via other navigation methods:
 * - User dropdown (Profile)
 * - Direct links from other pages
 */
export const hiddenRoutes: MenuItemConfig[] = [
    {
        title: 'profile.title',
        path: '/profile',
        roles: [],
        component: lazy(() => import('@/pages/profile/Profile.tsx')),
    },
    {
        title: 'tasks.details',
        path: '/tasks/:taskKey',
        roles: [], // Accessible to all authenticated users
        component: lazy(() => import('@/pages/tasks/TaskDetail.tsx')),
    },
];
