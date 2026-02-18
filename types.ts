export interface DrugDetails {
  name: string;
  genericName?: string;
  manufacturer?: string;
  description: string;
  uses: string[];
  dosageGuidelines: {
    strength: string; // e.g., "500mg"
    frequency: string; // e.g., "Twice daily"
    general: string;
    personalized?: string;
  };
  sideEffects: string[];
  warnings: string[];
  interactions?: string[];
  fitnessGuide?: {
    summary: string;
    dietaryTips: string[];
    exercises: Array<{
      type: string;
      intensity: 'Low' | 'Medium' | 'High';
      duration: string;
      benefits: string;
      youtubeQuery: string;
    }>;
  };
  confidenceScore: number; // 0-100
}

export interface UserContext {
  age?: string;
  weight?: string;
  condition?: string;
  otherMedications?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}