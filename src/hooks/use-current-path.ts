import { useLocation } from 'react-router';

/**
 * Custom hook to get the current pathname
 * Returns the current path from the location object
 */
export function useCurrentPath(): string {
  return useLocation().pathname;
}