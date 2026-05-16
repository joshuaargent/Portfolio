import { NextResponse } from 'next/server';

const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

const BASE_URL = 'https://www.strava.com/api/v3';

async function refreshToken() {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  // Check if token exists
  if (!STRAVA_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'STRAVA_ACCESS_TOKEN not set' }, { status: 500 });
  }

  try {
    // Try fetching activities with current token
    let response = await fetch(`${BASE_URL}/athlete/activities?per_page=5`, {
      headers: { Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}` },
    });

    // If 401, try refreshing token
    if (response.status === 401) {
      console.log('Token expired, refreshing...');
      const newToken = await refreshToken();
      if (newToken) {
        response = await fetch(`${BASE_URL}/athlete/activities?per_page=5`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      }
    }

    const status = response.status;
    const data = await response.text();

    return NextResponse.json({
      status,
      statusText: response.statusText,
      data: data.substring(0, 500), // First 500 chars
      hasToken: !!STRAVA_ACCESS_TOKEN,
      hasRefreshToken: !!STRAVA_REFRESH_TOKEN,
      hasClientId: !!STRAVA_CLIENT_ID,
      hasClientSecret: !!STRAVA_CLIENT_SECRET,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}