import transit from '@/config/navigation/modules/transit.tsx';
import type { MenuConfig } from '@/types/navigation';

const menuItems: MenuConfig = {
  items: [...transit],
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
