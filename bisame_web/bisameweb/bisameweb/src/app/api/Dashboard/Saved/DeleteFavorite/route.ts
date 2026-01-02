import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

interface ApiError {
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const listingsBaseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const favoriteApiUrl = process.env.NEXT_PUBLIC_FAVORITE_API_URL;
    
    if (!listingsBaseUrl || !favoriteApiUrl) {
      return NextResponse.json(
        { success: false, message: 'Listings base URL or favorite API URL not configured.' },
        { status: 500 }
      );
    }

    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated.' },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    
    // Validate that favoriteId is provided
    if (!body.favoriteId) {
      return NextResponse.json(
        { success: false, message: 'favoriteId is required.' },
        { status: 400 }
      );
    }

    // Construct the full API URL for deleting a favorite
    // This would typically be a DELETE request to /v1/api/favorites/{favoriteId}
    const fullApiUrl = `${listingsBaseUrl}${favoriteApiUrl}/${body.favoriteId}`;

    const response = await axios.delete(fullApiUrl, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to delete saved item.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as ApiError).message === 'string') {
      errorMessage = (error as ApiError).message;
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}