import { NextResponse } from 'next/server';

// Define types for the response data
interface PackageItem {
  name: string;
  fees: string;
}

interface SocialMediaItem {
  name: string;
}

interface TradeAssuranceResponse {
  package: PackageItem[];
  socialmedia: SocialMediaItem[];
}

// GET handler for the trade assurance endpoint
export async function GET() {
  try {
    // Get the API URL and auth token from environment variables
    const apiUrl = process.env.NEXT_PUBLIC_TRADEASSURANCE_URL;
    const authToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Trade assurance API URL not configured' },
        { status: 500 }
      );
    }

    if (!authToken) {
      return NextResponse.json(
        { error: 'API authentication token not configured' },
        { status: 500 }
      );
    }

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      // Add timeout and other fetch options
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    // Check if the response is successful
    if (!response.ok) {
      console.error(`Trade assurance API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { 
          error: 'Failed to fetch trade assurance data',
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }

    // Parse the response data
    const data: TradeAssuranceResponse = await response.json();

    // Validate the response structure
    if (!data.package || !data.socialmedia) {
      console.error('Invalid response structure from trade assurance API');
      return NextResponse.json(
        { error: 'Invalid response structure from trade assurance API' },
        { status: 500 }
      );
    }

    // Return the successful response with proper headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Trade assurance API route error:', error);

    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error: Unable to connect to trade assurance service' },
        { status: 503 }
      );
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout: Trade assurance service took too long to respond' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}