// ============================
// Theme Configuration Types
// ============================

// Style Variants
export type StyleVariant = 'vega' | 'nova' | 'maia' | 'mira';

// Base Colors (neutral tones for backgrounds, borders)
export type BaseColor = 'neutral' | 'zinc' | 'gray' | 'slate';

// Theme Colors (accent colors for interactive elements)
export type ThemeColor =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'purple'
  | 'red'
  | 'rose'
  | 'teal'
  | 'yellow';

// Font Families
export type FontFamily = 'inter' | 'noto-sans' | 'nunito-sans' | 'figtree';

// Border Radius Options
export type BorderRadius = 'none' | 'small' | 'default' | 'medium' | 'large';

// Shadow Options
export type Shadow = 'none' | 'small' | 'default' | 'medium' | 'large';

// ============================
// Configuration Interfaces
// ============================

// Main theme configuration
export interface ThemeConfig {
  styleVariant: StyleVariant;
  baseColor: BaseColor;
  themeColor: ThemeColor;
  fontFamily: FontFamily;
  borderRadius: BorderRadius;
  shadow: Shadow;
}

// Context value interface
export interface ThemeConfigContextValue {
  config: ThemeConfig;
  setStyleVariant: (variant: StyleVariant) => void;
  setBaseColor: (color: BaseColor) => void;
  setThemeColor: (color: ThemeColor) => void;
  setFontFamily: (font: FontFamily) => void;
  setBorderRadius: (radius: BorderRadius) => void;
  setShadow: (shadow: Shadow) => void;
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
