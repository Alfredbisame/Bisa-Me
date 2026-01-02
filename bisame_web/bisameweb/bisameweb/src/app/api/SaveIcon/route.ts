import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/app/utils/auth';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_SAVE_ICON_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  }

  // Get auth token from cookies
  const authToken = getAuthToken(request);
  if (!authToken) {
    return NextResponse.json({ error: 'Authentication token not found.' }, { status: 401 });
  }

  let body: { path: string; id: string };
  try {
    body = await request.json();
    // Log the request body for debugging
    console.log('SaveIcon API request body:', body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Expect body: { path, id }
  const { path, id } = body;
  if (!path || !id) {
    return NextResponse.json({ error: 'Missing path or id in request body' }, { status: 400 });
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ path, id }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Failed to connect to external API' }, { status: 502 });
  }
}
