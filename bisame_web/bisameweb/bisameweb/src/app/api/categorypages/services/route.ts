import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    
    // Support both old and new parameter names for backward compatibility
    const category = searchParams.get('category') || searchParams.get('name') || 'Engine';
    const location = searchParams.get('location') || 'Ghana';
    // const subcategory = searchParams.get('subcategory') || searchParams.get('cat') || 'subcategory';
    
    // Get environment variables
    const apiAuthToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;
    const serviceCategoryApiUrl = process.env.NEXT_PUBLIC_SERVICES_CATEGORYPAGE_API_URL;
    
    // Validate environment variables
    if (!apiAuthToken || !serviceCategoryApiUrl) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Construct the API URL based on the sample format:
    // https://webapi.bisame.com/v2/category/categorylist/servicecategory/Engine/Ghana/subcategory
    const apiUrl = `${serviceCategoryApiUrl}/${category}/${location}/subcategory`;
    
    console.log('Making API request to:', apiUrl);
    // console.log('Environment variable NEXT_PUBLIC_SERVICES_CATEGORYPAGE_API_URL:', serviceCategoryApiUrl);
    
    // Make the API request using axios
    const response = await axios({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${apiAuthToken}`,
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity,
      timeout: 50000  // 50 second timeout
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
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch services data.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as Error).message === 'string') {
      errorMessage = (error as Error).message;
    }
    console.error('Server error:', errorMessage);
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}

// Optional: A configuration object to set the revalidation time
export const dynamic = 'force-dynamic'; // Disable static optimization
