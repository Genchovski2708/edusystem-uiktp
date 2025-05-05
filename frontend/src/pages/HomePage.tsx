import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Layout } from '../components/layout/Layout';
import { CourseList } from '../components/courses/CourseList';
import { courseApi } from "@/api/courseApi.ts";
import { Course } from '../types/models';
import { useAuth } from "@/hooks/useAuth.ts";
import { mockCourses } from '../mock/mockCourses';
import { useCourses } from "@/hooks/useCourses.ts";

export function HomePage() {
    const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    const {
        enrolledCourseIds,
        enrollInCourse,
    } = useCourses();

    useEffect(() => {
        const loadCourses = async () => {
            setIsLoading(true);
            try {
                const courses = await courseApi.getAllCourses();
                console.log('API Response for featured:', courses);
                if (Array.isArray(courses)) {
                    setFeaturedCourses(courses.slice(0, 3));
                } else {
                    console.error('Unexpected response format for featured courses', courses);
                    setFeaturedCourses([]);
                }
            } catch (error) {
                console.error('Failed to load featured courses', error);
                setFeaturedCourses(mockCourses.slice(0, 3)); // Use slice for mock data too
            } finally {
                setIsLoading(false);
            }
        };

        loadCourses();
    }, []);

    const displayEnrolledIds = isAuthenticated ? enrolledCourseIds : [];

    const handleEnroll = async (courseId: string) => {
        try {
            await enrollInCourse(courseId);
            console.log(`Enrollment initiated for ${courseId} from HomePage`);
        } catch (error) {
            console.error(`Error enrolling from HomePage:`, error);
        }
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-12 md:py-20 bg-gray-50 -mx-4 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Expand Your Knowledge</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Access high-quality courses taught by industry experts and enhance your skills.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link to="/courses">Browse Courses</Link>
                        </Button>
                        {!isAuthenticated && (
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/register">Create Account</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-16">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Featured Courses</h2>
                        <Button variant="outline" asChild>
                            <Link to="/courses">View All</Link>
                        </Button>
                    </div>

                    {/* Pass necessary props to CourseList */}
                    <CourseList
                        courses={featuredCourses}
                        loading={isLoading} // Use the loading state for featured courses
                        // Pass the correctly determined enrolled IDs (handles logout)
                        enrolledCourseIds={displayEnrolledIds}
                        // Pass the enrollment handler function
                        onEnroll={handleEnroll}
                        // Explicitly show the enroll button for featured courses
                        showEnrollButton={true}
                    />
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-gray-50 -mx-4 px-4">
                <div className="container mx-auto">
                    {/* ... content ... */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Why Choose Our Platform?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
                                <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
                                <p className="text-gray-600">Engage with quizzes and hands-on exercises to reinforce concepts.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-3">Self-Paced</h3>
                                <p className="text-gray-600">Learn at your own pace and on your own schedule.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}