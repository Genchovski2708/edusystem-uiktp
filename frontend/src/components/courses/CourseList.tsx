// src/components/courses/CourseList.tsx
import React from 'react';
import { Course } from '../../types/models';
import { CourseCard } from './CourseCard';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface CourseListProps {
    courses: Course[];
    loading?: boolean;
    onEnroll: (courseId: string) => Promise<void>;
    enrolledCourseIds: string[];
    showEnrollButton?: true;
}

export const CourseList: React.FC<CourseListProps> = ({
                                                          courses,
                                                          loading = false,
                                                          onEnroll,
                                                          enrolledCourseIds = [],
                                                          showEnrollButton = true
                                                      }) => {
    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading courses...</p>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground">No courses found.</p>
                </CardContent>
            </Card>
        );
    }

    const canEnroll = showEnrollButton && typeof onEnroll === 'function';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourseIds.includes(course.id)}
                    onEnroll={onEnroll}
                    showEnrollButton={canEnroll}
                />
            ))}
        </div>
    );
};