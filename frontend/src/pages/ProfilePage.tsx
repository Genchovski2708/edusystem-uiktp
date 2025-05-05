import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCourses } from '../hooks/useCourses';
import { useQuizzes } from '../hooks/useQuizzes';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {Course, UserQuizAttempt} from '../types/models';

interface ProfilePageProps {
    defaultTab?: 'courses' | 'quizzes';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ defaultTab = 'courses' }) => {
    const { user, isAuthenticated } = useAuth();
    const { getUserCourses } = useCourses();
    const { getUserAttempts } = useQuizzes();
    const navigate = useNavigate();

    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [quizAttempts, setQuizAttempts] = useState<UserQuizAttempt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const coursesRef = useRef<HTMLDivElement | null>(null);

    // Check authentication and redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const [courses, attempts] = await Promise.all([
                    getUserCourses(),
                    getUserAttempts()
                ]);

                setUserCourses(courses);
                setQuizAttempts(attempts.sort(
                    (a, b) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime()
                ));
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load your profile data');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    // Scroll to courses section if defaultTab is 'courses'
    useEffect(() => {
        if (defaultTab === 'courses' && coursesRef.current) {
            setTimeout(() => {
                coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 200); // slight delay to ensure DOM is rendered
        }
    }, [defaultTab]);

    if (!user) {
        return null; // Will redirect via the first useEffect
    }

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <div className="flex justify-center items-center h-64">
                        <p>Loading your profile...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-3xl">Your Profile</CardTitle>
                        <CardDescription>View and manage your learning journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-gray-500">Username</h3>
                                <p className="text-lg">{user.userName}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-500">Email</h3>
                                <p className="text-lg">{user.email}</p>
                            </div>
                            {user.firstName && (
                                <div>
                                    <h3 className="font-medium text-gray-500">First Name</h3>
                                    <p className="text-lg">{user.firstName}</p>
                                </div>
                            )}
                            {user.lastName && (
                                <div>
                                    <h3 className="font-medium text-gray-500">Last Name</h3>
                                    <p className="text-lg">{user.lastName}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <Button>Edit Profile</Button>
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <Card className="bg-red-50 mb-8">
                        <CardContent className="pt-6">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <Tabs defaultValue={defaultTab}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="courses">My Courses</TabsTrigger>
                        <TabsTrigger value="quizzes">Quiz Attempts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="courses">
                        <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userCourses.length > 0 ? (
                                userCourses.map(userCourse => (
                                    <Card key={userCourse.id}>
                                        <CardHeader>
                                            <CardTitle>{userCourse.title || 'Unknown Course'}</CardTitle>
                                        </CardHeader>
                                        <CardDescription className="text-center px-4 py-2">
                                            {userCourse.description || "Unknown Description"}
                                        </CardDescription>
                                        <CardContent>
                                            <Button
                                                className="w-full"
                                                onClick={() => navigate(`/courses/${userCourse.id}`)}
                                            >
                                                Continue Learning
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                                    <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="quizzes">
                        <div className="space-y-4">
                            {quizAttempts.length > 0 ? (
                                quizAttempts.map(attempt => {
                                    const quiz = attempt.quiz;
                                    console.log("QUIZZZZZZZZZ" + JSON.stringify(quiz));
                                    const questionsCount = attempt.totalQuestions;
                                    const percentage = questionsCount > 0
                                        ? Math.round((attempt.score / questionsCount) * 100)
                                        : 0;

                                    return (
                                        <Card key={attempt.id}>
                                            <CardHeader>
                                                <div className="flex justify-between items-center">
                                                    <CardTitle>{quiz?.title || 'Unknown Quiz'}</CardTitle>
                                                    <div className="text-2xl font-bold">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                                <CardDescription>
                                                    Completed on {new Date(attempt.attemptDate).toLocaleDateString()}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="mb-4">
                                                    Score: {attempt.score} out of {questionsCount} questions
                                                </p>
                                                <Button
                                                    onClick={() => navigate(`/quizzes/${attempt.quizId}`)}
                                                >
                                                    Retake Quiz
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">You haven't attempted any quizzes yet.</p>
                                    <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};