// src/api/quizApi.ts
import apiClient from './apiClient';
import { Quiz, UserQuizAttempt, SolveQuizDto } from '../types/models';


export const quizApi = {
    getQuizzesByCourse: async (courseId: string): Promise<Quiz[]> => {
        const response = await apiClient.get<Quiz[]>(`/courses/${courseId}/quizzes`);
        return response.data;
    },

    getQuizById: async (id: string): Promise<Quiz> => {
        const response = await apiClient.get<Quiz>(`/quizzes/${id}`);
        return response.data;
    },

    submitQuizAttempt: async (quizId: string, answers: Record<string, string>): Promise<UserQuizAttempt> => {
        const solveQuizDto: SolveQuizDto = {
            quizId,
            answers
        };
        const response = await apiClient.post<UserQuizAttempt>(`/quizzes/${quizId}/submit`, solveQuizDto);
        return response.data;
    },

    getUserQuizAttempts: async (): Promise<UserQuizAttempt[]> => {
        const response = await apiClient.get<UserQuizAttempt[]>('/quiz-attempts');
        return response.data;
    }
};