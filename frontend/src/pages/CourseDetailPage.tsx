import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCourses } from '../hooks/useCourses';
import { useQuizzes } from '../hooks/useQuizzes';
import { QuizList } from '../components/quizzes/QuizList';
import { Course } from '../types/models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { getCourseById } = useCourses();
    const { quizzes, loading: quizzesLoading } = useQuizzes(courseId);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            if (courseId) {
                try {
                    setLoading(true);
                    const foundCourse = await getCourseById(courseId);
                    setCourse(foundCourse);
                } catch (err) {
                    console.error('Error fetching course:', err);
                    setError('Failed to fetch course details');
                    setCourse(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCourse();
    }, [courseId, getCourseById]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <div className="flex justify-center items-center h-64">
                        <p>Loading course details...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !course) {
        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <Card className="max-w-lg mx-auto text-center">
                        <CardHeader>
                            <CardTitle>Course not found</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link to="/courses">Back to Courses</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-3xl">{course.title}</CardTitle>
                        <CardDescription>By {course.author?.name || 'Unknown Author'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none mb-6">
                            <p>{course.description}</p>
                        </div>

                        {course.author && (
                            <Card className="bg-gray-50 mt-8">
                                <CardHeader>
                                    <CardTitle className="text-xl">About the Author</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{course.author.bio || 'No author information available.'}</p>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Quizzes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {quizzesLoading ? (
                            <p>Loading quizzes...</p>
                        ) : (
                            <QuizList quizzes={quizzes} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};