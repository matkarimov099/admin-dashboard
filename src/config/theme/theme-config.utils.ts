import {
  BACKGROUND_GRADIENT_VALUES,
  BORDER_RADIUS_OPTIONS,
  BORDER_RADIUS_VALUES,
  CSS_FONT_FAMILIES,
  FONT_FAMILIES,
  LAYOUT_MODES,
  SHADOW_OPTIONS,
  SHADOW_VALUES,
  THEME_COLOR_HSL,
  THEME_COLORS,
} from './theme-config.constants';
import type { ThemeConfig } from './theme-config.types';

// ============================
// CSS Variable Generation
// ============================

/**
 * Generates CSS variables object from theme config
 * These will be applied to document.documentElement.style
 * @param config - Theme configuration
 * @param isDark - Optional explicit dark mode flag (if not provided, reads from DOM)
 */
export function generateCSSVariables(
  config: ThemeConfig,
  isDark?: boolean
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Detect the current theme mode if not explicitly provided
  if (isDark === undefined) {
    isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  }

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

  // Static orange color for icons (always orange-600 from theme, matches --color-primary when orange theme is selected)
  const orangeColorValues = THEME_COLOR_HSL.orange;
  cssVars['--color-orange-static'] = getHexColor(orangeColorValues[600]);

  // Apply background gradients (only in light mode)
  const gradientKey = config.backgroundGradient || 'default';
  const gradientValues = BACKGROUND_GRADIENT_VALUES[gradientKey];

  if (!isDark && gradientKey !== 'default') {
    // Apply gradient values in light mode
    cssVars['--sidebar-gradient'] = gradientValues.sidebar;
    cssVars['--header-gradient'] = gradientValues.header;

    // Override ALL text colors to white for gradient backgrounds
    cssVars['--sidebar-foreground'] = '#ffffff';
    cssVars['--header-foreground'] = '#ffffff';

    // Override sidebar colors for gradient backgrounds
    cssVars['--sidebar-primary'] = gradientValues.sidebarPrimary;
    cssVars['--sidebar-primary-foreground'] = gradientValues.sidebarPrimaryForeground;
    cssVars['--sidebar-accent'] = gradientValues.sidebarAccent;
    cssVars['--sidebar-accent-foreground'] = '#ffffff';

    // Override label colors for sidebar/header when gradient is active
    cssVars['--sidebar-ring'] = '#ffffff';

    // Override breadcrumb and other text in header
    cssVars['--gradient-text-color'] = '#ffffff';
    cssVars['--gradient-text-muted'] = 'rgba(255, 255, 255, 0.7)';
    cssVars['--gradient-border-color'] = 'rgba(255, 255, 255, 0.2)';
  } else {
    // Reset ALL gradient values in dark mode or when default is selected
    cssVars['--sidebar-gradient'] = 'var(--sidebar-bg)';
    cssVars['--header-gradient'] = 'var(--card-bg)';

    // Reset foreground colors to defaults
    cssVars['--sidebar-foreground'] = 'var(--label)';
    cssVars['--header-foreground'] = 'var(--label)';

    // Reset sidebar colors to theme defaults (re-apply from theme color)
    const resetSidebarPrimaryShade = isDark ? 400 : 600;
    cssVars['--sidebar-primary'] = getHexColor(themeColorValues[resetSidebarPrimaryShade]);
    cssVars['--sidebar-primary-foreground'] = '#ffffff';
    cssVars['--sidebar-accent'] = isDark ? 'var(--control-ghost-bg)' : getHexColor(themeColorValues[50]);
    cssVars['--sidebar-accent-foreground'] = isDark ? 'var(--label)' : getHexColor(themeColorValues[700]);
    cssVars['--sidebar-ring'] = getHexColor(themeColorValues[resetSidebarPrimaryShade]);

    // Reset gradient text colors
    cssVars['--gradient-text-color'] = 'inherit';
    cssVars['--gradient-text-muted'] = 'inherit';
    cssVars['--gradient-border-color'] = 'var(--border)';
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
    themeColor: getRandomItem(THEME_COLORS),
    fontFamily: getRandomItem(FONT_FAMILIES),
    borderRadius: getRandomItem(BORDER_RADIUS_OPTIONS),
    shadow: getRandomItem(SHADOW_OPTIONS),
    layoutMode: getRandomItem(LAYOUT_MODES),
    backgroundGradient: 'default', // Keep gradient as default on randomize
  };
}
