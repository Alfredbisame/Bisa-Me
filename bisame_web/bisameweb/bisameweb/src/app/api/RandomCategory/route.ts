import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_RANDOM_CATEGORY_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  }

  // Get auth token from cookies
  const authToken = getAuthToken(request);
  if (!authToken) {
    return NextResponse.json({ error: 'Authentication token not found.' }, { status: 401 });
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    // Check for network errors or non-OK status
    if (!res.ok) {
      let errorMsg = `External API responded with status ${res.status}`;
      try {
        const errorBody = await res.json();
        errorMsg += errorBody && errorBody.error ? `: ${errorBody.error}` : '';
      } catch (error) {
        // Log the error for debugging but don't expose it
        console.error('Error parsing JSON response:', error);
        // If response is not JSON, try to get text
        try {
          const text = await res.text();
          errorMsg += text ? `: ${text}` : '';
        } catch (error) {
          // Log the error for debugging but don't expose it
          console.error('Error parsing response text:', error);
          // Ignore, just use status
        }
      }
      return NextResponse.json({ error: errorMsg }, { status: res.status });
    }

    // Try to parse JSON response
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      return NextResponse.json({ error: 'External API did not return valid JSON.' }, { status: 502 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    // Network or unexpected error
    console.error('Network error:', error);
    return NextResponse.json({ error: (error as { message?: string })?.message || 'Failed to connect to external API' }, { status: 502 });
  }
}