import { RunLog, RunningStats } from '@/types';
import { getStravaActivities, getStravaStats } from '@/lib/strava';

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

export async function getCurrentStreak(): Promise<number> {
  const stats = await getRunningStats();
  return stats.currentStreak;
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
