
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHeritageInfo = async (locationName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a heritage and tourism expert, provide an exciting and brief description in English for AR app visitors about the area: ${locationName}. Make it inspiring for artists.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Heritage information is currently unavailable.";
  }
};

export const suggestArtPrompt = async (theme: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 3 creative ideas to draw using augmented reality based on the theme: ${theme}. Ideas must be in English and very concise.`,
    });
    return response.text;
  } catch (error) {
    return "Draw whatever comes to mind!";
  }
};
