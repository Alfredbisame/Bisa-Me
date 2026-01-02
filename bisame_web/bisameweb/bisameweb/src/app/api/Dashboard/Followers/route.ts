import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

interface ApiError {
  message: string;
}

interface FollowersApiResponse {
  code: number;
  data: {
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
    results: Array<{
      id: string;
      userInfo: {
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
    }>;
  };
  message: string;
}

export async function GET(request: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MY_FOLLOWERS_API_URL;
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: 'Followers API URL not configured.' },
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

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    const fullUrl = `${baseUrl}${apiUrl}?page=${page}&pageSize=${pageSize}`;

    
    console.log('Making request to:', fullUrl);

    const response = await axios.get<FollowersApiResponse>(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'accept': '*/*',
      },
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    }, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('External API error:', error.response?.status, error.response?.data || error.message);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch Followers data.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as ApiError).message === 'string') {
      errorMessage = (error as ApiError).message;
    }
    console.error('Server error in Followers route:', errorMessage);
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}