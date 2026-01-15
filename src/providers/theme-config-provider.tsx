import { createContext, type ReactNode, useEffect, useRef, useState } from 'react';
import { DEFAULT_THEME_CONFIG } from '@/config/theme/theme-config.defaults';
import type {
  BackgroundGradient,
  BorderRadius,
  FontFamily,
  LayoutMode,
  Shadow,
  SidebarVariant,
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

      // Ensure backgroundGradient exists (migration for old configs)
      const validGradients = ['default', 'blue', 'orange', 'indigo', 'green', 'gray'];
      if (!configWithoutBaseColor.backgroundGradient || !validGradients.includes(configWithoutBaseColor.backgroundGradient)) {
        configWithoutBaseColor.backgroundGradient = 'default';
      }

      // Ensure sidebarVariant exists (migration for old configs)
      const validSidebarVariants = ['floating', 'sidebar'];
      if (!configWithoutBaseColor.sidebarVariant || !validSidebarVariants.includes(configWithoutBaseColor.sidebarVariant)) {
        configWithoutBaseColor.sidebarVariant = 'floating';
      }

      // Save cleaned config if needed
      if (parsed.baseColor || !validThemeColors.includes(parsed.themeColor) || !parsed.backgroundGradient || !parsed.sidebarVariant) {
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
  setThemeColor: () => null,
  setFontFamily: () => null,
  setBorderRadius: () => null,
  setShadow: () => null,
  setLayoutMode: () => null,
  setSidebarVariant: () => null,
  setBackgroundGradient: () => null,
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
  }, [config, isDarkMode]);

  // Listen to system theme changes when the theme is 'system'
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

  // Track previous dark mode state
  const prevIsDarkRef = useRef(isDarkMode);

  // Reset gradient when switching to dark mode
  useEffect(() => {
    const wasDark = prevIsDarkRef.current;
    prevIsDarkRef.current = isDarkMode;

    // If switching from light to dark mode, reset gradient to default
    if (isDarkMode && !wasDark && config.backgroundGradient !== 'default') {
      setConfig(prev => ({ ...prev, backgroundGradient: 'default' }));
    }
  }, [isDarkMode, config.backgroundGradient]);

  // Manage data-sidebar-gradient-active attribute on document element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const hasActiveGradient = !isDarkMode && config.backgroundGradient !== 'default';

    if (hasActiveGradient) {
      root.setAttribute('data-sidebar-gradient-active', 'true');
    } else {
      root.removeAttribute('data-sidebar-gradient-active');
    }
  }, [config.backgroundGradient, isDarkMode]);

  // Manage data-layout-mode attribute on document element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-layout-mode', config.layoutMode);
  }, [config.layoutMode]);

  // Save to localStorage when config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }, [config]);

  // Setter functions
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

  const setSidebarVariant = (variant: SidebarVariant) => {
    setConfig(prev => ({ ...prev, sidebarVariant: variant }));
  };

  const setBackgroundGradient = (gradient: BackgroundGradient) => {
    setConfig(prev => ({ ...prev, backgroundGradient: gradient }));
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
    setThemeColor,
    setFontFamily,
    setBorderRadius,
    setShadow,
    setLayoutMode,
    setSidebarVariant,
    setBackgroundGradient,
    randomize,
    reset,
  };

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}
