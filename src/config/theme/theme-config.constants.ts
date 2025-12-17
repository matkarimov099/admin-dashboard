import type {
  BaseColor,
  BorderRadius,
  FontFamily,
  Shadow,
  StyleVariant,
  ThemeColor,
  ThemeOption,
} from './theme-config.types';

// ============================
// Style Variant Options
// ============================

export const STYLE_VARIANTS: ThemeOption<StyleVariant>[] = [
  {
    value: 'vega',
    label: 'Vega',
    description: 'Modern and clean design',
  },
  {
    value: 'nova',
    label: 'Nova',
    description: 'Bold and vibrant style',
  },
  {
    value: 'maia',
    label: 'Maia',
    description: 'Soft and elegant look',
  },
  {
    value: 'mira',
    label: 'Mira',
    description: 'Professional appearance',
  },
];

// ============================
// Base Color Options
// ============================

export const BASE_COLORS: ThemeOption<BaseColor>[] = [
  {
    value: 'neutral',
    label: 'Neutral',
    previewColor: '#737373',
  },
  {
    value: 'zinc',
    label: 'Zinc',
    previewColor: '#71717a',
  },
  {
    value: 'gray',
    label: 'Gray',
    previewColor: '#6b7280',
  },
  {
    value: 'slate',
    label: 'Slate',
    previewColor: '#64748b',
  },
];

// ============================
// Theme Color Options
// ============================

export const THEME_COLORS: ThemeOption<ThemeColor>[] = [
  {
    value: 'amber',
    label: 'Amber',
    previewColor: '#f59e0b',
  },
  {
    value: 'blue',
    label: 'Blue',
    previewColor: '#3b82f6',
  },
  {
    value: 'cyan',
    label: 'Cyan',
    previewColor: '#06b6d4',
  },
  {
    value: 'emerald',
    label: 'Emerald',
    previewColor: '#10b981',
  },
  {
    value: 'green',
    label: 'Green',
    previewColor: '#22c55e',
  },
  {
    value: 'indigo',
    label: 'Indigo',
    previewColor: '#6366f1',
  },
  {
    value: 'orange',
    label: 'Orange',
    previewColor: '#f97316',
  },
  {
    value: 'purple',
    label: 'Purple',
    previewColor: '#a855f7',
  },
  {
    value: 'red',
    label: 'Red',
    previewColor: '#ef4444',
  },
  {
    value: 'rose',
    label: 'Rose',
    previewColor: '#f43f5e',
  },
  {
    value: 'teal',
    label: 'Teal',
    previewColor: '#14b8a6',
  },
  {
    value: 'yellow',
    label: 'Yellow',
    previewColor: '#eab308',
  },
];

// ============================
// Font Family Options
// ============================

export const FONT_FAMILIES: ThemeOption<FontFamily>[] = [
  {
    value: 'inter',
    label: 'Inter',
    previewFont: 'Inter, system-ui, sans-serif',
  },
  {
    value: 'noto-sans',
    label: 'Noto Sans',
    previewFont: 'Noto Sans, system-ui, sans-serif',
    description: 'Multi-language support',
  },
  {
    value: 'nunito-sans',
    label: 'Nunito Sans',
    previewFont: 'Nunito Sans, system-ui, sans-serif',
  },
  {
    value: 'figtree',
    label: 'Figtree',
    previewFont: 'Figtree, system-ui, sans-serif',
  },
];

// ============================
// Border Radius Options
// ============================

export const BORDER_RADIUS_OPTIONS: ThemeOption<BorderRadius>[] = [
  {
    value: 'none',
    label: 'None',
    description: 'No border radius',
  },
  {
    value: 'small',
    label: 'Small',
    description: 'Subtle rounding',
  },
  {
    value: 'default',
    label: 'Default',
    description: 'Medium rounding',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Noticeable rounding',
  },
  {
    value: 'large',
    label: 'Large',
    description: 'Heavy rounding',
  },
];

export const BORDER_RADIUS_VALUES = {
  none: {
    sm: '0',
    md: '0',
    lg: '0',
  },
  small: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  default: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
  },
  medium: {
    sm: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
  },
  large: {
    sm: '0.625rem',
    md: '0.875rem',
    lg: '1.25rem',
  },
} as const;

// ============================
// Shadow Options
// ============================

export const SHADOW_OPTIONS: ThemeOption<Shadow>[] = [
  {
    value: 'none',
    label: 'None',
    description: 'No shadow',
  },
  {
    value: 'small',
    label: 'Small',
    description: 'Subtle shadow',
  },
  {
    value: 'default',
    label: 'Default',
    description: 'Balanced shadow',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Prominent shadow',
  },
  {
    value: 'large',
    label: 'Large',
    description: 'Strong shadow',
  },
];

export const SHADOW_VALUES = {
  none: {
    sm: 'none',
    md: 'none',
    lg: 'none',
  },
  small: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    lg: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  default: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  medium: {
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  large: {
    sm: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    lg: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
} as const;

// ============================
// Font Family CSS Mappings
// ============================

export const CSS_FONT_FAMILIES = {
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'noto-sans': '"Noto Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'nunito-sans': '"Nunito Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  figtree: 'Figtree, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
} as const;

// ============================
// Google Fonts Mappings
// ============================

export const GOOGLE_FONTS_MAP = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'noto-sans': 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap',
  'nunito-sans': 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap',
  figtree: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap',
} as const;