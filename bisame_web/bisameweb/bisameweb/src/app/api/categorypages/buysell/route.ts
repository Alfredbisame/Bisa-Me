import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    // Get URL parameters
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const subcategory = url.searchParams.get('subcategory');
    const location = url.searchParams.get('location') || 'Ghana'; // Default to Ghana
    
    // Validate that category is provided
    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    // Get environment variables
    const apiAuthToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;
    const buySellCategoryApiUrl = process.env.NEXT_PUBLIC_BUYSELL_CATEGORY_API_URL;

    if (!apiAuthToken || !buySellCategoryApiUrl) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Clean up the subcategory parameter - remove any encoding issues
    const cleanSubcategory = subcategory ? decodeURIComponent(subcategory).replace(/\+/g, ' ') : null;
    
    // Try different URL patterns to see which one works
    let apiUrl;
    
    if (cleanSubcategory && cleanSubcategory.trim()) {
      // Try pattern 1: with subcategory and /H
      apiUrl = `${buySellCategoryApiUrl}/${cleanSubcategory}/${location}/H`;
    } else {
      // Try pattern 1: with category and /H
      apiUrl = `${buySellCategoryApiUrl}/${category}/${location}/H`;
    }

    console.log('Making API request to:', apiUrl);
    console.log('Environment variable NEXT_PUBLIC_BUYSELL_CATEGORY_API_URL:', buySellCategoryApiUrl);
    console.log('Parameters:', { 
      category, 
      subcategory, 
      cleanSubcategory,
      location 
    });

    const response = await axios({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${apiAuthToken}`,
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity,
      timeout: 30000 // 30 second timeout
    });

    // Validate response data
    if (!response.data) {
      return NextResponse.json(
        { error: 'Invalid response data received' },
        { status: 500 }
      );
    }

    console.log('Response data length:', Array.isArray(response.data) ? response.data.length : 'Not an array');
    console.log('Response data type:', typeof response.data);
    
    // If response is not an array, return empty array
    if (!Array.isArray(response.data)) {
      console.log('Response is not an array, returning empty array');
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching category listings data:', error);
    
    // Handle axios specific errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = axiosError.response.status;
        const errorMessage = (axiosError.response.data as { message?: string }).message || 'Error from external API';
        
        console.error('Axios error response:', axiosError.response.data);
        console.error('Status code:', statusCode);
        
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
    if (typeof error === 'object' && error !== null && 'code' in error && typeof (error as { code: string }).code === 'string') {
      const errorCode = (error as { code: string }).code;
      if (errorCode === 'ENOTFOUND' || errorCode === 'ECONNREFUSED') {
        return NextResponse.json(
          { error: 'Unable to connect to external API' },
          { status: 503 }
        );
      }
    }
    
    // Handle any other errors
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
