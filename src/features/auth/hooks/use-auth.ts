import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { currentUser, login, logout } from '@/features/auth/services/auth.service.ts';
import type { AuthToken, LoginCredentials } from '@/features/auth/types.ts';

const QUERY_KEYS = {
  CURRENT_USER: 'current-user',
};

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginCredentials) => login<AuthToken>(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}

export function useCurrentUser() {
  const token = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: currentUser,
    enabled: Boolean(token), // Faqat token mavjud bo'lganda so'rov yuborish
  });
}
