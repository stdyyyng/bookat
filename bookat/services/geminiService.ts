
import { GoogleGenAI, Type } from "@google/genai";
import { Book, BookStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchBookAI = async (query: string): Promise<Partial<Book>[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find books matching this query: "${query}". Provide title, author, a likely category, and a brief 1-sentence description. Return as JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "author", "category"]
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return results.map((item: any, index: number) => ({
      id: Math.random().toString(36).substr(2, 9),
      title: item.title,
      author: item.author,
      // Fix: 'category' does not exist in Book, use 'categories' as string[]
      categories: [item.category],
      coverUrl: `https://picsum.photos/seed/${item.title}/200/300`,
      status: BookStatus.WANT_TO_READ,
      progress: 0,
      rating: 0,
      quotes: [],
      isLifeBook: false,
      updatedAt: Date.now()
    }));
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};