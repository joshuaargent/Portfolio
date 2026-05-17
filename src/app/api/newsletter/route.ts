import { NextResponse } from 'next/server';

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;
const BASE_URL = 'https://api.buttondown.com/v1';

export async function POST(request: Request) {
  if (!BUTTONDOWN_API_KEY) {
    return NextResponse.json(
      { error: 'Newsletter not configured' },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json();

    // Proper email validation using RFC 5322 pattern
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags: ['portfolio'],
      }),
    });

    const data = await response.json();

    // 201 = created (success), 409 = already subscribed
    if (response.ok || response.status === 409) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: data.detail || data.message || 'Failed to subscribe' },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}