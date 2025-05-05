import { useState } from 'react';
import { Course, Quiz } from '../../types/models';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { QuizList } from '../quizzes/QuizList';
import { useAuth} from "@/hooks/useAuth.ts";
import { useNavigate } from 'react-router-dom';

interface CourseDetailProps {
    course: Course;
    quizzes: Quiz[];
    isEnrolled: boolean;
    onEnroll: (courseId: string) => void;
}

export function CourseDetail({ course, quizzes, isEnrolled, onEnroll }: CourseDetailProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleEnroll = () => {
        if (!isAuthenticated) {
            navigate('/login?redirect=' + encodeURIComponent(`/courses/${course.id}`));
            return;
        }

        onEnroll(course.id);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-gray-600 mt-2">By {course.author?.name}</p>
                </div>

                {!isEnrolled ? (
                    <Button size="lg" onClick={handleEnroll}>
                        Enroll in Course
                    </Button>
                ) : (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                        You are enrolled in this course
                    </div>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes ({quizzes.length})</TabsTrigger>
                    {isEnrolled && <TabsTrigger value="progress">My Progress</TabsTrigger>}
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-4">About this course</h2>
                        <p className="text-gray-700">{course.description}</p>

                        {course.author?.bio && (
                            <>
                                <h3 className="text-lg font-semibold mt-6 mb-2">About the author</h3>
                                <p className="text-gray-700">{course.author.bio}</p>
                            </>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="quizzes" className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
                    {quizzes.length > 0 ? (
                        <QuizList
                            quizzes={quizzes}
                            courseId={course.id}
                            isEnrolled={isEnrolled}
                        />
                    ) : (
                        <p className="text-gray-500">No quizzes available for this course yet.</p>
                    )}
                </TabsContent>

                {isEnrolled && (
                    <TabsContent value="progress" className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <p className="text-gray-700">Progress tracking will be available soon!</p>
                        </div>
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}