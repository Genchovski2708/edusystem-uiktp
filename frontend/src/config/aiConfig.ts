export const AI_CONFIG = {
    GEMINI: {
        API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
        MODEL: 'gemini-2.0-flash',
        MAX_TOKENS: 150
    }
};

export const getActiveAIService = () => 'GEMINI';
