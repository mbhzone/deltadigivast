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
}
