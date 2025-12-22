// ============================
// Theme Configuration Types
// ============================

// Style Variants
export type StyleVariant = 'vega' | 'nova' | 'maia' | 'mira';

// Theme Colors (accent colors for interactive elements)
export type ThemeColor = 'gray' | 'blue' | 'indigo' | 'orange' | 'purple' | 'rose' | 'teal';

// Font Families
export type FontFamily = 'inter' | 'noto-sans' | 'nunito-sans' | 'figtree';

// Border Radius Options
export type BorderRadius = 'none' | 'small' | 'default' | 'medium' | 'large';

// Shadow Options
export type Shadow = 'none' | 'small' | 'default' | 'medium' | 'large';

// Layout Mode Options
export type LayoutMode = 'vertical' | 'horizontal' | 'compact';

// ============================
// Configuration Interfaces
// ============================

// Main theme configuration
export interface ThemeConfig {
  styleVariant: StyleVariant;
  themeColor: ThemeColor;
  fontFamily: FontFamily;
  borderRadius: BorderRadius;
  shadow: Shadow;
  layoutMode: LayoutMode;
}

// Context value interface
export interface ThemeConfigContextValue {
  config: ThemeConfig;
  setStyleVariant: (variant: StyleVariant) => void;
  setThemeColor: (color: ThemeColor) => void;
  setFontFamily: (font: FontFamily) => void;
  setBorderRadius: (radius: BorderRadius) => void;
  setShadow: (shadow: Shadow) => void;
  setLayoutMode: (mode: LayoutMode) => void;
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
