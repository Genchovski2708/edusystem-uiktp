// src/components/quizzes/QuizList.tsx
import React from 'react';
import { Quiz } from '../../types/models';
import { QuizCard } from './QuizCard';

interface QuizListProps {
    quizzes: Quiz[];
    loading?: boolean;
    courseId?: string;
    isEnrolled?: boolean;
}

export const QuizList: React.FC<QuizListProps> = ({
                                                      quizzes,
                                                      loading
                                                  }) => {
    if (loading) {
        return <div className="text-center py-8">Loading quizzes...</div>;
    }

    if (quizzes.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No quizzes available.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};