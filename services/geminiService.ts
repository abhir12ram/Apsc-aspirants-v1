import { GoogleGenAI, Type } from "@google/genai";
import { MCQ } from '../types';

export const generateMCQs = async (topic: string, count: number): Promise<MCQ[]> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Generate ${count} multiple-choice questions (MCQs) for the topic "${topic}". These MCQs are for the APSC (Assam Public Service Commission) civil services exam, so the difficulty level should be moderate to high.
    
Each MCQ must have:
1. A clear question.
2. An array of 4 string options.
3. The correct answer, which must be one of the provided options.
4. A brief explanation for the correct answer.

Your final output must be a valid JSON array of objects, strictly adhering to the schema provided. Do not include any text outside of the JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The question text." },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 4 possible answers."
              },
              correctAnswer: { type: Type.STRING, description: "The correct answer from the options array." },
              explanation: { type: Type.STRING, description: "A brief explanation of why the answer is correct." }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    
    const jsonText = response.text;
    const mcqs = JSON.parse(jsonText);
    
    if (!Array.isArray(mcqs) || mcqs.length === 0) {
        throw new Error("AI did not return a valid list of questions.");
    }

    return mcqs;

  } catch (error) {
    console.error("Error generating MCQs:", error);
    // Fallback to a dummy question in case of an API error
    return [
      {
        question: "What is the capital of Assam?",
        options: ["Guwahati", "Dispur", "Dibrugarh", "Silchar"],
        correctAnswer: "Dispur",
        explanation: "Dispur, a locality of Guwahati, became the capital of Assam in 1973."
      }
    ];
  }
};

export const generateFlashcards = async (topic: string, count: number): Promise<Array<{ question: string; answer: string }>> => {
  try {
    if (!process.env.API_KEY) throw new Error("API_KEY environment variable not set");
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate ${count} flashcards for the topic "${topic}". These are for APSC civil services exam preparation. Each flashcard must have a 'question' and a concise 'answer'. Return the output as a valid JSON array of objects.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The flashcard question." },
              answer: { type: Type.STRING, description: "The flashcard answer." }
            },
            required: ["question", "answer"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
};


export const generateInterviewQuestions = async (topic: string, count: number): Promise<string[]> => {
  try {
    if (!process.env.API_KEY) throw new Error("API_KEY environment variable not set");
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate ${count} insightful interview questions for an APSC civil services candidate on the topic of "${topic}". Return the output as a valid JSON array of strings.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return [];
  }
};
