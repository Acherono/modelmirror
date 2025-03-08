
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
