
export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  date: string;
  publisher: string;
  summary: string;
  category: string;
  researchField: string;
  sourceUrl: string;
}

export type ViewMode = 'grid' | 'list';
export type SortField = 'date' | 'title' | 'author' | 'publisher';
export type SortDirection = 'asc' | 'desc';

export interface AIModel {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  creator: string;
  releaseDate: string;
  rating: number;
  category: string;
  tags?: string[];
  logoColor?: string;
  userActivity24h?: number;
  userActivity7d?: number;
  website?: string;
  metrics?: {
    codingScore?: number;
    mathScore?: number;
    researchScore?: number;
    apiCalls24h?: number;
    accuracy?: number;
    hallucinationRate?: number;
    parameters?: string;
    trainingTokens?: string;
  };
}
