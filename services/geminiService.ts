import { GoogleGenAI, Type } from "@google/genai";
import { DrugDetails, UserContext } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const sanitizeResponse = (data: any): DrugDetails => {
  return {
    name: data.name || "Unknown Drug",
    genericName: data.genericName,
    manufacturer: data.manufacturer,
    description: data.description || "No description available.",
    uses: Array.isArray(data.uses) ? data.uses : [],
    dosageGuidelines: {
      strength: data.dosageGuidelines?.strength || "Consult Label",
      frequency: data.dosageGuidelines?.frequency || "As prescribed",
      general: data.dosageGuidelines?.general || "No dosage information available.",
      personalized: data.dosageGuidelines?.personalized
    },
    sideEffects: Array.isArray(data.sideEffects) ? data.sideEffects : [],
    warnings: Array.isArray(data.warnings) ? data.warnings : [],
    interactions: Array.isArray(data.interactions) ? data.interactions : [],
    fitnessGuide: {
      summary: data.fitnessGuide?.summary || "Stay active as tolerated.",
      dietaryTips: Array.isArray(data.fitnessGuide?.dietaryTips) ? data.fitnessGuide.dietaryTips : [],
      exercises: Array.isArray(data.fitnessGuide?.exercises) ? data.fitnessGuide.exercises : []
    },
    confidenceScore: typeof data.confidenceScore === 'number' ? data.confidenceScore : 0
  };
};

const commonPrompt = `
  Return a structured JSON response.
  
  For "dosageGuidelines":
  - "strength": Identify the specific Mg/Mcg strength (e.g., "500mg").
  - "frequency": Typical frequency (e.g., "Every 8 hours").
  - "personalized": If user details are provided, calculate a specific recommended intake schedule and strength. If not, provide a safe standard recommendation.

  For "fitnessGuide":
  - Provide specific exercise recommendations compatible with the medical condition often treated by this drug.
  - "youtubeQuery": Generate a specific search term to find a good video tutorial for this exercise (e.g., "10 minute low impact yoga for back pain").
  - "dietaryTips": Foods to eat or avoid while on this medication.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    genericName: { type: Type.STRING },
    manufacturer: { type: Type.STRING },
    description: { type: Type.STRING },
    uses: { type: Type.ARRAY, items: { type: Type.STRING } },
    dosageGuidelines: {
      type: Type.OBJECT,
      properties: {
        strength: { type: Type.STRING },
        frequency: { type: Type.STRING },
        general: { type: Type.STRING },
        personalized: { type: Type.STRING }
      }
    },
    sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
    warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    interactions: { type: Type.ARRAY, items: { type: Type.STRING } },
    fitnessGuide: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        dietaryTips: { type: Type.ARRAY, items: { type: Type.STRING } },
        exercises: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              intensity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
              duration: { type: Type.STRING },
              benefits: { type: Type.STRING },
              youtubeQuery: { type: Type.STRING }
            }
          }
        }
      }
    },
    confidenceScore: { type: Type.NUMBER }
  }
};

export const analyzeDrugImage = async (
  imageFile: File,
  userContext: UserContext
): Promise<DrugDetails> => {
  try {
    const base64Data = await fileToGenerativePart(imageFile);
    
    let contextPrompt = "";
    if (userContext.age || userContext.weight || userContext.condition) {
      contextPrompt = `
      USER CONTEXT FOR PERSONALIZATION:
      - Age: ${userContext.age || 'N/A'}
      - Weight: ${userContext.weight || 'N/A'}
      - Condition: ${userContext.condition || 'N/A'}
      - Other Meds: ${userContext.otherMedications || 'None'}
      
      Based on this, explicitly state the safe Milligram (Mg) intake per day in 'dosageGuidelines.personalized'.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Data } },
          {
            text: `
            Analyze this medication image. Identify it precisely.
            ${contextPrompt}
            ${commonPrompt}
            IMPORTANT: If the image is unclear, set confidenceScore to 0.
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return sanitizeResponse(JSON.parse(response.text));
    } else {
      throw new Error("No response text received from Gemini.");
    }
  } catch (error) {
    console.error("Error analyzing drug image:", error);
    throw error;
  }
};

export const searchDrugInfo = async (query: string): Promise<DrugDetails> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Search for comprehensive medical information for: "${query}".
        ${commonPrompt}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return { ...sanitizeResponse(parsed), confidenceScore: 95 }; 
    } else {
      throw new Error("No data found.");
    }
  } catch (error) {
    console.error("Error searching drug info:", error);
    throw error;
  }
};