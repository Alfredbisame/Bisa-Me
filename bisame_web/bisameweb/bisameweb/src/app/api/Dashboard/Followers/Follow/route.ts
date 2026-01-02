import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

interface ApiError {
  message: string;
}

interface FollowApiResponse {
  code: number;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string | null;
    updatedBy: string | null;
    createdBy: string | null;
    fromUserId: string;
    toUserId: string;
    toUserSnapshot: {
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
      phoneNumber: string;
      countryCode: string;
      countryName: string;
      countryShortName: string;
      otherNames: string | null;
    };
    fromUserSnapshot: {
      firstName: string;
      lastName: string;
      profilePicture: string | null;
      email: string | null;
      phoneNumber: string;
      countryCode: string;
      countryName: string;
      countryShortName: string;
      otherNames: string;
    };
    _id: string;
    __v: number;
  };
  message: string;
}

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FOLLOW_API_URL;
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: 'Follow API URL not configured.' },
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
    console.log('Received follow request body:', body);

    // Validation: check if toUserId is provided
    if (!body || !body.toUserId) {
      console.error('Validation failed. Body:', body);
      return NextResponse.json(
        { success: false, message: "Missing required field: toUserId", body },
        { status: 400 }
      );
    }

    // Construct the full URL
    const fullUrl = `${baseUrl}${apiUrl}`;
    
    const response = await axios.post<FollowApiResponse>(fullUrl, body, {
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
      message: response.data.message || 'Followed successfully!',
      data: response.data,
    }, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('External API error:', error.response?.status, error.response?.data || error.message);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to follow user.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as ApiError).message === 'string') {
      errorMessage = (error as ApiError).message;
    }
    console.error('Server error in Follow route:', errorMessage);
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}