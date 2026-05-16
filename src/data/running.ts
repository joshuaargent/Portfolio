import { RunLog, RunningStats } from '@/types';
import { getStravaActivities, getStravaStats } from '@/lib/strava';

// Fallback static data (used when Strava is not configured)
const fallbackRunLogs: RunLog[] = [
  {
    id: '1',
    date: '2025-01-15',
    distance: 5,
    duration: 1500,
    pace: '5:00',
    feeling: 'great',
    notes: 'Felt strong today. Good energy throughout.',
    weather: 'Sunny, 15°C',
  },
  {
    id: '2',
    date: '2025-01-14',
    distance: 5,
    duration: 1530,
    pace: '5:06',
    feeling: 'good',
    notes: 'Solid run. Slightly tired from yesterday.',
    weather: 'Cloudy, 12°C',
  },
];

const fallbackStats: RunningStats = {
  currentStreak: 87,
  longestStreak: 87,
  totalRuns: 87,
  totalDistance: 435,
  totalTime: 130500,
  averagePace: '5:05',
  averageDistance: 5,
  thisWeekRuns: 5,
  thisMonthRuns: 22,
};

export async function getRunLogs(): Promise<RunLog[]> {
  const stravaActivities = await getStravaActivities();
  return stravaActivities.length > 0 ? stravaActivities : fallbackRunLogs;
}

export async function getRunningStats(): Promise<RunningStats> {
  const stravaStats = await getStravaStats();
  return stravaStats || fallbackStats;
}

export async function getRecentRuns(limit: number = 10): Promise<RunLog[]> {
  const runs = await getRunLogs();
  return runs.slice(0, limit);
}

export async function getCurrentStreak(): Promise<number> {
  const stats = await getRunningStats();
  return stats.currentStreak;
}

// Keep other functions using the base functions
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
