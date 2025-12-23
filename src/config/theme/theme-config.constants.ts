import type {
  BackgroundGradient,
  BorderRadius,
  FontFamily,
  LayoutMode,
  Shadow,
  StyleVariant,
  ThemeColor,
  ThemeOption,
} from './theme-config.types';

// ============================
// Style Variant Options
// ============================

// ============================
// Layout Mode Options
// ============================

export const LAYOUT_MODES: ThemeOption<LayoutMode>[] = [
  {
    value: 'vertical',
    label: 'Vertical',
    description: 'Sidebar with vertical navigation',
  },
  {
    value: 'horizontal',
    label: 'Horizontal',
    description: 'Navigation in top header bar',
  },
  {
    value: 'compact',
    label: 'Compact',
    description: 'Collapsed sidebar with icons only',
  },
];

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
// Theme Color Options
// ============================

export const THEME_COLORS: ThemeOption<ThemeColor>[] = [
  {
    value: 'gray',
    label: 'Gray',
    previewColor: '#374151',
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
    previewFont: 'Inter, ui-sans-serif, system-ui, sans-serif',
    description: 'Modern & professional',
  },
  {
    value: 'noto-sans',
    label: 'Noto Sans',
    previewFont: 'Noto Sans, ui-sans-serif, system-ui, sans-serif',
    description: 'Multi-language support',
  },
  {
    value: 'nunito-sans',
    label: 'Nunito Sans',
    previewFont: 'Nunito Sans, ui-sans-serif, system-ui, sans-serif',
    description: 'Friendly & rounded',
  },
  {
    value: 'figtree',
    label: 'Figtree',
    previewFont: 'Figtree, ui-sans-serif, system-ui, sans-serif',
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
  inter:
    'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'noto-sans':
    '"Noto Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'nunito-sans':
    '"Nunito Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  figtree:
    'Figtree, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
} as const;

// ============================
// Google Fonts Mappings
// ============================

export const GOOGLE_FONTS_MAP = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'noto-sans':
    'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap',
  'nunito-sans':
    'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap',
  figtree: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap',
} as const;

// ============================
// Theme Color HSL Values
// ============================

export const THEME_COLOR_HSL = {
  gray: {
    50: '220 13% 91%',
    100: '220 13% 86%',
    200: '220 13% 81%',
    300: '220 12% 71%',
    400: '220 11% 56%',
    500: '220 11% 46%',
    600: '220 10% 33%',
    700: '220 10% 25%',
    800: '220 9% 15%',
    900: '220 9% 9%',
    950: '220 10% 3%',
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

// ============================
// Background Gradient Options
// ============================

// Light mode gradients - bright and vibrant
export const LIGHT_MODE_GRADIENTS: ThemeOption<BackgroundGradient>[] = [
  {
    value: 'default',
    label: 'None',
    description: 'Solid color (no gradient)',
    previewColor: '',
  },
  {
    value: 'light-gradient1',
    label: 'Sky Blue',
    description: 'Soft blue sky gradient',
    previewColor: 'linear-gradient(135deg, #a8e0ff 0%, #c3f0ff 100%)',
  },
  {
    value: 'light-gradient2',
    label: 'Sunset Pink',
    description: 'Warm pink sunset',
    previewColor: 'linear-gradient(135deg, #ffd4e5 0%, #ffe5ec 100%)',
  },
  {
    value: 'light-gradient3',
    label: 'Mint Fresh',
    description: 'Fresh mint gradient',
    previewColor: 'linear-gradient(135deg, #c3fae8 0%, #d4f4e8 100%)',
  },
  {
    value: 'light-gradient4',
    label: 'Lavender Dream',
    description: 'Soft lavender gradient',
    previewColor: 'linear-gradient(135deg, #e3d5ff 0%, #f0e7ff 100%)',
  },
];

// Dark mode gradients - deep and contrasting
export const DARK_MODE_GRADIENTS: ThemeOption<BackgroundGradient>[] = [
  {
    value: 'default',
    label: 'None',
    description: 'Solid color (no gradient)',
    previewColor: '',
  },
  {
    value: 'dark-gradient1',
    label: 'Ocean Deep',
    description: 'Deep ocean blue',
    previewColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    value: 'dark-gradient2',
    label: 'Crimson Night',
    description: 'Dark crimson gradient',
    previewColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    value: 'dark-gradient3',
    label: 'Midnight Blue',
    description: 'Dark midnight blue',
    previewColor: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  },
  {
    value: 'dark-gradient4',
    label: 'Purple Haze',
    description: 'Deep purple gradient',
    previewColor: 'linear-gradient(135deg, #5b247a 0%, #1e3799 100%)',
  },
];

// Combined list for all gradients
export const BACKGROUND_GRADIENTS = [...LIGHT_MODE_GRADIENTS, ...DARK_MODE_GRADIENTS];

// Gradient color schemes for text and interactive elements
export const GRADIENT_COLOR_SCHEMES = {
  default: {
    foreground: 'default',
    accent: 'default',
    accentForeground: 'default',
    ring: 'default',
  },
  // Light mode gradients - use dark text on light backgrounds
  'light-gradient1': {
    foreground: '#0f172a',
    accent: 'rgba(15, 23, 42, 0.1)',
    accentForeground: '#0f172a',
    ring: 'rgba(15, 23, 42, 0.25)',
    primary: '#0f172a',
  },
  'light-gradient2': {
    foreground: '#0f172a',
    accent: 'rgba(15, 23, 42, 0.1)',
    accentForeground: '#0f172a',
    ring: 'rgba(15, 23, 42, 0.25)',
    primary: '#0f172a',
  },
  'light-gradient3': {
    foreground: '#0f172a',
    accent: 'rgba(15, 23, 42, 0.1)',
    accentForeground: '#0f172a',
    ring: 'rgba(15, 23, 42, 0.25)',
    primary: '#0f172a',
  },
  'light-gradient4': {
    foreground: '#0f172a',
    accent: 'rgba(15, 23, 42, 0.1)',
    accentForeground: '#0f172a',
    ring: 'rgba(15, 23, 42, 0.25)',
    primary: '#0f172a',
  },
  // Dark mode gradients - use white text on dark backgrounds
  'dark-gradient1': {
    foreground: '#ffffff',
    accent: 'rgba(255, 255, 255, 0.15)',
    accentForeground: '#ffffff',
    ring: 'rgba(255, 255, 255, 0.3)',
    primary: '#ffffff',
  },
  'dark-gradient2': {
    foreground: '#ffffff',
    accent: 'rgba(255, 255, 255, 0.15)',
    accentForeground: '#ffffff',
    ring: 'rgba(255, 255, 255, 0.3)',
    primary: '#ffffff',
  },
  'dark-gradient3': {
    foreground: '#ffffff',
    accent: 'rgba(255, 255, 255, 0.15)',
    accentForeground: '#ffffff',
    ring: 'rgba(255, 255, 255, 0.3)',
    primary: '#ffffff',
  },
  'dark-gradient4': {
    foreground: '#ffffff',
    accent: 'rgba(255, 255, 255, 0.15)',
    accentForeground: '#ffffff',
    ring: 'rgba(255, 255, 255, 0.3)',
    primary: '#ffffff',
  },
} as const;

export const GRADIENT_VALUES = {
  default: 'none',
  // Light mode gradients
  'light-gradient1': 'linear-gradient(135deg, #a8e0ff 0%, #c3f0ff 100%)',
  'light-gradient2': 'linear-gradient(135deg, #ffd4e5 0%, #ffe5ec 100%)',
  'light-gradient3': 'linear-gradient(135deg, #c3fae8 0%, #d4f4e8 100%)',
  'light-gradient4': 'linear-gradient(135deg, #e3d5ff 0%, #f0e7ff 100%)',
  // Dark mode gradients
  'dark-gradient1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'dark-gradient2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'dark-gradient3': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  'dark-gradient4': 'linear-gradient(135deg, #5b247a 0%, #1e3799 100%)',
} as const;
