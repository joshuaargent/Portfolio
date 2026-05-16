import { RunLog, RunningStats } from '@/types';

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const BASE_URL = 'https://www.strava.com/api/v3';

async function refreshAccessToken(): Promise<string | null> {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return null;
  }

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Strava token:', error);
    return null;
  }
}

async function fetchWithAuth(url: string, token: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    const newToken = await refreshAccessToken();
    if (newToken) {
      return fetch(url, {
        headers: { Authorization: `Bearer ${newToken}` },
        next: { revalidate: 3600 },
      });
    }
  }

  return response;
}

export async function getStravaActivities(): Promise<RunLog[]> {
  if (!STRAVA_ACCESS_TOKEN) {
    console.warn('Strava access token not configured');
    return [];
  }

  try {
    const response = await fetchWithAuth(
      `${BASE_URL}/athlete/activities?per_page=100`,
      STRAVA_ACCESS_TOKEN
    );

    if (!response.ok) {
      throw new Error(`Strava API error: ${response.status}`);
    }

    const activities = await response.json();

    // Filter only running activities
    return activities
      .filter((activity: any) => activity.type === 'Run')
      .map((activity: any) => ({
        id: activity.id.toString(),
        date: activity.start_date_local.split('T')[0],
        distance: Math.round(activity.distance / 1000), // Convert to km
        duration: activity.moving_time,
        pace: calculatePace(activity.distance, activity.moving_time),
        feeling: mapFeeloutToFeeling(activity.average_heartrate),
        notes: activity.name || undefined,
        weather: activity.description || undefined,
      }));
  } catch (error) {
    console.error('Error fetching Strava activities:', error);
    return [];
  }
}

export async function getStravaStats(): Promise<RunningStats | null> {
  if (!STRAVA_ACCESS_TOKEN) {
    console.warn('Strava access token not configured');
    return null;
  }

  try {
    const activities = await getStravaActivities();

    if (activities.length === 0) return null;

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedActivities = [...activities].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Check if there's a run today
    const hasRunToday = sortedActivities.some(
      (run) => new Date(run.date).toDateString() === today.toDateString()
    );

    let checkDate = new Date(today);
    if (!hasRunToday) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    for (const run of sortedActivities) {
      const runDate = new Date(run.date);
      runDate.setHours(0, 0, 0, 0);

      if (runDate.toDateString() === checkDate.toDateString()) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (runDate < checkDate) {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;
    const chronological = [...activities].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (let i = 1; i < chronological.length; i++) {
      const prev = new Date(chronological[i - 1].date);
      const curr = new Date(chronological[i].date);
      const dayDiff = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate totals
    const totalDistance = activities.reduce((sum, run) => sum + run.distance, 0);
    const totalTime = activities.reduce((sum, run) => sum + run.duration, 0);
    const avgPaceSeconds =
      activities.reduce((sum, run) => {
        const [min, sec] = run.pace.split(':').map(Number);
        return sum + min * 60 + sec;
      }, 0) / activities.length;

    // This week's runs
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeekRuns = activities.filter((run) => new Date(run.date) >= weekAgo).length;

    // This month's runs
    const now = new Date();
    const thisMonthRuns = activities.filter((run) => {
      const runDate = new Date(run.date);
      return runDate.getMonth() === now.getMonth() && runDate.getFullYear() === now.getFullYear();
    }).length;

    return {
      currentStreak,
      longestStreak,
      totalRuns: activities.length,
      totalDistance,
      totalTime,
      averagePace: `${Math.floor(avgPaceSeconds / 60)}:${Math.round(avgPaceSeconds % 60)
        .toString()
        .padStart(2, '0')}`,
      averageDistance: Math.round(totalDistance / activities.length),
      thisWeekRuns,
      thisMonthRuns,
    };
  } catch (error) {
    console.error('Error calculating Strava stats:', error);
    return null;
  }
}

function calculatePace(distanceMeters: number, timeSeconds: number): string {
  const distanceKm = distanceMeters / 1000;
  const paceSecondsPerKm = timeSeconds / distanceKm;
  const minutes = Math.floor(paceSecondsPerKm / 60);
  const seconds = Math.round(paceSecondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function mapFeeloutToFeeling(heartrate?: number): RunLog['feeling'] {
  if (!heartrate) return 'good';
  if (heartrate > 170) return 'rough';
  if (heartrate > 150) return 'tired';
  if (heartrate > 130) return 'good';
  return 'great';
}
