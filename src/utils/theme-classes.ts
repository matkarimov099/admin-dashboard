/**
 * Simple utility to add theme-aware classes to components
 * No HOC, no magic, just a simple helper function
 */
export function getThemeClasses(baseClasses: string): string {
  return `${baseClasses}
          rounded-[var(--radius-md)]
          shadow-[var(--shadow-md)]
          transition-colors duration-[var(--motion-medium)]`;
}

/**
 * For components that need specific theme colors
 */
export function getThemeColorClasses(baseClasses: string): string {
  return `${baseClasses}
          bg-[var(--theme-primary)]
          text-white
          hover:bg-[var(--theme-primary-hover)]`;
}

/**
 * For form elements that need theme-aware borders
 */
export function getThemeInputClasses(baseClasses: string): string {
  return `${baseClasses}
          border
          focus:border-[var(--theme-primary)]
          focus:ring-2
          focus:ring-[var(--theme-primary)]`;
}