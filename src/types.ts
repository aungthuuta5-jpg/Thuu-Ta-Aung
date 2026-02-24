export interface ProductRecommendation {
  name: string;
  price: string;
  why: string;
  specs: string[];
  cons: string[];
}

export interface AnalysisResult {
  categoryOverview: string;
  recommendations: ProductRecommendation[];
  finalVerdict: string;
}

export interface AnalysisRequest {
  category: string;
  budget: string;
  language: 'en' | 'my';
  apiKey?: string;
}
