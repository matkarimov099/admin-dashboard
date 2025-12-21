import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AuthGuard } from '@/components/auth/auth-guard.tsx';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { CompactLayout, DefaultLayout, HorizontalLayout } from '@/layouts';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';
import AuthContextProvider from '@/providers/auth-context-provider.tsx';
import type { Role } from '@/types/common.ts';

/**
 * LayoutSelector component to choose a layout based on theme configuration
 */
function LayoutSelector() {
  const { config } = useThemeConfig();

  switch (config.layoutMode) {
    case 'horizontal':
      return <HorizontalLayout />;
    case 'compact':
      return <CompactLayout />;
    default:
      return <DefaultLayout />;
  }
}

/**
 * MainLayoutWrapper component with auth context and dynamic layouts
 */
export function MainLayoutWrapper() {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <LayoutSelector />
      </AuthGuard>
    </AuthContextProvider>
  );
}

/**
 * AuthLayoutWrapper component with auth context and auth layouts
 */
export function AuthLayoutWrapper() {
  return (
    <AuthContextProvider>
      <AuthLayout />
    </AuthContextProvider>
  );
}

/**
 * RootRedirect component to redirect based on user role
 * - Guest users are redirected to /tasks/board
 * - All other users are redirected to dashboard
 */
export function RootRedirect() {
  const { isLoading, currentUser } = useAuthContext();

  // Wait for the auth state to load before redirecting
  if (isLoading || !currentUser) {
    return null;
  }

  // Redirect guest users to the tasks board
  if (currentUser.role === 'guest') {
    return <Navigate to="/tasks/board" replace />;
  }

  // Redirect all other users to the dashboard
  return <Navigate to="/dashboard" replace />;
}

/**
 * ProtectedRoute component with role-based access control
 * - Checks if the user has required roles
 * - Redirects to /not-access if the user doesn't have permission
 */
interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { hasRole, isLoading, currentUser } = useAuthContext();

  // Wait for the auth state to load before checking permissions
  // This prevents false negatives during page refresh when the currentUser is still null
  if (isLoading || !currentUser) {
    return null; // Or you can return a loading spinner
  }

  // If no roles specified, allow access to all authenticated users
  if (!roles || roles.length === 0) {
    return <>{children}</>;
  }

  // Check if a user has any of the required roles
  if (!hasRole(roles)) {
    return <Navigate to="/not-access" replace />;
  }

  return <>{children}</>;
}
