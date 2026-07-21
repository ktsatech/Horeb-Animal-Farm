export type Tab = 'home' | 'gallery' | 'about' | 'services' | 'contact';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'rabbit' | 'layer' | 'pig' | 'all';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  details?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  basePrice: string;
  pricePerUnit: number;
  unitLabel: string;
}
