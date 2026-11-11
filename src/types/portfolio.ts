export type Language = 'fr' | 'en';

export interface Project {
  id: string;
  title: string;
  tagline: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  fullDetails?: {
    fr: string;
    en: string;
  };
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'hardware' | 'backend';
  companyOrContext: string;
  year: string;
  highlights: {
    fr: string[];
    en: string[];
  };
  metrics?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: {
    fr: string;
    en: string;
  };
  company: string;
  period: string;
  location: string;
  projectWorkedOn?: string;
  description: {
    fr: string;
    en: string;
  };
  achievements: {
    fr: string[];
    en: string[];
  };
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period: string;
  description: {
    fr: string;
    en: string;
  };
  credentialUrl?: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: {
    fr: string;
    en: string;
  };
  institution: string;
  period: string;
  location: string;
  field: {
    fr: string;
    en: string;
  };
}

export interface AnimeInspiration {
  title: string;
  japaneseTitle: string;
  characterOrTheme: string;
  connectionToDev: {
    fr: string;
    en: string;
  };
  quote: string;
  quoteAuthor: string;
}
