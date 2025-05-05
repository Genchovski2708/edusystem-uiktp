// src/mock/mockCourses.ts
import { Course } from '../types/models';

export const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Introduction to Web Development Mock',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
        authorId: '1',
        author: { id: '1', name: 'John Doe', bio: 'Senior Web Developer with 10 years of experience' }
    },
    {
        id: '2',
        title: 'Advanced React Patterns Mock',
        description: 'Master advanced React concepts like hooks, context, and performance optimization.',
        authorId: '2',
        author: { id: '2', name: 'Jane Smith', bio: 'React Specialist and Frontend Architect' }
    },
    {
        id: '3',
        title: 'Data Science Fundamentals Mock',
        description: 'Introduction to data analysis, visualization, and machine learning concepts.',
        authorId: '3',
        author: { id: '3', name: 'Mike Johnson', bio: 'Data Scientist at Tech Corp' }
    }
];
