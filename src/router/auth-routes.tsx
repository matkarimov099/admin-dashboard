import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { LazyComponent } from '@/components/common/LazyComponent.tsx';

const Login = lazy(() => import('@/pages/auth/Login.tsx'));
/**
 * Authentication routes (login, register, etc.)
 */
export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <LazyComponent>
        <Login />
      </LazyComponent>
    ),
  },
  // Future auth routes can be added here (register, forgot password, etc.)
];
