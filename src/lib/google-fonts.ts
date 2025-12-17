import { GOOGLE_FONTS_MAP } from '@/config/theme/theme-config.constants';
import type { FontFamily } from '@/config/theme/theme-config.types';

// ============================
// Google Fonts Dynamic Loader
// ============================

/**
 * Dynamically loads a Google Font by injecting a <link> element
 * Removes any previously loaded font to prevent accumulation
 *
 * @param fontFamily - The font family to load
 */
export function loadGoogleFont(fontFamily: FontFamily): void {
  // Remove existing font link (if any)
  const existing = document.querySelector('[data-font-family]');
  if (existing) {
    existing.remove();
  }

  // Create new link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = GOOGLE_FONTS_MAP[fontFamily];
  link.setAttribute('data-font-family', fontFamily);

  // Append to head
  document.head.appendChild(link);
}

/**
 * Preloads a Google Font for better performance
 * Should be called before loadGoogleFont for critical fonts
 *
 * @param fontFamily - The font family to preload
 */
export function preloadGoogleFont(fontFamily: FontFamily): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = GOOGLE_FONTS_MAP[fontFamily];

  document.head.appendChild(link);
}
