import { NextResponse } from 'next/server';
import axios from 'axios';

interface ApiError {
  message: string;
}

export async function POST(request: Request) {
  try {
    console.log('Received request at /api/auth/resend');
    
    // Get Authorization header from the request
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      console.error('Missing Authorization header');
      return NextResponse.json({
        success: false,
        message: 'Missing Authorization header',
      }, { status: 401 });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const resendPath = process.env.NEXT_PUBLIC_RESEND_API_URL;
    
    if (!baseUrl || !resendPath) {
      console.error('Missing API configuration');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: Missing API URL',
      }, { status: 500 });
    }
    
    // Construct full API URL
    const apiUrl = `${baseUrl.replace(/\/$/, '')}${resendPath}`;
    console.log('Resend API URL:', apiUrl);
    
    const headers = {
      'accept': '*/*',
      'Authorization': authHeader,
    };
    
    console.log('Request headers:', headers);
   
    const response = await axios({
      method: 'POST',
      url: apiUrl,
      headers,
      data: ''
    });
   
    console.log('External API Response:', {
      status: response.status,
      data: response.data
    });

    return NextResponse.json(response.data);

  } catch (error: unknown) {
    console.error('Resend API route error:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Axios error response:', error.response?.data);
      console.error('Axios error status:', error.response?.status);
      
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || error.response?.data?.error || 'Failed to resend verification code.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as ApiError).message === 'string') {
      errorMessage = (error as ApiError).message;
    }
    
    console.error('Non-axios error:', errorMessage);
    
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
