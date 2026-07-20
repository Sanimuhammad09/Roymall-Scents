import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For refresh token cookies if used
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expiration)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = useAuthStore.getState().refreshToken;
        const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken
        }, {
          withCredentials: true // send refresh cookie
        });
        
        const { accessToken } = refreshResponse.data;
        useAuthStore.getState().setTokens(accessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, logout user
        useAuthStore.getState().logout();
        toast.error('Your session has expired. Please log in again.');
        return Promise.reject(refreshError);
      }
    }
    
    // Global error handling for other status codes
    if (error.response?.status >= 500) {
      toast.error('An unexpected server error occurred.');
    }
    
    return Promise.reject(error);
  }
);
