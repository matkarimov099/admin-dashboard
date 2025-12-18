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
    previewColor: '#b45309',
  },
  {
    value: 'blue',
    label: 'Blue',
    previewColor: '#2563eb',
  },
  {
    value: 'indigo',
    label: 'Indigo',
    previewColor: '#4f46e5',
  },
  {
    value: 'orange',
    label: 'Orange',
    previewColor: '#ea580c',
  },
  {
    value: 'purple',
    label: 'Purple',
    previewColor: '#7c3aed',
  },
  {
    value: 'rose',
    label: 'Rose',
    previewColor: '#be123c',
  },
  {
    value: 'teal',
    label: 'Teal',
    previewColor: '#0891b2',
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
    description: 'Modern & professional',
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
    description: 'Friendly & rounded',
  },
  {
    value: 'figtree',
    label: 'Figtree',
    previewFont: 'Figtree, system-ui, sans-serif',
    description: 'Geometric & clean',
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

// ============================
// Theme Color HSL Values
// ============================

export const THEME_COLOR_HSL = {
  amber: {
    50: '38 92% 96%',
    100: '38 84% 90%',
    200: '37 79% 77%',
    300: '36 73% 62%',
    400: '35 69% 46%',
    500: '35 70% 33%',
    600: '32 63% 26%',
    700: '30 58% 20%',
    800: '29 54% 15%',
    900: '28 50% 11%',
    950: '20 51% 6%',
  },
  blue: {
    50: '214 95% 97%',
    100: '211 94% 94%',
    200: '209 89% 85%',
    300: '207 86% 73%',
    400: '205 84% 60%',
    500: '206 83% 50%',
    600: '217 91% 50%',
    700: '216 88% 44%',
    800: '215 84% 37%',
    900: '214 82% 28%',
    950: '220 87% 15%',
  },
  indigo: {
    50: '238 100% 97%',
    100: '234 100% 94%',
    200: '231 100% 85%',
    300: '228 100% 73%',
    400: '225 100% 61%',
    500: '224 100% 50%',
    600: '221 83% 43%',
    700: '220 87% 35%',
    800: '218 91% 26%',
    900: '217 94% 18%',
    950: '218 97% 9%',
  },
  orange: {
    50: '20 100% 97%',
    100: '19 94% 91%',
    200: '18 88% 78%',
    300: '16 85% 63%',
    400: '15 83% 47%',
    500: '14 90% 35%',
    600: '15 85% 32%',
    700: '15 84% 25%',
    800: '15 86% 18%',
    900: '14 93% 11%',
    950: '15 96% 6%',
  },
  purple: {
    50: '268 100% 98%',
    100: '262 100% 94%',
    200: '258 100% 86%',
    300: '256 100% 75%',
    400: '254 100% 63%',
    500: '258 100% 55%',
    600: '262 83% 38%',
    700: '259 84% 30%',
    800: '257 88% 22%',
    900: '256 95% 15%',
    950: '258 98% 7%',
  },
  rose: {
    50: '351 100% 97%',
    100: '349 95% 92%',
    200: '347 93% 82%',
    300: '345 91% 70%',
    400: '343 89% 57%',
    500: '343 84% 47%',
    600: '341 86% 36%',
    700: '340 88% 28%',
    800: '339 92% 20%',
    900: '338 95% 13%',
    950: '341 98% 7%',
  },
  teal: {
    50: '166 76% 97%',
    100: '167 85% 89%',
    200: '168 83% 78%',
    300: '171 77% 64%',
    400: '172 66% 50%',
    500: '173 80% 40%',
    600: '175 84% 32%',
    700: '175 77% 26%',
    800: '176 69% 22%',
    900: '175 61% 19%',
    950: '176 84% 10%',
  },
} as const;