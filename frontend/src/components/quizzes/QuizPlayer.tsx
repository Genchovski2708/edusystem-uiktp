// src/components/quizzes/QuizPlayer.tsx
import React, { useState } from 'react';
import { Quiz } from '../../types/models';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { useAIExplanation } from '../../hooks/useAIExplanation';
import { Loader2, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QuizPlayerProps {
    quiz: Quiz;
    onComplete: (answers: Record<string, string>) => void;
    loading?: boolean;
    submitting?: boolean;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
                                                          quiz,
                                                          onComplete,
                                                          loading = false,
                                                          submitting = false
                                                      }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const { explanation, loading: explanationLoading, error, explainQuestion } = useAIExplanation();

    const questions = quiz.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleSelectAnswer = (answerId: string) => {
        setSelectedAnswer(answerId);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            setAnswers({
                ...answers,
                [currentQuestion.id]: selectedAnswer
            });

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setShowExplanation(false);
            } else {
                const finalAnswers = {
                    ...answers,
                    [currentQuestion.id]: selectedAnswer
                };
                onComplete(finalAnswers);
            }
        }
    };

    const handleGetExplanation = () => {
        if (!showExplanation) {
            explainQuestion(currentQuestion);
            setShowExplanation(true);
        } else {
            setShowExplanation(false);
        }
    };

    if (loading) {
        return (
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-2 w-full mb-2" />
                    <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-full mb-6" />
                    <div className="space-y-4">
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </CardFooter>
            </Card>
        );
    }

    if (!currentQuestion) {
        return <div>No questions available</div>;
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <div className="mt-2">
                    <Progress value={progress} className="h-2" />
                    <div className="text-sm text-gray-500 mt-1">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-xl font-medium mb-6">{currentQuestion.text}</div>
                <RadioGroup
                    value={selectedAnswer || ""}
                    onValueChange={handleSelectAnswer}
                    disabled={submitting}
                >
                    {currentQuestion.answers.map((answer) => (
                        <div key={answer.id} className="flex items-center space-x-2 mb-4 p-3 border rounded-md hover:bg-slate-50">
                            <RadioGroupItem value={answer.id} id={answer.id} disabled={submitting} />
                            <Label htmlFor={answer.id} className="flex-grow cursor-pointer">
                                {answer.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>

                {/* --- AI Explanation Section --- */}
                <div className="mt-6">
                    <Button
                        variant="outline"
                        onClick={handleGetExplanation}
                        className="flex items-center gap-2"
                        disabled={submitting || explanationLoading || !currentQuestion} // Disable if no question
                    >
                        {explanationLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Getting AI explanation...
                            </>
                        ) : (
                            <>
                                <BrainCircuit className="h-4 w-4" />
                                {showExplanation ? "Hide AI Explanation" : "Get AI Explanation"}
                            </>
                        )}
                    </Button>

                    {/* --- Display Explanation using ReactMarkdown --- */}
                    {showExplanation && !explanationLoading && !error && explanation && ( // Added check for explanation content
                        <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30">
                            {/* Use asChild to pass styling to the div */}
                            <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
                                {/* Apply prose styles for nice Markdown rendering */}
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {explanation}
                                    </ReactMarkdown>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* --- Display Error --- */}
                    {error && (
                        <Alert variant="destructive" className="mt-4"> {/* Use destructive variant */}
                            <AlertDescription>
                                {error}. Please try again.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                        setShowExplanation(false);
                    }}
                    disabled={currentQuestionIndex === 0 || submitting}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer || submitting}
                >
                    {submitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {currentQuestionIndex < questions.length - 1 ? "Processing..." : "Submitting..."}
                        </>
                    ) : (
                        currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};