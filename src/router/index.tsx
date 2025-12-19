import { createBrowserRouter } from 'react-router';
import { ChunkErrorBoundary } from '@/components/common/ChunkErrorBoundary.tsx';
import { NotAccess } from '@/components/common/NotAccess';
import { NotFound } from '@/components/common/NotFound.tsx';
import {
  AuthLayoutWrapper,
  MainLayoutWrapper,
  RootRedirect,
} from '@/components/common/RouterComponents.tsx';
import { authRoutes } from '@/router/auth-routes.tsx';
import { mainRoutes } from '@/router/main-routes.tsx';

/**
 * Application router without internationalization
 */
export const router = createBrowserRouter([
  // Root path redirect to dashboard
  {
    path: '/',
    element: <RootRedirect />,
  },

  // Main application routes
  {
    path: '/',
    element: <MainLayoutWrapper />,
    errorElement: <ChunkErrorBoundary />,
    children: mainRoutes,
  },

  // Auth routes
  {
    path: '/auth',
    element: <AuthLayoutWrapper />,
    children: authRoutes,
  },
  // Error pages
  {
    path: '/not-access',
    element: <NotAccess />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
