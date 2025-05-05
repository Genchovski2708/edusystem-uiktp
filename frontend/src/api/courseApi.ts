// src/api/courseApi.ts
import apiClient from './apiClient';
import { Course } from '../types/models';

export const courseApi = {
    getAllCourses: async (): Promise<Course[]> => {
        const response = await apiClient.get<Course[]>('/courses');
        return response.data;
    },

    getCourseById: async (id: string): Promise<Course> => {
        const response = await apiClient.get<Course>(`/courses/${id}`);
        return response.data;
    },

    getUserCourses: async (): Promise<Course[]> => {
        const response = await apiClient.get<Course[]>('/courses/my-courses');
        return response.data;
    },

    enrollInCourse: async (courseId: string): Promise<void> => {
        await apiClient.post('/courses/enroll', { courseId });
    }
};