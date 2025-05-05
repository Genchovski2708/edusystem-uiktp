import { Course } from '../types/models';

const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Intro to Web Dev',
        description: 'HTML, CSS, JS for beginners.',
        authorId: '1',
        author: {
            id: '1',
            name: 'John Doe',
            bio: 'Senior Web Dev'
        }
    },
    {
        id: '2',
        title: 'React Deep Dive',
        description: 'Advanced patterns and performance tips.',
        authorId: '2',
        author: {
            id: '2',
            name: 'Jane Smith',
            bio: 'Frontend Architect'
        }
    },
    {
        id: '3',
        title: 'Data Science 101',
        description: 'From spreadsheets to machine learning.',
        authorId: '3',
        author: {
            id: '3',
            name: 'Mike Johnson',
            bio: 'Data Scientist'
        }
    }
];

export const mockCourseApi = {
    getAllCourses: async (): Promise<Course[]> => {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(() => resolve(mockCourses), 500);
        });
    },
    getCourseById: async (id: string): Promise<Course | undefined> => {
        return mockCourses.find(course => course.id === id);
    }
};
