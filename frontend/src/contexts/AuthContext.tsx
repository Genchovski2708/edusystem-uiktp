// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/models';
import { userApi } from '../api/userApi';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (data: RegisterRequest) => Promise<AuthResponse>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                // Check if there's a token in localStorage
                const token = localStorage.getItem('token');
                if (token) {
                    const currentUser = await userApi.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Clear token if invalid
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        const loginRequest: LoginRequest = { email, password };
        const authResponse = await userApi.login(loginRequest);

        localStorage.setItem('token', authResponse.token);
        setUser(authResponse.user);
        return authResponse;
    };

    const register = async (data: RegisterRequest): Promise<AuthResponse> => {
        const authResponse = await userApi.register(data);

        localStorage.setItem('token', authResponse.token);
        setUser(authResponse.user);
        return authResponse;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};