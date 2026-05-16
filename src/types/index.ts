// ============================================
// Core Types for Joshua's Portfolio
// ============================================

// ----- Site Configuration -----
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    youtube: string;
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
}

// ----- Navigation -----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ----- Content Types -----
export type ContentType = 'video' | 'article' | 'short' | 'running-short';
export type ContentCategory = 'faith' | 'psychology' | 'health' | 'performance' | 'learning';
export type VideoType = 'long-form' | 'short' | 'running-short';
export type ProjectStatus = 'active' | 'completed' | 'archived';
export type BookStatus = 'reading' | 'completed' | 'upcoming';

// ----- Video -----
export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  type: VideoType;
  tags: string[];
  category?: ContentCategory;
  relatedBookSlug?: string;
  viewCount?: number;
  likeCount?: number;
}

// ----- Book -----
export interface Book {
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  startedAt: string;
  finishedAt?: string;
  rating?: number;
  status: BookStatus;
  review?: string;
  keyIdeas: string[];
  category: ContentCategory[];
  videos: Video[];
  notes?: string;
  amazonUrl?: string;
  goodreadsUrl?: string;
}

// ----- Project -----
export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshots: string[];
  status: ProjectStatus;
  featured: boolean;
  tags: string[];
  stars?: number;
  language?: string;
  updatedAt?: string;
  createdAt: string;
}

// ----- Run Log -----
export interface RunLog {
  id: string;
  date: string;
  distance: number;
  duration: number; // in seconds
  pace: string;
  feeling: 'great' | 'good' | 'tired' | 'rough';
  notes?: string;
  weather?: string;
  videoId?: string;
}

// ----- Running Stats -----
export interface RunningStats {
  currentStreak: number;
  longestStreak: number;
  totalRuns: number;
  totalDistance: number;
  totalTime: number; // in seconds
  averagePace: string;
  averageDistance: number;
  thisWeekRuns: number;
  thisMonthRuns: number;
}

// ----- Blog Post -----
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: ContentCategory[];
  readingTime: string;
  featured: boolean;
  coverImage?: string;
  relatedBooks?: string[];
  relatedContent?: string[];
}

// ----- Content Piece -----
export interface ContentPiece {
  slug: string;
  title: string;
  type: ContentType;
  category: ContentCategory;
  excerpt: string;
  publishedAt: string;
  thumbnail?: string;
  youtubeId?: string;
  content?: string;
  tags: string[];
}

// ----- CV / Experience -----
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
  techStack?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface CVData {
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// ----- GitHub Types -----
export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  isFork: boolean;
}

// ----- YouTube Channel Stats -----
export interface YouTubeStats {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

// ----- Component Props -----
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseProps {
  id?: string;
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

// ----- Form Types -----
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ----- API Response Types -----
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
