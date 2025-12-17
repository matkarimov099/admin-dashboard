import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AuthGuard } from '@/components/common/auth-guard.tsx';
import { useAuthContext } from '@/hooks/use-auth-context';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';
import AuthContextProvider from '@/providers/auth-context-provider.tsx';
import type { Role } from '@/types/common.ts';

/**
 * MainLayoutWrapper component with auth context and default layout
 */
export function MainLayoutWrapper() {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <DefaultLayout />
      </AuthGuard>
    </AuthContextProvider>
  );
}

/**
 * AuthLayoutWrapper component with auth context and auth layout
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

  // Wait for auth state to load before redirecting
  if (isLoading || !currentUser) {
    return null;
  }

  // Redirect guest users to tasks board
  if (currentUser.role === 'guest') {
    return <Navigate to="/tasks/board" replace />;
  }

  // Redirect all other users to dashboard
  return <Navigate to="/dashboard" replace />;
}

/**
 * ProtectedRoute component with role-based access control
 * - Checks if user has required roles
 * - Redirects to /not-access if user doesn't have permission
 */
interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { hasRole, isLoading, currentUser } = useAuthContext();

  // Wait for auth state to load before checking permissions
  // This prevents false negatives during page refresh when currentUser is still null
  if (isLoading || !currentUser) {
    return null; // Or you can return a loading spinner
  }

  // If no roles specified, allow access to all authenticated users
  if (!roles || roles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has any of the required roles
  if (!hasRole(roles)) {
    return <Navigate to="/not-access" replace />;
  }

  return <>{children}</>;
}
