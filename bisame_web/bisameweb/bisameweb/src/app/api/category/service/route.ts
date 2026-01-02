import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET() {
  try {
    const apiAuthToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;
    const serviceCategoryApiUrl = process.env.NEXT_PUBLIC_SERVICE_CATEGORY_API_URL;

    if (!apiAuthToken || !serviceCategoryApiUrl) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    const response = await axios({
      method: 'GET',
      url: serviceCategoryApiUrl,
      headers: {
        'Authorization': `Bearer ${apiAuthToken}`,
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity,
      timeout: 50000 // 50 second timeout
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
    if (error instanceof Error) {
      console.error('Error fetching service category data:', error.message, error.stack);
    } else {
      console.error('Error fetching service category data:', error);
    }
    
    // Handle axios specific errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = axiosError.response.status;
        const errorMessage = (axiosError.response.data as { message?: string }).message || 'Error from external API';
        
        // Handle specific status codes
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
      } else if (axiosError.request) {
        // The request was made but no response was received
        return NextResponse.json(
          { error: 'No response received from server' },
          { status: 503 }
        );
      } else if (axiosError.code === 'ECONNABORTED') {
        // Request timed out
        return NextResponse.json(
          { error: 'Request timed out' },
          { status: 504 }
        );
      }
    }
    
    // Handle network errors
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code &&
      ((error as { code?: string }).code === 'ENOTFOUND' || (error as { code?: string }).code === 'ECONNREFUSED')
    ) {
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
