import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get auth token
    const authToken = getAuthToken(request);
    
    // Log for debugging
    console.log('Request headers:', Object.fromEntries(request.headers));
    console.log('Auth token found:', !!authToken);
    console.log('User ID:', userId);
    
    // Get base URL and endpoint from environment variables
    const baseURL = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const endpoint = process.env.NEXT_PUBLIC_LISTINGS_CUSTOMER_REVIEWS;

    if (!baseURL || !endpoint) {
      return NextResponse.json(
        { error: 'API configuration is missing' },
        { status: 500 }
      );
    }

    const fullURL = `${baseURL}${endpoint}?page=${page}&pageSize=${pageSize}&userId=${userId}`;
    
    // Prepare headers
    const headers: Record<string, string> = {
      'accept': '*/*',
    };
    
    // Add auth header only if token exists
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    console.log('Making request to:', fullURL);
    console.log('Headers:', headers);
    
    const response = await axios({
      method: 'GET',
      url: fullURL,
      headers,
      maxBodyLength: Infinity
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching listings reviews:', error);
    
    if (error instanceof Error && axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        return NextResponse.json(
          { 
            error: error.response.data.message || 'Error from external API',
            status: error.response.status,
            data: error.response.data
          },
          { status: error.response.status }
        );
      } else if (error.request) {
        return NextResponse.json(
          { error: 'No response received from server' },
          { status: 503 }
        );
      } else {
        return NextResponse.json(
          { error: 'Error setting up request' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}