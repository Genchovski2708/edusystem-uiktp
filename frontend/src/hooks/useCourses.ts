// src/hooks/useCourses.ts
import { useState, useEffect, useCallback } from 'react';
import { Course } from '../types/models';
import { courseApi } from '../api/courseApi';
import { useAuth } from './useAuth';

export const useCourses = (authorId?: string) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {isAuthenticated } = useAuth();

    const getCourseById = useCallback(async (id: string): Promise<Course> => {
        return await courseApi.getCourseById(id);
    }, []);

    const getUserCourses = useCallback(async (): Promise<Course[]> => {
        return await courseApi.getUserCourses();
    }, []);

    // Enhanced enrollInCourse that also updates the local state
    const enrollInCourse = useCallback(async (courseId: string): Promise<void> => {
        try {
            await courseApi.enrollInCourse(courseId);
            // Update local state after successful enrollment
            setEnrolledCourseIds(prev => [...prev, courseId]);
        } catch (error) {
            console.error('Enrollment failed:', error);
            throw error;
        }
    }, []);

    // Check if user is enrolled in a specific course
    const isEnrolled = useCallback((courseId: string): boolean => {
        return enrolledCourseIds.includes(courseId);
    }, [enrolledCourseIds]);

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                if (authorId) {
                    const allCourses = await courseApi.getAllCourses();
                    const filteredCourses = allCourses.filter(course => course.authorId === authorId);
                    setCourses(filteredCourses);
                } else {
                    const allCourses = await courseApi.getAllCourses();
                    setCourses(allCourses);
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [authorId]);

    // Fetch user enrollments when authenticated
    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!isAuthenticated) return;

            try {
                // Get courses the user is enrolled in
                const userCourses = await courseApi.getUserCourses();
                // Extract just the IDs for quick lookup
                setEnrolledCourseIds(userCourses.map(course => course.id));
            } catch (err) {
                console.error('Error fetching user courses:', err);
                // We don't set error state here as this is secondary data
            }
        };

        fetchEnrollments();
    }, [isAuthenticated]);

    return {
        courses,
        loading,
        error,
        getCourseById,
        getUserCourses,
        enrollInCourse,
        enrolledCourseIds,
        isEnrolled
    };
};