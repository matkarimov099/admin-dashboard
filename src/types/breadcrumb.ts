import type { MenuItemConfig } from './navigation';

/**
 * Breadcrumb item interface
 * Used for navigation breadcrumbs
 */
export interface BreadcrumbItem {
    title: string;
    titleKey?: string;
    url?: string;
    isActive?: boolean;
}

/**
 * Internal breadcrumb path item (for nested navigation)
 */
export interface BreadcrumbPathItem {
    item: MenuItemConfig;
    path: string;
    level: number;
}
