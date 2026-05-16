import { Video } from '@/types';
import { getYouTubeVideos } from '@/lib/youtube';

// Fallback static data
const fallbackVideos: Video[] = [
  {
    id: '1',
    title: 'Atomic Habits — Full Summary & Key Lessons',
    description: "A comprehensive summary of James Clear's Atomic Habits.",
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    duration: '15:32',
    publishedAt: '2025-01-14',
    type: 'long-form',
    tags: ['habits', 'productivity', 'psychology'],
    category: 'psychology',
    relatedBookSlug: 'atomic-habits',
    viewCount: 12500,
    likeCount: 450,
  },
];

export async function getVideos(): Promise<Video[]> {
  const youtubeVideos = await getYouTubeVideos();
  return youtubeVideos.length > 0 ? youtubeVideos : fallbackVideos;
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  const videos = await getVideos();
  return videos.find((v) => v.id === id);
}

export async function getVideosByType(type: Video['type']): Promise<Video[]> {
  const videos = await getVideos();
  return videos.filter((v) => v.type === type);
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  const videos = await getVideos();
  return videos.filter((v) => v.category === category);
}

export async function getRecentVideos(limit: number = 6): Promise<Video[]> {
  const videos = await getVideos();
  return videos.slice(0, limit);
}

export async function getLongFormVideos(): Promise<Video[]> {
  return getVideosByType('long-form');
}

export async function getShortVideos(): Promise<Video[]> {
  return getVideosByType('short');
}

// Legacy function - running-short type was removed, returns all videos for now
export async function getRunningShorts(): Promise<Video[]> {
  return getVideos();
}

export async function getVideosByBook(bookSlug: string): Promise<Video[]> {
  const videos = await getVideos();
  return videos.filter((v) => v.relatedBookSlug === bookSlug);
}
