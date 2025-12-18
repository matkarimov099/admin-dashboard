import { GOOGLE_FONTS_MAP } from '@/config/theme/theme-config.constants';
import type { FontFamily } from '@/config/theme/theme-config.types';

// ============================
// Google Fonts Dynamic Loader (Optimized)
// ============================

// Cache for loaded fonts to prevent duplicate loading
const loadedFonts = new Set<string>();
const loadingFonts = new Set<string>();

/**
 * Dynamically loads a Google Font with caching and optimization
 * Uses font-display: swap for better performance
 * Prevents duplicate loading with proper caching
 *
 * @param fontFamily - The font family to load
 */
export function loadGoogleFont(fontFamily: FontFamily): void {
  // Check if font is already loaded or loading
  if (loadedFonts.has(fontFamily) || loadingFonts.has(fontFamily)) {
    return;
  }

  loadingFonts.add(fontFamily);

  // Create font URL with display=swap for better performance
  const baseUrl = GOOGLE_FONTS_MAP[fontFamily];
  const optimizedUrl = baseUrl.includes('?')
    ? `${baseUrl}&display=swap`
    : `${baseUrl}?display=swap`;

  // Create link element with proper attributes
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = optimizedUrl;
  link.setAttribute('data-font-family', fontFamily);
  link.setAttribute('crossorigin', 'anonymous');

  // Add load event listener
  link.onload = () => {
    loadedFonts.add(fontFamily);
    loadingFonts.delete(fontFamily);
  };

  link.onerror = () => {
    loadingFonts.delete(fontFamily);
    console.warn(`Failed to load font: ${fontFamily}`);
  };

  // Remove existing font link for the same font (if any)
  const existing = document.querySelector(`[data-font-family="${fontFamily}"]`);
  if (existing && existing !== link) {
    existing.remove();
  }

  // Append to head
  document.head.appendChild(link);
}

/**
 * Preloads a Google Font for better performance
 * Uses proper prefetch hints and priority loading
 *
 * @param fontFamily - The font family to preload
 */
export function preloadGoogleFont(fontFamily: FontFamily): void {
  // Don't preload if already loaded or loading
  if (loadedFonts.has(fontFamily) || loadingFonts.has(fontFamily)) {
    return;
  }

  // Create preload link with proper attributes
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'font';
  preloadLink.type = 'font/woff2';
  preloadLink.href = GOOGLE_FONTS_MAP[fontFamily].replace('css', 'woff2');
  preloadLink.setAttribute('crossorigin', 'anonymous');
  preloadLink.setAttribute('data-font-preload', fontFamily);

  document.head.appendChild(preloadLink);

  // Also prefetch the CSS
  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.as = 'style';
  prefetchLink.href = GOOGLE_FONTS_MAP[fontFamily];
  prefetchLink.setAttribute('data-font-prefetch', fontFamily);

  document.head.appendChild(prefetchLink);
}

/**
 * Preloads critical fonts for better initial load performance
 * Should be called on app initialization
 */
export function preloadCriticalFonts(): void {
  const criticalFonts: FontFamily[] = ['Inter', 'Noto Sans'];
  criticalFonts.forEach(font => preloadGoogleFont(font));
}

/**
 * Checks if a font is loaded
 *
 * @param fontFamily - The font family to check
 */
export function isFontLoaded(fontFamily: FontFamily): boolean {
  return loadedFonts.has(fontFamily);
}

/**
 * Gets list of all loaded fonts
 */
export function getLoadedFonts(): string[] {
  return Array.from(loadedFonts);
}
