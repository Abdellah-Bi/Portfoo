export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  longDescription: string;
  role: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    cloud: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  previewType: 'nan' | 'hedonic' | 'autonomous' | 'car_rental' | 'circuit' | 'nike' | 'chatgpt' | 'travel' | 'lms' | 'telemetry' | 'ai' | 'shader';
  imageUrl?: string;
  fallbackImageUrl?: string;
  galleryImages?: { url: string; label: string; caption?: string }[];
}

export interface ExperienceLog {
  title: string;
  organization: string;
  period: string;
  location?: string;
  responsibilities: string[];
  tag: string;
}

export interface HonorAward {
  title: string;
  year: string;
  award: string;
  field: string;
  description: string;
}

export interface LinguisticCapability {
  language: string;
  proficiency: string;
  level: number; // 1-100
  type: 'Native' | 'Advanced' | 'Intermediate';
  note?: string;
}

export interface SkillCategory {
  title: string;
  latinName: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    focus: string;
    codeSnippet?: string;
  }[];
}

export interface ChapterInfo {
  id: string;
  numeral: string;
  title: string;
  latinTitle: string;
  summary: string;
  progressRange: [number, number]; // [start%, end%]
}

export interface FlightState {
  progress: number; // 0 to 1
  scrollVelocity: number;
  currentChapterIndex: number;
  birdX: number;
  birdY: number;
  birdRotation: number;
  isFlappingFast: boolean;
}

