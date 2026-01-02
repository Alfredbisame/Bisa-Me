import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get userid from query parameters (since we can't access localStorage in API routes)
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('userid');

    if (!userid) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get the API URL from environment variables and replace the placeholder
    const apiUrlTemplate = process.env.NEXT_PUBLIC_INVITE_API_URL;
    
    if (!apiUrlTemplate) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    const apiUrl = apiUrlTemplate.replace('{userid}', userid);

    // Get the authorization token from environment variables
    const authToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authorization token not configured' },
        { status: 500 }
      );
    }

    const config = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Invite API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch invite data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
