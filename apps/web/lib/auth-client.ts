import { apiClient } from '@/lib/api-client';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

export const authClient = {
  me: () => apiClient.get<SessionUser>('/auth/me'),
  login: (email: string, password: string) =>
    apiClient.post<SessionUser>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    apiClient.post<SessionUser>('/auth/register', { name, email, password }),
  logout: () => apiClient.post<{ ok: true }>('/auth/logout'),
};
