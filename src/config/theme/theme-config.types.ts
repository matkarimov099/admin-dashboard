// ============================
// Theme Configuration Types
// ============================

// Theme Colors (accent colors for interactive elements)
export type ThemeColor = 'gray' | 'blue' | 'indigo' | 'orange' | 'purple' | 'rose' | 'teal';

// Font Families
export type FontFamily = 'inter' | 'noto-sans' | 'nunito-sans' | 'arial';

// Border Radius Options
export type BorderRadius = 'none' | 'small' | 'default' | 'medium' | 'large';

// Shadow Options
export type Shadow = 'none' | 'small' | 'default' | 'medium' | 'large';

// Layout Mode Options
export type LayoutMode = 'vertical' | 'horizontal' | 'compact';

// Sidebar Variant Options (desktop only)
export type SidebarVariant = 'floating' | 'sidebar';

// Background Gradient Options (light mode only)
export type BackgroundGradient = 'default' | 'blue' | 'orange' | 'indigo' | 'green' | 'gray';

// Body Background Color Options
export type BodyColor = 'default' | 'slate' | 'zinc' | 'stone' | 'sky' | 'emerald';

// ============================
// Configuration Interfaces
// ============================

// Main theme configuration
export interface ThemeConfig {
  themeColor: ThemeColor;
  fontFamily: FontFamily;
  borderRadius: BorderRadius;
  shadow: Shadow;
  layoutMode: LayoutMode;
  sidebarVariant: SidebarVariant;
  backgroundGradient: BackgroundGradient;
  bodyColor: BodyColor;
}

// Context value interface
export interface ThemeConfigContextValue {
  config: ThemeConfig;
  setThemeColor: (color: ThemeColor) => void;
  setFontFamily: (font: FontFamily) => void;
  setBorderRadius: (radius: BorderRadius) => void;
  setShadow: (shadow: Shadow) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setSidebarVariant: (variant: SidebarVariant) => void;
  setBackgroundGradient: (gradient: BackgroundGradient) => void;
  setBodyColor: (color: BodyColor) => void;
  randomize: () => void;
  reset: () => void;
}

// Option interface for UI components
export interface ThemeOption<T> {
  value: T;
  label: string;
  description?: string;
  previewColor?: string; // Hex color for color pickers
  previewFont?: string; // Font name for font pickers
}
