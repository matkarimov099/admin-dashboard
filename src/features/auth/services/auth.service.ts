import axiosClient, { publicAxiosClient } from '@/plugins/axios.ts';
import type { CurrentUser, LoginCredentials, LoginResponse } from '../types.ts';

export const authService = {
  // POST - Login
  login: async (data: LoginCredentials): Promise<LoginResponse> => {
    const { data: response } = await publicAxiosClient.post<LoginResponse>('/auth/login', data);
    return response;
  },

  // POST - Logout
  logout: async (): Promise<void> => {
    await axiosClient.post('/auth/logout');
  },

  // GET - Current user
  currentUser: async (): Promise<CurrentUser> => {
    const { data } = await axiosClient.get<CurrentUser>('/auth/me');
    return data;
  },
};
