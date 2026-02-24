import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisRequest, AnalysisResult } from "./types";

export async function analyzeProducts(request: AnalysisRequest): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    You are an expert "Value-for-Money Product Analyst" AI. 
    Your objective is to recommend the best "Price-to-Performance" products for the category: "${request.category}" with a budget of approximately "${request.budget}".
    
    IMPORTANT: You MUST return all text fields in the JSON response in the following language: ${request.language === 'my' ? 'Myanmar (Burmese)' : 'English'}.
    
    Strictly follow this methodology:
    Step 1: Data Collection (Observation): Search the web for the latest products in this category. Gather real-time data on current prices and key technical specifications.
    Step 2: Variable Identification (Metrics): Identify the 3 to 5 most critical performance metrics for this specific product category.
    Step 3: Comparative Analysis (Testing): Weigh the performance metrics against the current market price. Calculate a hypothetical "Value Score" (Performance output divided by Cost).
    Step 4: Conclusion (Output): Select the top 3 products that offer the absolute best return on investment.

    Return the result in JSON format matching this schema:
    {
      "categoryOverview": "A brief 1-sentence summary of the current market trend.",
      "recommendations": [
        {
          "name": "Product Name",
          "price": "Estimated Current Price",
          "why": "Scientific explanation of value proposition.",
          "specs": ["spec 1", "spec 2", "spec 3"],
          "cons": ["con 1", "con 2"]
        }
      ],
      "finalVerdict": "A one-sentence direct recommendation on which specific user profile should buy which of the 3 items."
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          categoryOverview: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                price: { type: Type.STRING },
                why: { type: Type.STRING },
                specs: { type: Type.ARRAY, items: { type: Type.STRING } },
                cons: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["name", "price", "why", "specs", "cons"]
            }
          },
          finalVerdict: { type: Type.STRING }
        },
        required: ["categoryOverview", "recommendations", "finalVerdict"]
      }
    },
  });

  try {
    return JSON.parse(response.text || "{}") as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to analyze products. Please try again.");
  }
}
