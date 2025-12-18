import type { ThemeConfig } from './theme-config.types';

// ============================
// Default Theme Configuration
// ============================

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  styleVariant: 'vega',
  baseColor: 'slate',
  themeColor: 'blue',
  fontFamily: 'inter',
  borderRadius: 'default',
  shadow: 'default',
};

// ============================
// localStorage Key
// ============================

export const STORAGE_KEY = 'ui-theme-config';
