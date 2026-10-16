export interface Service {
  slug: string;
  title: string;
  description: string;
  href: string;
  entry: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Office {
  city: string;
  country: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  tags: string[];
  author: string;
  coverImage: string;
  seoKeyword: string;
}

export interface PortfolioEntry {
  slug: string;
  client: string;
  service: string;
  headline: string;
  description: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  featured: boolean;
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar?: string;
}
