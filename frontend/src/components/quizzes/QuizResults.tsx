import { UserQuizAttempt, Quiz } from '../../types/models';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface QuizResultsProps {
    attempt: UserQuizAttempt;
    quiz: Quiz;
}

export function QuizResults({ attempt, quiz }: QuizResultsProps) {
    const totalQuestions = quiz.questions?.length || 0;
    const percentageScore = totalQuestions > 0 ? (attempt.score / totalQuestions) * 100 : 0;
    const formattedDate = new Date(attempt.attemptDate).toLocaleDateString();

    let resultMessage = '';
    let resultClass = '';

    if (percentageScore >= 80) {
        resultMessage = 'Excellent work!';
        resultClass = 'text-green-600';
    } else if (percentageScore >= 60) {
        resultMessage = 'Good job!';
        resultClass = 'text-blue-600';
    } else {
        resultMessage = 'Keep practicing!';
        resultClass = 'text-yellow-600';
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{quiz.title} - Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center py-4">
                    <div className={`text-4xl font-bold ${resultClass}`}>
                        {Math.round(percentageScore)}%
                    </div>
                    <p className={`text-lg ${resultClass}`}>{resultMessage}</p>
                    <p className="text-gray-600 mt-1">
                        {attempt.score} out of {totalQuestions} questions correct
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Attempt date: {formattedDate}
                    </p>
                </div>

                <div className="flex justify-center pt-2">
                    <Button asChild>
                        <Link to={`/quizzes/${quiz.id}`}>Retake Quiz</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}