import { RunLog, RunningStats } from '@/types';

// ============================================
// Running Data - Update with your actual runs
// ============================================

// Sample running logs - replace with your actual data
export const runLogs: RunLog[] = [
  {
    id: '1',
    date: '2025-01-15',
    distance: 5,
    duration: 1500, // 25 minutes in seconds
    pace: '5:00',
    feeling: 'great',
    notes: 'Felt strong today. Good energy throughout.',
    weather: 'Sunny, 15°C',
  },
  {
    id: '2',
    date: '2025-01-14',
    distance: 5,
    duration: 1530, // 25:30
    pace: '5:06',
    feeling: 'good',
    notes: 'Solid run. Slightly tired from yesterday.',
    weather: 'Cloudy, 12°C',
  },
  {
    id: '3',
    date: '2025-01-13',
    distance: 5,
    duration: 1560, // 26:00
    pace: '5:12',
    feeling: 'good',
    notes: 'Easy pace. Focused on form.',
    weather: 'Rainy, 10°C',
  },
  {
    id: '4',
    date: '2025-01-12',
    distance: 5,
    duration: 1470, // 24:30
    pace: '4:54',
    feeling: 'great',
    notes: 'Personal best pace! Feeling fit.',
    weather: 'Clear, 8°C',
  },
  {
    id: '5',
    date: '2025-01-11',
    distance: 5,
    duration: 1620, // 27:00
    pace: '5:24',
    feeling: 'tired',
    notes: 'Legs were heavy. Took it easy.',
    weather: 'Windy, 11°C',
  },
  // Add more runs here...
];

// ============================================
// Running Stats
// ============================================

export const runningStats: RunningStats = {
  currentStreak: 87,
  longestStreak: 87,
  totalRuns: 87,
  totalDistance: 435, // 87 * 5km
  totalTime: 130500, // sum of all durations
  averagePace: '5:05',
  averageDistance: 5,
  thisWeekRuns: 5,
  thisMonthRuns: 22,
};

// ============================================
// Helper Functions
// ============================================

export async function getRunLogs(): Promise<RunLog[]> {
  return runLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getRunByDate(date: string): Promise<RunLog | undefined> {
  return runLogs.find((r) => r.date === date);
}

export async function getRecentRuns(limit: number = 10): Promise<RunLog[]> {
  return runLogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getRunningStats(): Promise<RunningStats> {
  return runningStats;
}

export async function getCurrentStreak(): Promise<number> {
  return runningStats.currentStreak;
}

export async function getRunsThisWeek(): Promise<RunLog[]> {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return runLogs.filter((r) => new Date(r.date) >= weekAgo);
}

export async function getRunsThisMonth(): Promise<RunLog[]> {
  const now = new Date();
  return runLogs.filter((r) => {
    const runDate = new Date(r.date);
    return runDate.getMonth() === now.getMonth() && runDate.getFullYear() === now.getFullYear();
  });
}
