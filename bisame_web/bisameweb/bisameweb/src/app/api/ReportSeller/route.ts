import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/app/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookies
    const authToken = getAuthToken(request);
    if (!authToken) {
      return NextResponse.json({ error: 'Authentication token not found.' }, { status: 401 });
    }

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
    }

    // Get the external API URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_MAKE_COMPLAINS_API_URL;
    
    if (!baseUrl || !apiUrlEndpoint) {
      return NextResponse.json({ error: 'API URLs are not configured properly.' }, { status: 500 });
    }

    const fullApiUrl = `${baseUrl}${apiUrlEndpoint}`;

    // Make the POST request to the external API
    const apiResponse = await fetch(fullApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'accept': '*/*'
      },
      body: JSON.stringify({
        listingId: body.listingId,
        message: body.message
      }),
    });

    // Handle non-2xx responses from the external API
    if (!apiResponse.ok) {
      let errorMsg = 'Failed to report seller.';
      try {
        const errorData = await apiResponse.json();
        errorMsg = errorData.error || errorData.message || errorMsg;
      } catch {
        // Ignore JSON parse errors
      }
      return NextResponse.json({ error: errorMsg }, { status: apiResponse.status });
    }

    // Parse and return the successful response
    const data = await apiResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Catch-all for unexpected errors
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}