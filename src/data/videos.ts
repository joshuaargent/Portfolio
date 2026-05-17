import { Video } from '@/types';
import { getYouTubeVideos } from '@/lib/youtube';

export async function getVideos(): Promise<Video[]> {
  return getYouTubeVideos();
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

export async function getRunningShorts(): Promise<Video[]> {
  return getVideosByType('running-short');
}

export async function getVideosByBook(bookSlug: string): Promise<Video[]> {
  const videos = await getVideos();
  return videos.filter((v) => v.relatedBookSlug === bookSlug);
}
