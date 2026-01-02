import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

interface UnfollowApiResponse {
  code: number;
  data: null;
  message: string;
}

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_UNFOLLOW_API_URL;
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: 'Unfollow API URL not configured.' },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { success: false, message: 'Base URL not configured.' },
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

    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error('Invalid JSON in request body:', err);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body', error: String(err) },
        { status: 400 }
      );
    }

    // Log the received body for debugging
    console.log('Received unfollow request body:', body);

    // Validation: check if toUserId is provided
    if (!body || !body.toUserId) {
      console.error('Validation failed. Body:', body);
      return NextResponse.json(
        { success: false, message: "Missing required field: toUserId", body },
        { status: 400 }
      );
    }

    // Construct the full URL with normalized path
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedApi = apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`;
    const fullUrl = `${normalizedBase}${normalizedApi}`;    
    const response = await axios.post<UnfollowApiResponse>(fullUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      timeout: 10000,
    });

    // Always return a clear success boolean and message for frontend toast
    return NextResponse.json({
      success: true,
      message: response.data.message || 'Unfollowed successfully!',
      data: response.data,
    }, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('External API error:', error.response?.status, error.response?.data || error.message);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to unfollow user.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: string }).message === 'string') {
      errorMessage = (error as { message?: string }).message || '';
    }
    console.error('Server error in Unfollow route:', errorMessage);
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}