import {
    CheckSquareIcon,
    LayoutListIcon,
    LayoutGrid,
    ArrowDownToLine,
    ArrowUpFromLine,
    CarFront,
    GitCompareArrows,
    Truck,
    TriangleAlert,
    FileText,
    FileSliders,
    BriefcaseBusiness,
    Map
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
        title: 'common.navigation.dashboard',
        path: '/dashboard',
        icon: <LayoutGrid size={20}/>,
        roles: [], // Accessible to all authenticated users
        component: lazy(() => import('@/pages/dashboard/Dashboard.tsx')),
    },
    {
        title: 'users.title',
        path: '/users',
        icon: <LayoutGrid size={20}/>,
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
