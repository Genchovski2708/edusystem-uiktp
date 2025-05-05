// src/api/userApi.ts
import apiClient from './apiClient';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/models';

export const userApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/users/me');
        return response.data;
    },

    updateProfile: async (userData: Partial<User>): Promise<User> => {
        const response = await apiClient.put<User>('/users/profile', userData);
        return response.data;
    }
};