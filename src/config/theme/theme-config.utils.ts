import {
  BACKGROUND_GRADIENTS,
  BORDER_RADIUS_OPTIONS,
  BORDER_RADIUS_VALUES,
  CSS_FONT_FAMILIES,
  FONT_FAMILIES,
  HEADER_GRADIENT_VALUES,
  LAYOUT_MODES,
  SHADOW_OPTIONS,
  SHADOW_VALUES,
  SIDEBAR_GRADIENT_VALUES,
  STYLE_VARIANTS,
  THEME_COLOR_HSL,
  THEME_COLORS,
} from './theme-config.constants';
import type { BackgroundGradient, ThemeConfig } from './theme-config.types';

// ============================
// Glassmorphism Color Scheme
// ============================

/**
 * Generate glassmorphism color scheme
 * Uses semi-transparent backgrounds with blur for modern glass effect
 */
function generateGlassmorphismScheme(isDark: boolean) {
  if (isDark) {
    // Dark mode glassmorphism
    return {
      foreground: '#ffffff',
      foregroundSecondary: '#e2e8f0',
      accent: 'rgba(255, 255, 255, 0.1)',
      accentForeground: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.15)',
      active: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.1)',
      separator: 'rgba(255, 255, 255, 0.1)',
      overlay: 'rgba(0, 0, 0, 0.4)',
      ring: 'rgba(255, 255, 255, 0.4)',
      primary: '#60a5fa',
      primaryForeground: '#0f172a',
    };
  } else {
    // Light mode glassmorphism
    return {
      foreground: '#0f172a',
      foregroundSecondary: '#475569',
      accent: 'rgba(255, 255, 255, 0.5)',
      accentForeground: '#0f172a',
      hover: 'rgba(255, 255, 255, 0.6)',
      active: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.3)',
      separator: 'rgba(255, 255, 255, 0.2)',
      overlay: 'rgba(255, 255, 255, 0.5)',
      ring: 'rgba(15, 23, 42, 0.3)',
      primary: '#1e40af',
      primaryForeground: '#ffffff',
    };
  }
}

// ============================
// CSS Variable Generation
// ============================

/**
 * Converts gradient to appropriate mode (light/dark) based on current theme
 */
function convertGradientForTheme(
  gradient: BackgroundGradient,
  isDark: boolean
): BackgroundGradient {
  if (gradient === 'default') return gradient;

  // Extract number from gradient (e.g., 'light-gradient1' -> '1')
  const match = gradient.match(/(\d+)$/);
  if (!match) return gradient;

  const number = match[1];

  // Convert to appropriate mode
  return (isDark ? `dark-gradient${number}` : `light-gradient${number}`) as BackgroundGradient;
}

/**
 * Generates CSS variables object from theme config
 * These will be applied to document.documentElement.style
 */
export function generateCSSVariables(config: ThemeConfig): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Detect current theme mode
  const isDark =
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  // Convert gradients to appropriate mode based on current theme
  const sidebarGradient = convertGradientForTheme(config.sidebarGradient, isDark);
  const headerGradient = convertGradientForTheme(config.headerGradient, isDark);

  // Apply font family
  cssVars['--font-sans'] = CSS_FONT_FAMILIES[config.fontFamily];

  // Apply border radius
  const radiusValues = BORDER_RADIUS_VALUES[config.borderRadius];
  cssVars['--radius-sm'] = radiusValues.sm;
  cssVars['--radius-md'] = radiusValues.md;
  cssVars['--radius-lg'] = radiusValues.lg;

  // Apply shadow
  const shadowValues = SHADOW_VALUES[config.shadow];
  cssVars['--shadow-sm'] = shadowValues.sm;
  cssVars['--shadow-md'] = shadowValues.md;
  cssVars['--shadow-lg'] = shadowValues.lg;

  // Apply global theme colors (safe approach - specific variables only)
  const themeColorValues = THEME_COLOR_HSL[config.themeColor];

  // Convert HSL to hex for CSS variables
  const hslToHex = (h: number, s: number, l: number): string => {
    // Convert percentage to decimal
    s = s / 100;
    l = l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const getHexColor = (hslString: string) => {
    // Parse "H S% L%" format
    const parts = hslString.split(' ');
    const h = Number(parts[0]);
    const s = Number(parts[1].replace('%', ''));
    const l = Number(parts[2].replace('%', ''));
    return hslToHex(h, s, l);
  };

  // Apply theme colors to global CSS variables
  // Use lighter shade (400) in dark mode for better contrast, darker shade (600) in light mode
  const primaryShade = isDark ? 400 : 600;
  const primaryHoverShade = isDark ? 500 : 700;
  const primaryDarkShade = isDark ? 600 : 800;

  cssVars['--color-primary'] = getHexColor(themeColorValues[primaryShade]);
  cssVars['--color-primary-hover'] = getHexColor(themeColorValues[primaryHoverShade]);
  cssVars['--color-primary-light'] = getHexColor(themeColorValues[50]);
  cssVars['--color-primary-dark'] = getHexColor(themeColorValues[primaryDarkShade]);

  // Apply theme colors to sidebar variables
  // Use lighter shade (400) in dark mode for better contrast on sidebar
  const sidebarPrimaryShade = isDark ? 400 : 600;
  cssVars['--sidebar-primary'] = getHexColor(themeColorValues[sidebarPrimaryShade]);
  cssVars['--sidebar-primary-foreground'] = '#ffffff';
  cssVars['--sidebar-accent'] = getHexColor(themeColorValues[50]);
  cssVars['--sidebar-accent-foreground'] = getHexColor(themeColorValues[700]);
  cssVars['--sidebar-ring'] = getHexColor(themeColorValues[sidebarPrimaryShade]);

  // Keep success, warning, error colors constant but could be themed later
  cssVars['--color-success'] = '#22c55e';
  cssVars['--color-warning'] = '#f59e0b';
  cssVars['--color-error'] = '#ef4444';
  cssVars['--color-info'] = '#06b6d4';

  // Apply background gradients with glassmorphism effect
  if (sidebarGradient !== 'default') {
    const gradientValue = SIDEBAR_GRADIENT_VALUES[sidebarGradient];
    cssVars['--sidebar-gradient'] = gradientValue;

    // Generate glassmorphism color scheme
    const glassScheme = generateGlassmorphismScheme(isDark);

    cssVars['--sidebar-foreground'] = glassScheme.foreground;
    cssVars['--sidebar-primary-foreground'] = glassScheme.foreground;
    cssVars['--sidebar-foreground-secondary'] = glassScheme.foregroundSecondary;
    cssVars['--sidebar-accent'] = glassScheme.accent;
    cssVars['--sidebar-accent-foreground'] = glassScheme.accentForeground;
    cssVars['--sidebar-hover'] = glassScheme.hover;
    cssVars['--sidebar-active'] = glassScheme.active;
    cssVars['--sidebar-border'] = glassScheme.border;
    cssVars['--sidebar-separator'] = glassScheme.separator;
    cssVars['--sidebar-overlay'] = glassScheme.overlay;
    cssVars['--sidebar-ring'] = glassScheme.ring;
    cssVars['--sidebar-primary'] = glassScheme.primary;
    cssVars['--sidebar-primary-foreground'] = glassScheme.primaryForeground;
  }

  if (headerGradient !== 'default') {
    const gradientValue = HEADER_GRADIENT_VALUES[headerGradient];
    cssVars['--header-gradient'] = gradientValue;

    // Generate glassmorphism color scheme
    const glassScheme = generateGlassmorphismScheme(isDark);

    cssVars['--header-foreground'] = glassScheme.foreground;
    cssVars['--header-foreground-secondary'] = glassScheme.foregroundSecondary;
    cssVars['--header-accent'] = glassScheme.accent;
    cssVars['--header-accent-foreground'] = glassScheme.accentForeground;
    cssVars['--header-hover'] = glassScheme.hover;
    cssVars['--header-active'] = glassScheme.active;
    cssVars['--header-border'] = glassScheme.border;
    cssVars['--header-separator'] = glassScheme.separator;
    cssVars['--header-overlay'] = glassScheme.overlay;
    cssVars['--header-ring'] = glassScheme.ring;
    cssVars['--header-primary'] = glassScheme.primary;
    cssVars['--header-primary-foreground'] = glassScheme.primaryForeground;
  }

  return cssVars;
}

// ============================
// Randomization
// ============================

export function randomizeConfig(): ThemeConfig {
  const getRandomItem = <T>(array: readonly { value: T }[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex].value;
  };

  return {
    styleVariant: getRandomItem(STYLE_VARIANTS),
    themeColor: getRandomItem(THEME_COLORS),
    fontFamily: getRandomItem(FONT_FAMILIES),
    borderRadius: getRandomItem(BORDER_RADIUS_OPTIONS),
    shadow: getRandomItem(SHADOW_OPTIONS),
    layoutMode: getRandomItem(LAYOUT_MODES),
    sidebarGradient: getRandomItem(BACKGROUND_GRADIENTS),
    headerGradient: getRandomItem(BACKGROUND_GRADIENTS),
  };
}
