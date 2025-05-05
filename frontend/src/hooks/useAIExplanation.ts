// src/hooks/useAIExplanation.ts
import { useState } from 'react';
import { Question } from '../types/models';
import { getAIExplanation } from '../services/aiService';

export const useAIExplanation = () => {
    const [explanation, setExplanation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const explainQuestion = async (question: Question) => {
        setLoading(true);
        setError(null);

        try {
            const result = await getAIExplanation(question);
            setExplanation(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get explanation');
        } finally {
            setLoading(false);
        }
    };

    return {
        explanation,
        loading,
        error,
        explainQuestion
    };
};