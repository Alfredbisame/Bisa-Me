import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ApiError {
  message?: string;
  error?: string;
  details?: unknown;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const sortDir = searchParams.get('sortDir') || 'asc';
    
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrl = process.env.NEXT_PUBLIC_RECENT_VIEWS_API_URL;
    
    if (!baseUrl || !apiUrl) {
      return NextResponse.json(
        { error: 'API URLs not configured' },
        { status: 500 }
      );
    }

    // Get the authorization token from the request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header is required' },
        { status: 401 }
      );
    }

    // Make API call to fetch recent views
    const response = await axios.get(
      `${baseUrl}${apiUrl}?page=${page}&pageSize=${pageSize}&sortDir=${sortDir}`,
      {
        headers: {
          'accept': 'application/json',
          'Authorization': authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('[API Route] Error fetching recent views:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = error.response?.data || {};
      return NextResponse.json(
        { 
          error: apiError.message || apiError.error || 'Failed to fetch recent views',
          details: apiError.details
        },
        { status: error.response?.status || 500 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Failed to fetch recent views' },
      { status: 500 }
    );
  }
}