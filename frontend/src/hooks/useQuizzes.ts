// src/hooks/useQuizzes.ts
import { useState, useEffect, useCallback } from 'react';
import { Quiz, UserQuizAttempt } from '../types/models';
import { quizApi } from '../api/quizApi';

export const useQuizzes = (courseId?: string) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getQuizById = useCallback(async (id: string): Promise<Quiz> => {
        return await quizApi.getQuizById(id);
    }, []);

    const getUserAttempts = useCallback(async (): Promise<UserQuizAttempt[]> => {
        return await quizApi.getUserQuizAttempts();
    }, []);

    const submitQuizAttempt = useCallback(async (quizId: string, answers: Record<string, string>): Promise<UserQuizAttempt> => {
        return await quizApi.submitQuizAttempt(quizId, answers);
    }, []);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);

                if (courseId) {
                    const quizzesByCourse = await quizApi.getQuizzesByCourse(courseId);
                    setQuizzes(quizzesByCourse);
                } else {
                    setQuizzes([]);
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching quizzes:', err);
                setError('Failed to fetch quizzes');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [courseId]);

    return {
        quizzes,
        loading,
        error,
        getQuizById,
        getUserAttempts,
        submitQuizAttempt
    };
};