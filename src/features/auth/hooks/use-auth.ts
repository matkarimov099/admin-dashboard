import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/features/auth/services/auth.service.ts';
import type { LoginCredentials } from '@/features/auth/types.ts';

// ============ QUERY KEYS ============
export const authKeys = {
  all: ['auth'] as const,
  current: () => [...authKeys.all, 'current'] as const,
};

// ============ MUTATIONS ============
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginCredentials) => authService.login(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authKeys.current() });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

// ============ QUERIES ============
export function useCurrentUser() {
  const token = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: authKeys.current(),
    queryFn: () => authService.currentUser(),
    enabled: Boolean(token), // Faqat token mavjud bo'lganda so'rov yuborish
  });
}
