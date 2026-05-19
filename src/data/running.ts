import { RunLog, RunningStats, Video } from '@/types';
import { getStravaActivities, getStravaStats } from '@/lib/strava';
import { getRunningShorts } from '@/data/videos';

// ============================================
// Run Logs
// ============================================

export async function getRunLogs(): Promise<RunLog[]> {
  const stravaActivities = await getStravaActivities();
  return stravaActivities;
}

export async function getRunningStats(): Promise<RunningStats> {
  const stravaStats = await getStravaStats();
  // Return empty stats if no data
  if (!stravaStats) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalRuns: 0,
      totalDistance: 0,
      totalTime: 0,
      averagePace: '0:00',
      averagePaceSeconds: 0,
      averageDistance: 0,
      thisWeekRuns: 0,
      thisMonthRuns: 0,
      mostRecentDate: new Date().toISOString(),
      totalElevation: 0,
      averageElevation: 0,
      fastestPace: 0,
      fastestPaceDate: '',
      longestRun: 0,
      longestRunDate: '',
      highestElevation: 0,
      highestElevationDate: '',
      highestSpeed: 0,
      highestSpeedDate: '',
      ytdRuns: 0,
      ytdDistance: 0,
    };
  }
  return stravaStats;
}

export async function getRecentRuns(limit: number = 10): Promise<RunLog[]> {
  const runs = await getRunLogs();
  return runs.slice(0, limit);
}

// Extended run type with video data
export interface RunWithVideo extends RunLog {
  video?: Video;
}

// Match runs to their YouTube shorts by title
export async function getRecentRunsWithVideos(limit: number = 6): Promise<RunWithVideo[]> {
  const [runs, videos] = await Promise.all([
    getRunLogs(),
    getRunningShorts(),
  ]);
  
  const recentRuns = runs.slice(0, limit);
  
  return recentRuns.map((run) => {
    // Try to find a matching video by title
    // Strava titles typically contain the date and distance
    // e.g., "Morning Run" or with pace info
    const matchingVideo = videos.find((video) => {
      const videoTitle = video.title.toLowerCase();
      const runDate = run.date.replace(/-/g, '');
      
      // Check if video title contains the date or distance
      // Running shorts often have titles like "5km in X:XX" or just date
      return videoTitle.includes(run.distance.toString()) || 
             videoTitle.includes(runDate) ||
             videoTitle.includes(run.date);
    });
    
    return {
      ...run,
      video: matchingVideo,
    };
  });
}

export async function getCurrentStreak(): Promise<number> {
  const stats = await getRunningStats();
  return stats.currentStreak;
}

// Get all running videos with their associated run data from Strava
export async function getRunningVideosWithRuns(): Promise<{ video: Video; run?: RunLog }[]> {
  const [runs, videos] = await Promise.all([
    getRunLogs(),
    getRunningShorts(),
  ]);
  
  return videos.map((video) => {
    // Try to find matching run by date
    const runDate = new Date(video.publishedAt).toISOString().split('T')[0];
    const matchingRun = runs.find((run) => run.date === runDate);
    
    return {
      video,
      run: matchingRun,
    };
  });
}

export async function getRunByDate(date: string): Promise<RunLog | undefined> {
  const runs = await getRunLogs();
  return runs.find((r) => r.date === date);
}

export async function getRunsThisWeek(): Promise<RunLog[]> {
  const runs = await getRunLogs();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return runs.filter((r) => new Date(r.date) >= weekAgo);
}

export async function getRunsThisMonth(): Promise<RunLog[]> {
  const runs = await getRunLogs();
  const now = new Date();
  return runs.filter((r) => {
    const runDate = new Date(r.date);
    return runDate.getMonth() === now.getMonth() && runDate.getFullYear() === now.getFullYear();
  });
}
