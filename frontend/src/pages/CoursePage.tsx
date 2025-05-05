// src/pages/CoursesPage.tsx
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCourses } from '../hooks/useCourses';
import { CourseList } from '../components/courses/CourseList';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const CoursesPage: React.FC = () => {
    const { courses, loading, error, enrollInCourse, enrolledCourseIds } = useCourses();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.author?.name && course.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Layout>
            <div className="container mx-auto py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-3xl">Browse Courses</CardTitle>
                        <CardDescription>
                            Discover courses to enhance your knowledge and skills
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-md"
                            />
                            <Button variant="outline" onClick={() => setSearchTerm('')}>
                                Clear
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {error ? (
                    <Card className="bg-red-50">
                        <CardContent className="pt-6">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <CourseList
                        courses={filteredCourses}
                        onEnroll={enrollInCourse}
                        enrolledCourseIds={enrolledCourseIds}
                        loading={loading}
                    />
                )}
            </div>
        </Layout>
    );
};