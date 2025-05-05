import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../hooks/useQuizzes';
import { useAuth } from '../hooks/useAuth';
import { QuizPlayer } from '../components/quizzes/QuizPlayer';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Quiz, UserQuizAttempt } from '../types/models';

export const QuizPage: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const { getQuizById, submitQuizAttempt } = useQuizzes();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizResult, setQuizResult] = useState<UserQuizAttempt | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizId) {
                try {
                    setLoading(true);
                    const fetchedQuiz = await getQuizById(quizId);
                    setQuiz(fetchedQuiz);
                    setError(null);
                } catch (err) {
                    console.error('Error fetching quiz:', err);
                    setError('Failed to fetch quiz');
                    setQuiz(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchQuiz();
    }, [quizId, getQuizById]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <div className="flex justify-center items-center h-64">
                        <p>Loading quiz...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !quiz) {
        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <Card className="max-w-lg mx-auto text-center">
                        <CardHeader>
                            <CardTitle>Quiz not found</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    const handleQuizComplete = async (answers: Record<string, string>) => {
        if (!user || !quizId) return;

        try {
            setSubmitting(true);
            const result = await submitQuizAttempt(quizId, answers);
            setQuizResult(result);
            setQuizComplete(true);
        } catch (err) {
            console.error('Error submitting quiz:', err);
            alert('Failed to submit quiz. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderQuizResult = () => {
        if (!quizResult || !quiz.questions) return null;

        const totalQuestions = quiz.questions.length;
        const score = quizResult.score;
        const percentage = Math.round((score / totalQuestions) * 100);

        return (
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Quiz Results</CardTitle>
                    <CardDescription>{quiz.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center py-6">
                        <div className="text-5xl font-bold mb-4">{percentage}%</div>
                        <div className="text-center mb-8">
                            <p>You got {score} out of {totalQuestions} questions correct!</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => navigate(`/courses/${quiz.courseId}`)}>
                            Back to Course
                        </Button>
                        <Button variant="outline" onClick={() => {
                            setQuizComplete(false);
                            setQuizResult(null);
                        }}>
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <Layout>
            <div className="container mx-auto py-8">
                {!quizComplete ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardDescription>Complete all questions to submit</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <QuizPlayer
                                quiz={quiz}
                                onComplete={handleQuizComplete}
                                loading={submitting}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    renderQuizResult()
                )}
            </div>
        </Layout>
    );
};