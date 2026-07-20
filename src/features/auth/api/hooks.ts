import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'USER' | 'ADMIN';
    avatar?: string;
  };
  accessToken: string;
  refreshToken: string;
}

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post('/auth/login', data);
      return response.data.data || response.data;
    },
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;
      setAuth(user, accessToken, refreshToken);
      toast.success(`Welcome back, ${user.firstName}!`);
      
      // Redirect based on user role
      if (user.role === 'ADMIN') {
        navigate({ to: '/admin' });
      } else {
        navigate({ to: '/' });
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Invalid email or password',
      );
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await api.post('/auth/register', data);
      return response.data.data || response.data;
    },
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;
      setAuth(user, accessToken, refreshToken);
      toast.success(`Welcome to Roymall Scents, ${user.firstName}!`);
      navigate({ to: '/' });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.',
      );
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('If your email is registered, you will receive a reset link.');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) => {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password reset successfully. Please log in.');
      navigate({ to: '/auth/login' });
    },
    onError: () => {
      toast.error('Invalid or expired reset link. Please try again.');
    },
  });
}
