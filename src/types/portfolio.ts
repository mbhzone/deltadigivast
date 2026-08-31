export type PortfolioCategory =
  | 'Video Content'
  | 'Graphical Content'
  | 'Campaign Result'
  | 'Website';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  type: 'image' | 'video content';
  url: string;
  description?: string;
  websiteLiveLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  videoUrl: string | null;
  websiteLiveLink: string | null;
  createdAt: string;
  updatedAt: string;
}
