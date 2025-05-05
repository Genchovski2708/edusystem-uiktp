// src/types/models.ts

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}

export interface Author {
    id: string;
    name: string;
    bio: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    authorId: string;
    author?: Author;
}

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    userName: string;
}

export interface Question {
    id: string;
    text: string;
    quizId: string;
    answers: Answer[];
}

export interface Quiz {
    id: string;
    title: string;
    courseId: string;
    course?: Course;
    questions?: Question[];
}

export interface UserQuizAttempt {
    id: string;
    userId: string;
    quizId: string;
    quiz?: Quiz;
    score: number;
    attemptDate: string;
    totalQuestions: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    Email: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    LastName: string;
    UserName: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface SolveQuizDto {
    quizId: string;
    answers: Record<string, string>;
}