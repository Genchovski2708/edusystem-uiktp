// src/components/quizzes/QuizCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Quiz } from '../../types/models';
import { Link } from 'react-router-dom';

interface QuizCardProps {
    quiz: Quiz;
    courseId?: string;
    isEnrolled?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, courseId }) => {
    const questionCount = quiz.questions?.length || 0;

    // Determine link path: if we're in a course view, use course-specific path
    const linkPath = courseId
        ? `/courses/${courseId}/quizzes/${quiz.id}`
        : `/quizzes/${quiz.id}`;

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription>
                    {quiz.course?.title || 'Loading course...'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">
                    {questionCount} question{questionCount !== 1 ? 's' : ''}
                </p>
            </CardContent>
            <CardFooter className="bg-slate-50 p-4">
                <Button asChild className="w-full">
                    <Link to={linkPath}>Start Quiz</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};