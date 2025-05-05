// src/components/courses/CourseCard.tsx
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Course } from '../../types/models';
import { EnrollButton } from './EnrollButton';

interface CourseCardProps {
    course: Course;
    isEnrolled: boolean;
    onEnroll: (courseId: string) => Promise<void>;
    showEnrollButton?: boolean;
}

export function CourseCard({
                               course,
                               isEnrolled,
                               onEnroll,   // <-- Use the prop
                               showEnrollButton = true
                           }: CourseCardProps) {



    return (
        <Card className={`overflow-hidden ${isEnrolled ? "border-primary/30 bg-primary/5" : ""}`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>By {course.author?.name || 'Unknown Author'}</CardDescription>
                    </div>
                    {isEnrolled && (
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                            Enrolled
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 line-clamp-3">{course.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                </Button>
                {showEnrollButton && onEnroll && (
                    <EnrollButton
                        courseId={course.id}
                        isEnrolled={isEnrolled}
                        onEnroll={onEnroll}
                    />
                )}
            </CardFooter>
        </Card>
    );
}