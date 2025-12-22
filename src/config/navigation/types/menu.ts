import type { ComponentType, ReactNode } from 'react';
import type { Role } from '@/types/common.ts';

/**
 * Menu item types - based on cargo-customs structure
 */
export type MenuItemType = 'group' | 'collapse' | 'item';

/**
 * Enhanced menu item configuration interface
 * Inspired by cargo-customs structure with support for:
 * - Multi-level nesting (3+ levels)
 * - Breadcrumb control
 * - Menu groups
 * - Advanced features (chips, badges, actions)
 */
export interface EnhancedMenuItemConfig {
  // Core properties
  id: string; // Unique identifier
  title: string | ReactNode; // Translation key or React node
  type: MenuItemType; // Type of menu item

  // Navigation
  path?: string; // Route path
  url?: string; // Alternative URL (for external links)
  link?: string; // Alternative link property

  // Visual
  icon?: ReactNode; // Icon component
  color?: 'primary' | 'secondary' | 'default'; // Color variant

  // Nesting - Supports unlimited levels
  children?: EnhancedMenuItemConfig[]; // Nested menu items (for collapse and group)
  items?: EnhancedMenuItemConfig[]; // Alternative children array (for backward compatibility)

  // Access control
  roles?: Role[]; // Allowed roles
  disabled?: boolean; // Disable menu item

  // External links
  external?: boolean; // Is external URL
  target?: '_blank' | '_self'; // Link target

  // UI enhancements
  chip?: {
    label: string;
    color?: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  }; // Badge/chip
  badge?: number; // Numeric badge

  // Breadcrumb control
  breadcrumbs?: boolean; // Show/hide in breadcrumb trail (default: true)

  // Dropdown behavior
  isDropdown?: boolean; // Use dropdown menu instead of collapse

  // Component lazy loading
  component?: ComponentType; // Lazy-loaded component

  // Additional metadata
  caption?: ReactNode | string; // Group caption/description
  search?: string; // Search keywords
}

/**
 * Menu group configuration
 * Top-level menu sections with headers
 */
export interface MenuGroupConfig {
  id: string;
  title: string | ReactNode;
  type: 'group';
  icon?: ReactNode;
  caption?: ReactNode | string;
  children: EnhancedMenuItemConfig[];
  roles?: Role[];
}

/**
 * Menu configuration structure
 */
export interface MenuConfig {
  items: (EnhancedMenuItemConfig | MenuGroupConfig)[];
}

/**
 * Legacy menu item configuration (backward compatibility)
 * This is the old structure from app-menu.tsx
 */
export interface LegacyMenuItemConfig {
  title: string;
  path: string;
  icon?: ReactNode;
  roles?: Role[];
  component?: ComponentType;
  items?: LegacyMenuSubItemConfig[];
  disabled?: boolean;
}

/**
 * Legacy sub-menu item configuration
 */
export interface LegacyMenuSubItemConfig {
  title: string;
  path: string;
  icon?: ReactNode;
  roles?: Role[];
  component?: ComponentType;
  disabled?: boolean;
}

/**
 * Helper type to extract nested menu items
 */
export type FlatMenuItem = EnhancedMenuItemConfig & {
  level: number; // Nesting level (0 = top level, 1 = first nested, etc.)
  parentId?: string; // Parent menu item ID
};
