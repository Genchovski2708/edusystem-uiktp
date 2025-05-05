// src/services/aiService.ts
import { GoogleGenAI } from '@google/genai';
import { Question } from '../types/models';
import { AI_CONFIG } from '../config/aiConfig';

console.log(AI_CONFIG.GEMINI.API_KEY)
const ai = new GoogleGenAI({ apiKey: AI_CONFIG.GEMINI.API_KEY });

export const getAIExplanation = async (question: Question): Promise<string> => {
    const answersText = question.answers
        .map((a) => `- ${a.text}${a.isCorrect ? ' (correct)' : ''}`)
        .join('\n');

    const contents = `
Question: ${question.text}

Possible answers:
${answersText}

Please explain this question and why the correct answer is right. Keep your explanation concise and easy to understand.
  `.trim();

    try {
        const result = await ai.models.generateContent({
            model: AI_CONFIG.GEMINI.MODEL,
            contents
        });

        return result.text || 'No explanation returned.';
    } catch (err) {
        console.error('Gemini API Error:', err);
        throw new Error('Failed to fetch explanation from Gemini API');
    }
};
