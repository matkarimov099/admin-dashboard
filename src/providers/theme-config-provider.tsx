import { createContext, type ReactNode, useEffect, useState } from 'react';
import { DEFAULT_THEME_CONFIG } from '@/config/theme/theme-config.defaults';
import type {
  BaseColor,
  BorderRadius,
  FontFamily,
  Shadow,
  StyleVariant,
  ThemeColor,
  ThemeConfig,
  ThemeConfigContextValue,
} from '@/config/theme/theme-config.types';
import {
  generateCSSVariables,
  loadConfigFromStorage,
  randomizeConfig,
  saveConfigToStorage,
} from '@/config/theme/theme-config.utils';
import { loadGoogleFont } from '@/lib/google-fonts';

// ============================
// Context Definition
// ============================

const initialContextValue: ThemeConfigContextValue = {
  config: DEFAULT_THEME_CONFIG,
  setStyleVariant: () => null,
  setBaseColor: () => null,
  setThemeColor: () => null,
  setFontFamily: () => null,
  setBorderRadius: () => null,
  setShadow: () => null,
  randomize: () => null,
  reset: () => null,
};

export const ThemeConfigContext = createContext<ThemeConfigContextValue>(initialContextValue);

// ============================
// Provider Props
// ============================

interface ThemeConfigProviderProps {
  children: ReactNode;
  defaultConfig?: ThemeConfig;
}

// ============================
// Provider Component
// ============================

export function ThemeConfigProvider({
  children,
  defaultConfig = DEFAULT_THEME_CONFIG,
}: ThemeConfigProviderProps) {
  // Initialize state from localStorage or use default
  const [config, setConfig] = useState<ThemeConfig>(() => {
    const storedConfig = loadConfigFromStorage();
    return storedConfig || defaultConfig;
  });

  // Apply CSS variables and load font whenever config changes
  useEffect(() => {
    const root = document.documentElement;

    // Generate and apply CSS variables
    const cssVars = generateCSSVariables(config);
    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value);
    }

    // Load Google Font
    loadGoogleFont(config.fontFamily);

    // Persist to localStorage
    saveConfigToStorage(config);
  }, [config]);

  // ============================
  // Setter Functions
  // ============================

  const setStyleVariant = (variant: StyleVariant) => {
    setConfig(prev => ({ ...prev, styleVariant: variant }));
  };

  const setBaseColor = (color: BaseColor) => {
    setConfig(prev => ({ ...prev, baseColor: color }));
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

  // ============================
  // Context Value
  // ============================

  const value: ThemeConfigContextValue = {
    config,
    setStyleVariant,
    setBaseColor,
    setThemeColor,
    setFontFamily,
    setBorderRadius,
    setShadow,
    randomize,
    reset,
  };

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}