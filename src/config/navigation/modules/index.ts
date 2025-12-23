import type { MenuConfig } from '@/types/navigation';
// Import only necessary menu sections
import dashboard from './dashboard';
import exportImportTransit from './export-import-transit';

/**
 * Main menu configuration
 * Clean and focused structure with only essential modules
 */
const menuItems: MenuConfig = {
  items: [
    // Dashboard - Boshqaruv paneli
    dashboard,
    // Export/Import/Transit - Group with 4-5 level deep nesting!
    exportImportTransit,
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
