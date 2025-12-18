import { createContext, type ReactNode, useEffect, useState } from 'react';
import { DEFAULT_THEME_CONFIG } from '@/config/theme/theme-config.defaults';
import type {
  BorderRadius,
  FontFamily,
  Shadow,
  StyleVariant,
  ThemeColor,
  ThemeConfig,
  ThemeConfigContextValue,
} from '@/config/theme/theme-config.types';
import { generateCSSVariables, randomizeConfig } from '@/config/theme/theme-config.utils';
import { loadGoogleFont } from '@/lib/google-fonts';

const STORAGE_KEY = 'ui-theme-config';

// Load config from localStorage synchronously
function loadInitialConfig(): ThemeConfig {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return DEFAULT_THEME_CONFIG;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);

      // Clean up old properties
      const { baseColor, ...configWithoutBaseColor } = parsed;

      // Clean up old theme colors
      const validThemeColors = ['amber', 'blue', 'indigo', 'orange', 'purple', 'rose', 'teal'];
      if (!validThemeColors.includes(configWithoutBaseColor.themeColor)) {
        configWithoutBaseColor.themeColor = 'blue';
      }

      // Save cleaned config if needed
      if (parsed.baseColor || !validThemeColors.includes(parsed.themeColor)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(configWithoutBaseColor));
      }

      return configWithoutBaseColor;
    }
  } catch (error) {
    console.warn('Failed to load theme config:', error);
  }

  return DEFAULT_THEME_CONFIG;
}

const initialContextValue: ThemeConfigContextValue = {
  config: DEFAULT_THEME_CONFIG,
  setStyleVariant: () => null,
  setThemeColor: () => null,
  setFontFamily: () => null,
  setBorderRadius: () => null,
  setShadow: () => null,
  randomize: () => null,
  reset: () => null,
};

export const ThemeConfigContext = createContext<ThemeConfigContextValue>(initialContextValue);

interface ThemeConfigProviderProps {
  children: ReactNode;
  defaultConfig?: ThemeConfig;
}

export function ThemeConfigProvider({
  children,
}: ThemeConfigProviderProps) {
  // Initialize with synchronous load
  const [config, setConfig] = useState<ThemeConfig>(() => {
    const initialConfig = loadInitialConfig();

    // Apply CSS variables immediately
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const cssVars = generateCSSVariables(initialConfig);
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    return initialConfig;
  });

  // Update CSS variables when config changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const cssVars = generateCSSVariables(config);
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [config]);

  // Load Google font when config changes
  useEffect(() => {
    loadGoogleFont(config.fontFamily);
  }, [config.fontFamily]);

  // Save to localStorage when config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }, [config]);

  // Setter functions
  const setStyleVariant = (variant: StyleVariant) => {
    setConfig(prev => ({ ...prev, styleVariant: variant }));
  };

  const setThemeColor = (color: ThemeColor) => {
    setConfig(prev => ({ ...prev, themeColor: color }));
  };

  const setFontFamily = (font: FontFamily) => {
    setConfig(prev => ({ ...prev, fontFamily: font }));
  };

  const setBorderRadius = (radius: BorderRadius) => {
    setConfig(prev => ({ ...prev, borderRadius: radius }));
  };

  const setShadow = (shadow: Shadow) => {
    setConfig(prev => ({ ...prev, shadow: shadow }));
  };

  const randomize = () => {
    const randomConfig = randomizeConfig();
    setConfig(randomConfig);
  };

  const reset = () => {
    setConfig(DEFAULT_THEME_CONFIG);
  };

  const value: ThemeConfigContextValue = {
    config,
    setStyleVariant,
    setThemeColor,
    setFontFamily,
    setBorderRadius,
    setShadow,
    randomize,
    reset,
  };

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}