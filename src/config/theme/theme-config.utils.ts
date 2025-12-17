import {
  BORDER_RADIUS_OPTIONS,
  BORDER_RADIUS_VALUES,
  CSS_FONT_FAMILIES,
  FONT_FAMILIES,
  SHADOW_OPTIONS,
  SHADOW_VALUES,
  STYLE_VARIANTS,
  THEME_COLORS,
  BASE_COLORS,
  THEME_COLOR_HSL,
} from './theme-config.constants';
import { DEFAULT_THEME_CONFIG, STORAGE_KEY } from './theme-config.defaults';
import type { ThemeConfig } from './theme-config.types';

// ============================
// CSS Variable Generation
// ============================

/**
 * Generates CSS variables object from theme config
 * These will be applied to document.documentElement.style
 */
export function generateCSSVariables(config: ThemeConfig): Record<string, string> {
  const cssVars: Record<string, string> = {};

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

  // TODO: Apply style variant CSS variables when user provides them
  // This will be added later when user provides STYLE_VARIANT_CSS_VARS mapping

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

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
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
  cssVars['--color-primary'] = getHexColor(themeColorValues[600]);
  cssVars['--color-primary-hover'] = getHexColor(themeColorValues[700]);
  cssVars['--color-primary-light'] = getHexColor(themeColorValues[50]);
  cssVars['--color-primary-dark'] = getHexColor(themeColorValues[800]);

  // Apply theme colors to sidebar variables
  cssVars['--sidebar-primary'] = getHexColor(themeColorValues[600]);
  cssVars['--sidebar-primary-foreground'] = '#ffffff';
  cssVars['--sidebar-accent'] = getHexColor(themeColorValues[50]);
  cssVars['--sidebar-accent-foreground'] = getHexColor(themeColorValues[700]);
  cssVars['--sidebar-ring'] = getHexColor(themeColorValues[600]);

  // Keep success, warning, error colors constant but could be themed later
  cssVars['--color-success'] = '#22c55e';
  cssVars['--color-warning'] = '#f59e0b';
  cssVars['--color-error'] = '#ef4444';
  cssVars['--color-info'] = '#06b6d4';

  return cssVars;
}

// ============================
// Randomization
// ============================

/**
 * Generates a random theme configuration
 */
export function randomizeConfig(): ThemeConfig {
  const getRandomItem = <T>(array: readonly { value: T }[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex].value;
  };

  return {
    styleVariant: getRandomItem(STYLE_VARIANTS),
    baseColor: getRandomItem(BASE_COLORS),
    themeColor: getRandomItem(THEME_COLORS),
    fontFamily: getRandomItem(FONT_FAMILIES),
    borderRadius: getRandomItem(BORDER_RADIUS_OPTIONS),
    shadow: getRandomItem(SHADOW_OPTIONS),
  };
}

// ============================
// localStorage Persistence
// ============================

/**
 * Validates if object is a valid ThemeConfig
 */
function isValidThemeConfig(obj: unknown): obj is ThemeConfig {
  if (!obj || typeof obj !== 'object') return false;

  const config = obj as Partial<ThemeConfig>;

  const validStyleVariants: readonly string[] = STYLE_VARIANTS.map(v => v.value);
  const validBaseColors: readonly string[] = BASE_COLORS.map(v => v.value);
  const validThemeColors: readonly string[] = THEME_COLORS.map(v => v.value);
  const validFonts: readonly string[] = FONT_FAMILIES.map(v => v.value);
  const validRadii: readonly string[] = BORDER_RADIUS_OPTIONS.map(v => v.value);
  const validShadows: readonly string[] = SHADOW_OPTIONS.map(v => v.value);

  return (
    typeof config.styleVariant === 'string' &&
    validStyleVariants.includes(config.styleVariant) &&
    typeof config.baseColor === 'string' &&
    validBaseColors.includes(config.baseColor) &&
    typeof config.themeColor === 'string' &&
    validThemeColors.includes(config.themeColor) &&
    typeof config.fontFamily === 'string' &&
    validFonts.includes(config.fontFamily) &&
    typeof config.borderRadius === 'string' &&
    validRadii.includes(config.borderRadius) &&
    typeof config.shadow === 'string' &&
    validShadows.includes(config.shadow)
  );
}

/**
 * Loads theme config from localStorage
 * Returns null if not found or invalid
 */
export function loadConfigFromStorage(): ThemeConfig | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (isValidThemeConfig(parsed)) {
      return parsed;
    }

    // Invalid data, clear it
    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    // localStorage unavailable or JSON parse error
    console.warn('Failed to load theme config from localStorage:', error);
    return null;
  }
}

/**
 * Saves theme config to localStorage
 */
export function saveConfigToStorage(config: ThemeConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    // localStorage unavailable (SSR, private mode, quota exceeded)
    console.warn('Failed to save theme config to localStorage:', error);
  }
}

/**
 * Resets config to defaults in localStorage
 */
export function resetConfigInStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_THEME_CONFIG));
  } catch (error) {
    console.warn('Failed to reset theme config in localStorage:', error);
  }
}