import { RunLog, RunningStats } from '@/types';

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const BASE_URL = 'https://www.strava.com/api/v3';

function isConfigured(): boolean {
  return !!STRAVA_ACCESS_TOKEN;
}

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

export async function getStravaActivities(): Promise<RunLog[]> {
  if (!isConfigured()) {
    console.log('Strava not configured, using fallback data');
    return [];
  }

  try {
    console.log('Fetching Strava activities...');

    // Try with current token first
    let response = await fetch(`${BASE_URL}/athlete/activities?per_page=100`, {
      headers: {
        Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    // If 401, token expired - try to refresh
    if (response.status === 401) {
      console.log('Token expired, attempting refresh...');
      const newToken = await refreshAccessToken();
      if (newToken) {
        response = await fetch(`${BASE_URL}/athlete/activities?per_page=100`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
          next: { revalidate: 3600 },
        });
      }
    }

    console.log('Strava API response status:', response.status, response.statusText);

    // Log response body for debugging
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Strava API error response:', errorBody);
      throw new Error(`Strava API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const activities = await response.json();
    console.log(`Fetched ${activities.length} activities from Strava`);
    return processActivities(activities);
  } catch (error) {
    console.error('Error fetching Strava activities:', error);
    return [];
  }
}

function processActivities(activities: any[]): RunLog[] {
  return activities
    .filter((activity: any) => activity.type === 'Run' || activity.type === 'Walk')
    .map((activity: any) => {
      const distanceMeters = activity.distance || 0;
      const movingTimeSeconds = activity.moving_time || 0;
      
      // Strava returns speeds in m/s - convert to km/h
      // Note: Strava returns 0 if not measured (no device)
      const averageSpeedKmh = activity.average_speed ? activity.average_speed * 3.6 : 0;
      const maxSpeedKmh = activity.max_speed ? activity.max_speed * 3.6 : 0;
      
      // Calculate pace from distance and time
      const paceSeconds = distanceMeters > 0 && movingTimeSeconds > 0 
        ? Math.round(movingTimeSeconds / (distanceMeters / 1000)) 
        : 0;
      
      return {
        id: activity.id.toString(),
        date: activity.start_date_local.split('T')[0],
        distance: Math.round((distanceMeters / 1000) * 10) / 10,
        duration: movingTimeSeconds,
        pace: calculatePace(distanceMeters, movingTimeSeconds),
        paceSeconds,
        feeling: mapSpeedToFeeling(averageSpeedKmh),
        notes: activity.name || undefined,
        weather: undefined,
        elevation: activity.total_elevation_gain || 0,
        // Strava returns 0 if not available - show actual value
        calories: activity.calories,
        averageSpeed: Math.round(averageSpeedKmh * 10) / 10,
        maxSpeed: Math.round(maxSpeedKmh * 10) / 10,
      };
    });
}

// Map average speed (km/h) to feeling - faster = better
function mapSpeedToFeeling(speedKmh: number): RunLog['feeling'] {
  if (!speedKmh || speedKmh === 0) return 'good';
  // Assuming ~10 km/h is a solid run (6 min/km pace)
  if (speedKmh >= 11) return 'great'; // ~5:27/km or faster
  if (speedKmh >= 10) return 'good'; // ~6:00/km
  if (speedKmh >= 8.5) return 'tired'; // ~7:04/km or slower
  return 'rough'; // very slow
}

export async function getStravaStats(): Promise<RunningStats | null> {
  const activities = await getStravaActivities();

  if (activities.length === 0) return null;

  // Get the most recent run date from the data
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mostRecentDate = new Date(sortedActivities[0].date);
  mostRecentDate.setHours(0, 0, 0, 0);

  // Calculate streak starting from the most recent data date
  let currentStreak = 0;
  const checkDate = new Date(mostRecentDate);

  const hasRunOnMostRecentDate = sortedActivities.some(
    (run) => new Date(run.date).toDateString() === checkDate.toDateString()
  );

  if (!hasRunOnMostRecentDate) {
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

  const totalDistance = activities.reduce((sum, run) => sum + run.distance, 0);
  const totalTime = activities.reduce((sum, run) => sum + run.duration, 0);
  const avgPaceSeconds =
    activities.length > 0
      ? activities.reduce((sum, run) => sum + (run.paceSeconds || 0), 0) / activities.length
      : 0;

  // Find most recent run date in the data for week/month calculations
  const sortedByDate = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const dataMostRecentDate = new Date(sortedByDate[0]?.date || new Date());

  // Calculate this week runs relative to the most recent data date
  const weekAgo = new Date(dataMostRecentDate);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeekRuns = activities.filter((run) => {
    const runDate = new Date(run.date);
    return runDate >= weekAgo && runDate <= dataMostRecentDate;
  }).length;

  // Calculate this month runs relative to the most recent data month
  const thisMonthRuns = activities.filter((run) => {
    const runDate = new Date(run.date);
    return runDate.getMonth() === dataMostRecentDate.getMonth() && runDate.getFullYear() === dataMostRecentDate.getFullYear();
  }).length;

  // Year to date stats
  const yearStart = new Date(dataMostRecentDate.getFullYear(), 0, 1);
  const ytdRuns = activities.filter((run) => {
    const runDate = new Date(run.date);
    return runDate >= yearStart;
  }).length;
  const ytdDistance = activities
    .filter((run) => new Date(run.date) >= yearStart)
    .reduce((sum, run) => sum + run.distance, 0);

  // Elevation stats
  const totalElevation = activities.reduce((sum, run) => sum + (run.elevation || 0), 0);
  const averageElevation = activities.length > 0 
    ? Math.round(totalElevation / activities.length) 
    : 0;

  // Calories
  const totalCalories = activities.reduce((sum, run) => sum + (run.calories || 0), 0);

  // Personal Records
  let fastestPace = Infinity;
  let fastestPaceDate = '';
  let longestRun = 0;
  let longestRunDate = '';
  let highestElevation = 0;
  let highestElevationDate = '';
  let highestSpeed = 0;
  let highestSpeedDate = '';

  for (const run of activities) {
    // Fastest pace (lowest seconds per km)
    if (run.paceSeconds > 0 && run.paceSeconds < fastestPace) {
      fastestPace = run.paceSeconds;
      fastestPaceDate = run.date;
    }
    // Longest run
    if (run.distance > longestRun) {
      longestRun = run.distance;
      longestRunDate = run.date;
    }
    // Highest elevation
    if ((run.elevation || 0) > highestElevation) {
      highestElevation = run.elevation || 0;
      highestElevationDate = run.date;
    }
    // Highest speed
    if ((run.maxSpeed || 0) > highestSpeed) {
      highestSpeed = run.maxSpeed || 0;
      highestSpeedDate = run.date;
    }
  }

  // Calculate average per day (since first run)
  const firstRunDate = new Date(chronological[0]?.date || new Date());
  const today = new Date();
  const daysSinceFirstRun = Math.max(1, Math.floor((today.getTime() - firstRunDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const avgPerDay = daysSinceFirstRun > 0 ? totalDistance / daysSinceFirstRun : 0;

  return {
    currentStreak,
    longestStreak,
    totalRuns: activities.length,
    totalDistance: Math.round(totalDistance),
    totalTime,
    averagePace: `${Math.floor(avgPaceSeconds / 60)}:${Math.round(avgPaceSeconds % 60)
      .toString()
      .padStart(2, '0')}`,
    averagePaceSeconds: Math.round(avgPaceSeconds),
    averageDistance: Math.round(avgPerDay * 100) / 100,
    thisWeekRuns,
    thisMonthRuns,
    // New fields
    totalElevation,
    averageElevation,
    // Strava returns 0 if not available - always return the actual value
    totalCalories,
    // Personal Records
    fastestPace: fastestPace === Infinity ? 0 : fastestPace,
    fastestPaceDate,
    longestRun: longestRun || 0,
    longestRunDate,
    highestElevation,
    highestElevationDate,
    highestSpeed: highestSpeed || 0,
    highestSpeedDate,
    // Year to date
    ytdRuns,
    ytdDistance: Math.round(ytdDistance),
  };
}

function calculatePace(distanceMeters: number, timeSeconds: number): string {
  if (distanceMeters === 0 || timeSeconds === 0) return '0:00';
  const distanceKm = distanceMeters / 1000;
  const paceSecondsPerKm = timeSeconds / distanceKm;
  const minutes = Math.floor(paceSecondsPerKm / 60);
  const seconds = Math.round(paceSecondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function mapHeartrateToFeeling(heartrate?: number): RunLog['feeling'] {
  if (!heartrate) return 'good';
  if (heartrate > 170) return 'rough';
  if (heartrate > 150) return 'tired';
  if (heartrate > 130) return 'good';
  return 'great';
}
