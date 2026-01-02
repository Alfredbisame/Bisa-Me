import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: Request) {
  try {
    // Use the correct environment variables
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrlPath = process.env.NEXT_PUBLIC_PROFILE_LISTINGS_API_URL;

    
    if (!baseUrl || !apiUrlPath) {
      return NextResponse.json(
        { success: false, message: 'API URLs not configured properly.' },
        { status: 500 }
      );
    }
    
    // Parse query parameters
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const pageSize = url.searchParams.get('pageSize') || '12';
    const status = url.searchParams.get('status') || '';
    const postId = url.searchParams.get('postId') || '';
    
    // Construct the full API URL with query parameters
    const apiUrl = new URL(`${baseUrl}${apiUrlPath}`);
    apiUrl.searchParams.set('page', page);
    apiUrl.searchParams.set('pageSize', pageSize);
    
  
    // Add status filter if provided, using the exact status value
    if (status) {
      apiUrl.searchParams.set('status', status);
    }
    
    // Add postId filter if provided
    if (postId) {
      apiUrl.searchParams.set('postId', postId);
    }

    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const response = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*'
      },
      timeout: 10000,
    });

    // Return the response as-is since it's already in the correct format
   
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch MyPost data.',
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

export async function POST(request: Request) {
  try {
    // Use the main API endpoint for status changes
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrlPath = process.env.NEXT_PUBLIC_PROFILE_LISTINGS_API_URL;
    
    if (!baseUrl || !apiUrlPath) {
      return NextResponse.json(
        { success: false, message: 'API URLs not configured properly.' },
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

    const body = await request.json();

    // Construct the full API URL
    const apiUrl = `${baseUrl}${apiUrlPath}`;

    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to update post status.',
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

export async function PUT(request: Request) {
  try {
    // Use the main API endpoint for post updates
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrlPath = process.env.NEXT_PUBLIC_PROFILE_LISTINGS_API_URL;
    
    if (!baseUrl || !apiUrlPath) {
      return NextResponse.json(
        { success: false, message: 'API URLs not configured properly.' },
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
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body', error: String(err) },
        { status: 400 }
      );
    }

    // Construct the full API URL
    const apiUrl = `${baseUrl}${apiUrlPath}`;

    try {
      const response = await axios.put(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      return NextResponse.json(response.data, { status: 200 });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return NextResponse.json(
          {
            success: false,
            message: error.response?.data?.message || 'Failed to update post.',
            error: error.response?.data || error.message,
            status: error.response?.status,
          },
          { status: error.response?.status || 500 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'Unknown error during post update', error: String(error) },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
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