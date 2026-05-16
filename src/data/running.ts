import { RunLog, RunningStats } from '@/types';
import { getStravaActivities, getStravaStats } from '@/lib/strava';

// ============================================
// Run Logs
// ============================================

// Fallback static data
const fallbackRunLogs: RunLog[] = [
  {
    id: '1',
    date: '2025-01-15',
    distance: 5,
    duration: 1500,
    pace: '5:00',
    paceSeconds: 300,
    feeling: 'great',
    notes: 'Felt strong today. Good energy throughout.',
    weather: 'Sunny, 15°C',
    elevation: 25,
    averageSpeed: 12,
    maxSpeed: 12,
  },
  {
    id: '2',
    date: '2025-01-14',
    distance: 5,
    duration: 1530,
    pace: '5:06',
    paceSeconds: 306,
    feeling: 'good',
    notes: 'Solid run. Slightly tired from yesterday.',
    weather: 'Cloudy, 12°C',
    elevation: 15,
    averageSpeed: 11.8,
    maxSpeed: 12.2,
  },
  {
    id: '3',
    date: '2025-01-13',
    distance: 5,
    duration: 1560,
    pace: '5:12',
    paceSeconds: 312,
    feeling: 'good',
    notes: 'Easy pace. Focused on form.',
    weather: 'Rainy, 10°C',
    elevation: 5,
    averageSpeed: 11.5,
    maxSpeed: 12,
  },
];

const fallbackStats: RunningStats = {
  currentStreak: 3,
  longestStreak: 3,
  totalRuns: 3,
  totalDistance: 15,
  totalTime: 4590,
  averagePace: '5:06',
  averagePaceSeconds: 306,
  averageDistance: 5,
  thisWeekRuns: 3,
  thisMonthRuns: 3,
  // New fields
  totalElevation: 45,
  averageElevation: 15,
  totalCalories: 1200,
  // Personal Records
  fastestPace: 300,
  fastestPaceDate: '2025-01-15',
  longestRun: 5,
  longestRunDate: '2025-01-15',
  highestElevation: 25,
  highestElevationDate: '2025-01-15',
  highestSpeed: 11.2,
  highestSpeedDate: '2025-01-15',
  // Year to date
  ytdRuns: 3,
  ytdDistance: 15,
};

export async function getRunLogs(): Promise<RunLog[]> {
  try {
    const stravaActivities = await getStravaActivities();
    if (stravaActivities.length > 0) {
      console.log('Using Strava data for run logs');
      return stravaActivities;
    }
  } catch (error) {
    console.error('Error getting Strava activities, using fallback:', error);
  }

  console.log('Using fallback run logs');
  return fallbackRunLogs;
}

export async function getRunningStats(): Promise<RunningStats> {
  try {
    const stravaStats = await getStravaStats();
    if (stravaStats) {
      console.log('Using Strava data for stats');
      return stravaStats;
    }
  } catch (error) {
    console.error('Error getting Strava stats, using fallback:', error);
  }

  console.log('Using fallback stats');
  return fallbackStats;
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
