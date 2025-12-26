import type { MenuConfig } from '@/types/navigation';
// Import only necessary menu sections
import dashboard from './dashboard';
import declarationCreate from './export-import-transit';
import tasks from './tasks';

/**
 * Main menu configuration
 * Clean and focused structure with only essential modules
 */
const menuItems: MenuConfig = {
  items: [
    // Dashboard - Boshqaruv paneli
    dashboard,
    // Task Management - Vazifalar boshqaruvi
    tasks,
    // Declaration Create - Group with max 3 level depth
    declarationCreate,
  ],
};

/**
 * Hidden routes that don't appear in sidebar
 * These are accessible via direct navigation
 */
export const hiddenRoutes = [
  {
    id: 'profile',
    title: 'navigation.profile.title',
    type: 'item' as const,
    path: '/profile',
    roles: [],
    breadcrumbs: true,
  },
];

/**
 * Footer menu configuration
 * Items that appear at the bottom of the sidebar
 */
export const footerMenuItems: MenuConfig = {
  items: [
    // Add settings or help items here if needed
  ],
};

export default menuItems;
