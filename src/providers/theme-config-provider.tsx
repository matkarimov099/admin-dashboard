import { createContext, type ReactNode, useEffect, useState } from 'react';
import { DEFAULT_THEME_CONFIG } from '@/config/theme/theme-config.defaults';
import type {
  BackgroundGradient,
  BorderRadius,
  FontFamily,
  LayoutMode,
  Shadow,
  StyleVariant,
  ThemeColor,
  ThemeConfig,
  ThemeConfigContextValue,
} from '@/config/theme/theme-config.types';
import { generateCSSVariables, randomizeConfig } from '@/config/theme/theme-config.utils';
import { useTheme } from '@/hooks/use-theme';
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
      const { ...configWithoutBaseColor } = parsed;

      // Clean up old theme colors
      const validThemeColors = ['amber', 'blue', 'indigo', 'orange', 'purple', 'rose', 'teal'];
      if (!validThemeColors.includes(configWithoutBaseColor.themeColor)) {
        configWithoutBaseColor.themeColor = 'blue';
      }

      // Add default gradient values if missing
      const validGradients = [
        'default',
        'light-gradient1',
        'light-gradient2',
        'light-gradient3',
        'light-gradient4',
        'light-gradient5',
        'dark-gradient1',
        'dark-gradient2',
        'dark-gradient3',
        'dark-gradient4',
        'dark-gradient5',
      ];
      if (
        !configWithoutBaseColor.sidebarGradient ||
        !validGradients.includes(configWithoutBaseColor.sidebarGradient)
      ) {
        configWithoutBaseColor.sidebarGradient = DEFAULT_THEME_CONFIG.sidebarGradient;
      }
      if (
        !configWithoutBaseColor.headerGradient ||
        !validGradients.includes(configWithoutBaseColor.headerGradient)
      ) {
        configWithoutBaseColor.headerGradient = DEFAULT_THEME_CONFIG.headerGradient;
      }

      // Save cleaned config if needed
      if (
        parsed.baseColor ||
        !validThemeColors.includes(parsed.themeColor) ||
        !parsed.sidebarGradient ||
        !parsed.headerGradient
      ) {
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
  setLayoutMode: () => null,
  setSidebarGradient: () => null,
  setHeaderGradient: () => null,
  randomize: () => null,
  reset: () => null,
};

export const ThemeConfigContext = createContext<ThemeConfigContextValue>(initialContextValue);

interface ThemeConfigProviderProps {
  children: ReactNode;
  defaultConfig?: ThemeConfig;
}

export function ThemeConfigProvider({ children }: ThemeConfigProviderProps) {
  // Track theme mode changes to update CSS variables
  const { theme } = useTheme();

  // Resolve actual theme mode (handle 'system' setting)
  const getResolvedTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  };

  const isDarkMode = getResolvedTheme() === 'dark';

  // Initialize with a synchronous load
  const [config, setConfig] = useState<ThemeConfig>(() => {
    const initialConfig = loadInitialConfig();

    // Apply CSS variables immediately during initialization
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const cssVars = generateCSSVariables(initialConfig);
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Remove gradient variables if 'default' is selected
      if (initialConfig.sidebarGradient === 'default') {
        root.style.removeProperty('--sidebar-gradient');
        root.style.removeProperty('--sidebar-foreground');
        root.style.removeProperty('--sidebar-primary-foreground');
        root.style.removeProperty('--sidebar-accent');
        root.style.removeProperty('--sidebar-accent-foreground');
        root.style.removeProperty('--sidebar-ring');
        root.style.removeProperty('--sidebar-primary');
        root.removeAttribute('data-sidebar-gradient-active');
      } else {
        root.setAttribute('data-sidebar-gradient-active', 'true');
      }
      if (initialConfig.headerGradient === 'default') {
        root.style.removeProperty('--header-gradient');
        root.style.removeProperty('--header-foreground');
        root.style.removeProperty('--header-accent');
        root.style.removeProperty('--header-accent-foreground');
        root.style.removeProperty('--header-primary');
      }
    }

    return initialConfig;
  });

  // Update CSS variables when config or theme mode changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const cssVars = generateCSSVariables(config, isDarkMode);
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Remove gradient variables if 'default' is selected
    if (config.sidebarGradient === 'default') {
      root.style.removeProperty('--sidebar-gradient');
      root.style.removeProperty('--sidebar-foreground');
      root.style.removeProperty('--sidebar-primary-foreground');
      root.style.removeProperty('--sidebar-accent');
      root.style.removeProperty('--sidebar-accent-foreground');
      root.style.removeProperty('--sidebar-ring');
      root.style.removeProperty('--sidebar-primary');
      root.removeAttribute('data-sidebar-gradient-active');
    } else {
      root.setAttribute('data-sidebar-gradient-active', 'true');
    }
    if (config.headerGradient === 'default') {
      root.style.removeProperty('--header-gradient');
      root.style.removeProperty('--header-foreground');
      root.style.removeProperty('--header-accent');
      root.style.removeProperty('--header-accent-foreground');
      root.style.removeProperty('--header-primary');
    }
  }, [config, isDarkMode]);

  // Listen to system theme changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      const isSystemDark = mediaQuery.matches;
      const root = document.documentElement;
      const cssVars = generateCSSVariables(config, isSystemDark);
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Remove gradient variables if 'default' is selected
      if (config.sidebarGradient === 'default') {
        root.style.removeProperty('--sidebar-gradient');
        root.style.removeProperty('--sidebar-foreground');
        root.style.removeProperty('--sidebar-primary-foreground');
        root.style.removeProperty('--sidebar-accent');
        root.style.removeProperty('--sidebar-accent-foreground');
        root.style.removeProperty('--sidebar-ring');
        root.style.removeProperty('--sidebar-primary');
        root.removeAttribute('data-sidebar-gradient-active');
      } else {
        root.setAttribute('data-sidebar-gradient-active', 'true');
      }
      if (config.headerGradient === 'default') {
        root.style.removeProperty('--header-gradient');
        root.style.removeProperty('--header-foreground');
        root.style.removeProperty('--header-accent');
        root.style.removeProperty('--header-accent-foreground');
        root.style.removeProperty('--header-primary');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [config, theme]);

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

  const setLayoutMode = (mode: LayoutMode) => {
    setConfig(prev => ({ ...prev, layoutMode: mode }));
  };

  const setSidebarGradient = (gradient: BackgroundGradient) => {
    setConfig(prev => ({ ...prev, sidebarGradient: gradient }));
  };

  const setHeaderGradient = (gradient: BackgroundGradient) => {
    setConfig(prev => ({ ...prev, headerGradient: gradient }));
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
    setLayoutMode,
    setSidebarGradient,
    setHeaderGradient,
    randomize,
    reset,
  };

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}
