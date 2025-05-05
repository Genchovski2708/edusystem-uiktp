// src/mock/mockQuizzes.ts
import { Quiz, Question } from '../types/models';
import { mockCourses } from './mockCourses';

export const mockQuestions: Record<string, Question[]> = {
    'quiz1': [
        {
            id: 'q1-1',
            text: 'What is the primary purpose of React?',
            quizId: 'quiz1',
            answers: [
                { id: 'a1-1', text: 'Server-side rendering', isCorrect: false, questionId: 'q1-1' },
                { id: 'a1-2', text: 'Building user interfaces', isCorrect: true, questionId: 'q1-1' },
                { id: 'a1-3', text: 'Database management', isCorrect: false, questionId: 'q1-1' },
                { id: 'a1-4', text: 'API development', isCorrect: false, questionId: 'q1-1' }
            ]
        },
        {
            id: 'q1-2',
            text: 'What is JSX?',
            quizId: 'quiz1',
            answers: [
                { id: 'a2-1', text: 'A JavaScript engine', isCorrect: false, questionId: 'q1-2' },
                { id: 'a2-2', text: 'A database query language', isCorrect: false, questionId: 'q1-2' },
                { id: 'a2-3', text: 'A syntax extension for JavaScript', isCorrect: true, questionId: 'q1-2' },
                { id: 'a2-4', text: 'A testing framework', isCorrect: false, questionId: 'q1-2' }
            ]
        },
        {
            id: 'q1-3',
            text: 'What is a React component?',
            quizId: 'quiz1',
            answers: [
                { id: 'a3-1', text: 'A reusable piece of UI', isCorrect: true, questionId: 'q1-3' },
                { id: 'a3-2', text: 'A database table', isCorrect: false, questionId: 'q1-3' },
                { id: 'a3-3', text: 'A CSS file', isCorrect: false, questionId: 'q1-3' },
                { id: 'a3-4', text: 'A JavaScript variable', isCorrect: false, questionId: 'q1-3' }
            ]
        }
    ],
    'quiz2': [
        {
            id: 'q2-1',
            text: 'Which hook is used for side effects in React?',
            quizId: 'quiz2',
            answers: [
                { id: 'a2-1-1', text: 'useState', isCorrect: false, questionId: 'q2-1' },
                { id: 'a2-1-2', text: 'useEffect', isCorrect: true, questionId: 'q2-1' },
                { id: 'a2-1-3', text: 'useContext', isCorrect: false, questionId: 'q2-1' },
                { id: 'a2-1-4', text: 'useReducer', isCorrect: false, questionId: 'q2-1' }
            ]
        },
        {
            id: 'q2-2',
            text: 'What is the purpose of useState hook?',
            quizId: 'quiz2',
            answers: [
                { id: 'a2-2-1', text: 'To handle HTTP requests', isCorrect: false, questionId: 'q2-2' },
                { id: 'a2-2-2', text: 'To manage component state', isCorrect: true, questionId: 'q2-2' },
                { id: 'a2-2-3', text: 'To define routes', isCorrect: false, questionId: 'q2-2' },
                { id: 'a2-2-4', text: 'To create custom hooks', isCorrect: false, questionId: 'q2-2' }
            ]
        }
    ],
    'quiz3': [
        {
            id: 'q3-1',
            text: 'What is TypeScript?',
            quizId: 'quiz3',
            answers: [
                { id: 'a3-1-1', text: 'A JavaScript runtime', isCorrect: false, questionId: 'q3-1' },
                { id: 'a3-1-2', text: 'A JavaScript framework', isCorrect: false, questionId: 'q3-1' },
                { id: 'a3-1-3', text: 'A superset of JavaScript that adds static typing', isCorrect: true, questionId: 'q3-1' },
                { id: 'a3-1-4', text: 'A JavaScript library', isCorrect: false, questionId: 'q3-1' }
            ]
        },
        {
            id: 'q3-2',
            text: 'What is an interface in TypeScript?',
            quizId: 'quiz3',
            answers: [
                { id: 'a3-2-1', text: 'A way to define the structure of an object', isCorrect: true, questionId: 'q3-2' },
                { id: 'a3-2-2', text: 'A function declaration', isCorrect: false, questionId: 'q3-2' },
                { id: 'a3-2-3', text: 'A class method', isCorrect: false, questionId: 'q3-2' },
                { id: 'a3-2-4', text: 'A variable declaration', isCorrect: false, questionId: 'q3-2' }
            ]
        },
        {
            id: 'q3-3',
            text: 'What are generics in TypeScript?',
            quizId: 'quiz3',
            answers: [
                { id: 'a3-3-1', text: 'Utility functions', isCorrect: false, questionId: 'q3-3' },
                { id: 'a3-3-2', text: 'Global variables', isCorrect: false, questionId: 'q3-3' },
                { id: 'a3-3-3', text: 'A way to create reusable components that work with any data type', isCorrect: true, questionId: 'q3-3' },
                { id: 'a3-3-4', text: 'Error handling mechanisms', isCorrect: false, questionId: 'q3-3' }
            ]
        }
    ]
};

export const mockQuizzes: Quiz[] = [
    {
        id: 'quiz1',
        title: 'React Fundamentals Quiz',
        courseId: mockCourses[0].id,
        course: mockCourses[0]
    },
    {
        id: 'quiz2',
        title: 'React Hooks Quiz',
        courseId: mockCourses[0].id,
        course: mockCourses[0]
    },
    {
        id: 'quiz3',
        title: 'TypeScript Basics Quiz',
        courseId: mockCourses[1].id,
        course: mockCourses[1]
    }
];

// Add questions to quizzes
export const mockQuizzesWithQuestions: Quiz[] = mockQuizzes.map(quiz => ({
    ...quiz,
    questions: mockQuestions[quiz.id] || []
}));

// Mock quiz attempts
export const mockUserQuizAttempts = [
    {
        id: 'attempt1',
        userId: 'user1',
        quizId: 'quiz1',
        quiz: mockQuizzes[0],
        score: 2, // out of 3
        attemptDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 'attempt2',
        userId: 'user1',
        quizId: 'quiz3',
        quiz: mockQuizzes[2],
        score: 3, // out of 3
        attemptDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    }
];