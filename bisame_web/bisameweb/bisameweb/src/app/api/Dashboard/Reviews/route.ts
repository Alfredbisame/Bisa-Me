import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: Request) {
  try {
    // Get the base URL and reviews endpoint from environment variables
    const listingsBaseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const reviewsApiUrl = process.env.NEXT_PUBLIC_REVIEWS_API_URL;
    
    if (!listingsBaseUrl || !reviewsApiUrl) {
      return NextResponse.json(
        { success: false, message: 'Listings base URL or reviews API URL not configured.' },
        { status: 500 }
      );
    }

    // Construct the full API URL
    const fullApiUrl = `${listingsBaseUrl}${reviewsApiUrl}`;
    
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated.' },
        { status: 401 }
      );
    }

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '5';
    const listingId = searchParams.get('listingId');

    // Build query parameters
    const params: Record<string, string> = {
      page,
      pageSize
    };

    // Add listingId filter if provided
    if (listingId) {
      params.listingId = listingId;
    }

    const response = await axios.get(fullApiUrl, {
      params,
      headers: {
        'accept': 'application/json',
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
          message: error.response?.data?.message || 'Failed to fetch reviews.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: string }).message === 'string') {
      errorMessage = (error as { message?: string }).message || '';
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}