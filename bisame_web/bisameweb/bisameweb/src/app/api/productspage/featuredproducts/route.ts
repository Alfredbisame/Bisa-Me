import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Removed apiAuthToken
    const apiUrl = process.env.NEXT_PUBLIC_ALLFEATURED_API_URL;
    
    // Removed check for apiAuthToken

    const response = await axios({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity,
      timeout: 10000 // 10 second timeout
    });

    // Validate response data
    if (!response.data) {
      return NextResponse.json(
        { error: 'Invalid response data received' },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching featured products data:', error);
    // Handle axios specific errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = (error.response.data as { message?: string })?.message || 'Error from external API';
        if (statusCode === 401 || statusCode === 403) {
          return NextResponse.json(
            { error: 'Authentication error with external API' },
            { status: statusCode }
          );
        }
        return NextResponse.json(
          { error: errorMessage },
          { status: statusCode }
        );
      } else if (error.request) {
        return NextResponse.json(
          { error: 'No response received from server' },
          { status: 503 }
        );
      } else if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Request timed out' },
          { status: 504 }
        );
      }
    }
    // Handle network errors
    if (typeof error === 'object' && error !== null && 'code' in error && ((error as { code?: string }).code === 'ENOTFOUND' || (error as { code?: string }).code === 'ECONNREFUSED')) {
      return NextResponse.json(
        { error: 'Unable to connect to external API' },
        { status: 503 }
      );
    }
    // Handle any other errors
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}