import { useContext } from 'react';
import { ThemeConfigContext } from '@/providers/theme-config-provider';

/**
 * Hook to access theme configuration context
 *
 * @throws Error if used outside ThemeConfigProvider
 * @returns ThemeConfigContextValue
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { config, setThemeColor, randomize } = useThemeConfig();
 *
 *   return (
 *     <button onClick={() => setThemeColor('blue')}>
 *       Change to Blue
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeConfig() {
  const context = useContext(ThemeConfigContext);

  if (!context) {
    throw new Error('useThemeConfig must be used within ThemeConfigProvider');
  }

  return context;
}
