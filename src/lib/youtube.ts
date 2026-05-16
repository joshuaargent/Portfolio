import { Video, YouTubeStats } from '@/types';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function getYouTubeStats(): Promise<YouTubeStats | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube API key or channel ID not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) throw new Error(`YouTube API error: ${response.status}`);

    const data = await response.json();
    const stats = data.items?.[0]?.statistics;

    if (!stats) return null;

    return {
      subscriberCount: parseInt(stats.subscriberCount || '0'),
      videoCount: parseInt(stats.videoCount || '0'),
      viewCount: parseInt(stats.viewCount || '0'),
    };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return null;
  }
}

export async function getYouTubeVideos(): Promise<Video[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube API key or channel ID not configured');
    return [];
  }

  const videos: Video[] = [];
  let nextPageToken = '';

  try {
    do {
      const url = `${BASE_URL}/search?channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&order=date&maxResults=50&type=video&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`;

      const response = await fetch(url, { next: { revalidate: 3600 } });

      if (!response.ok) throw new Error(`YouTube API error: ${response.status}`);

      const data = await response.json();

      if (!data.items?.length) break;

      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');

      const detailsResponse = await fetch(
        `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      const detailsData = await detailsResponse.json();
      const detailsMap = new Map(detailsData.items?.map((item: any) => [item.id, item]) || []);

      for (const item of data.items) {
        const details = detailsMap.get(item.id.videoId) as any;
        const duration = details?.contentDetails?.duration || 'PT0S';
        const stats = details?.statistics;

        videos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          youtubeId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          duration: parseDuration(duration),
          publishedAt: item.snippet.publishedAt,
          type: categorizeVideo(item.snippet.title, duration),
          tags: item.snippet.tags || [],
          viewCount: stats ? parseInt(stats.viewCount) : undefined,
          likeCount: stats ? parseInt(stats.likeCount) : undefined,
        });
      }

      nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function categorizeVideo(title: string, duration: string): Video['type'] {
  const lowerTitle = title.toLowerCase();

  // Check for running-related keywords in title
  const runningKeywords = ['run', '5km', 'daily', '今日のRUN', 'morning run', 'evening run', 'jogging', 'km', ' strava', 'walking', 'pb'];
  if (runningKeywords.some((keyword) => lowerTitle.includes(keyword))) {
    return 'running-short';
  }

  // Check duration - videos under 60 seconds are usually shorts
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const totalSeconds =
    parseInt(match?.[1] || '0') * 3600 +
    parseInt(match?.[2] || '0') * 60 +
    parseInt(match?.[3] || '0');

  if (totalSeconds < 60) {
    return 'short';
  }

  return 'long-form';
}
