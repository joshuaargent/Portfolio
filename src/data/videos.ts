import { Video } from "@/types";

// ============================================
// Videos Data - Add your YouTube videos here
// ============================================

export const videos: Video[] = [
  {
    id: "1",
    title: "Atomic Habits — Full Summary & Key Lessons",
    description:
      "A comprehensive summary of James Clear's Atomic Habits, covering the four laws of behavior change and how to build better habits.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "15:32",
    publishedAt: "2025-01-14",
    type: "long-form",
    tags: ["habits", "productivity", "psychology"],
    category: "psychology",
    relatedBookSlug: "atomic-habits",
    viewCount: 12500,
    likeCount: 450,
  },
  {
    id: "2",
    title: "How to Make Habits Stick",
    description: "The secret to making habits stick is simpler than you think.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "0:45",
    publishedAt: "2025-01-13",
    type: "short",
    tags: ["habits", "motivation"],
    category: "psychology",
    viewCount: 8500,
    likeCount: 320,
  },
  {
    id: "3",
    title: "Day 87 — Morning 5km Run",
    description: "Daily run update. Feeling great today!",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "0:30",
    publishedAt: "2025-01-15",
    type: "running-short",
    tags: ["running", "5km", "daily"],
    category: "health",
    viewCount: 1200,
    likeCount: 85,
  },
  {
    id: "4",
    title: "Deep Work — Why Focus is Your Superpower",
    description: "Cal Newport's Deep Work explained in 10 minutes.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "10:15",
    publishedAt: "2025-01-07",
    type: "long-form",
    tags: ["focus", "productivity", "work"],
    category: "performance",
    relatedBookSlug: "deep-work",
    viewCount: 15000,
    likeCount: 520,
  },
  {
    id: "5",
    title: "Finding Meaning in Suffering",
    description: "Lessons from Viktor Frankl on finding purpose.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "12:45",
    publishedAt: "2024-12-28",
    type: "long-form",
    tags: ["meaning", "purpose", "faith"],
    category: "faith",
    relatedBookSlug: "mans-search-for-meaning",
    viewCount: 9800,
    likeCount: 410,
  },
  // Add more videos here...
];

// ============================================
// Helper Functions
// ============================================

export async function getVideos(): Promise<Video[]> {
  return videos.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  return videos.find((v) => v.id === id);
}

export async function getVideosByType(type: Video["type"]): Promise<Video[]> {
  return videos
    .filter((v) => v.type === type)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  return videos
    .filter((v) => v.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getRecentVideos(limit: number = 6): Promise<Video[]> {
  return videos
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export async function getLongFormVideos(): Promise<Video[]> {
  return getVideosByType("long-form");
}

export async function getShortVideos(): Promise<Video[]> {
  return getVideosByType("short");
}

export async function getRunningShorts(): Promise<Video[]> {
  return getVideosByType("running-short");
}

export async function getVideosByBook(bookSlug: string): Promise<Video[]> {
  return videos.filter((v) => v.relatedBookSlug === bookSlug);
}
