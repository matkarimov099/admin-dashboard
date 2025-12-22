import type { ComponentType, ReactNode } from 'react';
import type { Role } from '@/types/common.ts';

/**
 * Menu item types
 */
export type MenuItemType = 'group' | 'collapse' | 'item';

/**
 * Menu item configuration interface
 * Supports multi-level nesting, breadcrumb control, and advanced features
 */
export interface MenuItemConfig {
  // Core properties
  id: string;
  title: string | ReactNode;
  type: MenuItemType;

  // Navigation
  path?: string;
  url?: string;
  link?: string;

  // Visual
  icon?: ReactNode;

  // Nesting - Supports unlimited levels
  children?: MenuItemConfig[];
  items?: MenuItemConfig[];

  // Access control
  roles?: Role[];
  disabled?: boolean;

  // External links
  external?: boolean;
  target?: '_blank' | '_self';

  // UI enhancements
  chip?: {
    label: string;
    color?: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  };
  badge?: number;

  // Breadcrumb control
  breadcrumbs?: boolean;

  // Component lazy loading
  component?: ComponentType;

  // Additional metadata
  caption?: ReactNode | string;
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
  children: MenuItemConfig[];
  roles?: Role[];
}

/**
 * Menu configuration structure
 */
export interface MenuConfig {
  items: (MenuItemConfig | MenuGroupConfig)[];
}
