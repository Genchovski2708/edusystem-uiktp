// src/hooks/useAuthors.ts
import { useState, useEffect } from 'react';
import { Author } from '../types/models';
import { authorApi } from '../api/authorApi';

export const useAuthors = (authorId?: string) => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setLoading(true);

                if (authorId) {
                    const authorData = await authorApi.getAuthorById(authorId);
                    setAuthor(authorData);
                    setAuthors([authorData]);
                } else {
                    const allAuthors = await authorApi.getAllAuthors();
                    setAuthors(allAuthors);
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching authors:', err);
                setError('Failed to fetch authors');
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, [authorId]);

    const getAuthorById = async (id: string): Promise<Author> => {
        return await authorApi.getAuthorById(id);
    };

    return {
        authors,
        author,
        loading,
        error,
        getAuthorById
    };
};