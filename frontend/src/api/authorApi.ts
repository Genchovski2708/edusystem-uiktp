// src/api/authorApi.ts
import apiClient from './apiClient';
import { Author } from '../types/models';

export const authorApi = {
    getAllAuthors: async (): Promise<Author[]> => {
        const response = await apiClient.get<Author[]>('/authors');
        return response.data;
    },

    getAuthorById: async (id: string): Promise<Author> => {
        const response = await apiClient.get<Author>(`/authors/${id}`);
        return response.data;
    }
};