import { NextResponse } from 'next/server';
import axios from 'axios';

interface ApiError {
  message: string;
  response?: {
    data?: unknown;
    status?: number;
  };
}

interface RequestBody {
  phoneNumber: string;
  countryShortName: string;
}

interface ForgotPasswordResponse {
  code: number;
  data: {
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

export async function POST(request: Request) {
  try {
    console.log('Received request at /api/auth/forget');
    
    // Parse the request body
    const requestText = await request.text();
    console.log('Raw request body:', requestText);
    
    let body: RequestBody;
    try {
      body = JSON.parse(requestText);
    } catch (e) {
      console.error('Failed to parse request body as JSON:', e);
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, { status: 400 });
    }
    
    console.log('Parsed request body:', body);
    
    const { phoneNumber, countryShortName } = body;
    
    // Validate required fields
    if (!phoneNumber) {
      console.error('Missing phoneNumber in request');
      return NextResponse.json({
        success: false,
        message: 'Missing required field: phoneNumber',
      }, { status: 400 });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const forgotPasswordPath = process.env.NEXT_PUBLIC_FORGOT_PASSWORD_API_URL;
    
    if (!baseUrl || !forgotPasswordPath) {
      console.error('NEXT_PUBLIC_AUTH_API_BASE_URL or NEXT_PUBLIC_FORGOT_PASSWORD_API_URL is not defined');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: Missing API URL',
      }, { status: 500 });
    }
    
    // Combine base URL and forgot password path
    const apiUrl = `${baseUrl.replace(/\/$/, '')}${forgotPasswordPath}`;
    
    console.log('Forgot Password API URL:', apiUrl);
    
    // Format the phone number to ensure it's in the expected format
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 0, replace with country code (233 for Ghana)
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '233' + formattedPhone.substring(1);
    }
    // If it doesn't start with country code, add it
    else if (!formattedPhone.startsWith('233')) {
      formattedPhone = '233' + formattedPhone;
    }
    
    const requestData = { 
      phoneNumber: formattedPhone,
      countryShortName: countryShortName || "GH"
    };
    
    console.log('Sending request to external API:', requestData);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };
    
    console.log('Request headers:', headers);
   
    try {
      const response = await axios<ForgotPasswordResponse>({
        method: 'POST',
        url: apiUrl,
        headers,
        data: requestData,
        timeout: 10000 // 10 second timeout
      });
      
      console.log('External API Response:', {
        status: response.status,
        data: response.data
      });

      // Return the response from the external API
      return NextResponse.json(response.data);
    } catch (apiError: unknown) {
      console.error('External API Error:', apiError);
      
      if (axios.isAxiosError(apiError)) {
        return NextResponse.json(
          {
            success: false,
            message: apiError.response?.data?.message || 'Failed to process forgot password request.',
            error: apiError.response?.data || apiError.message,
          },
          { status: apiError.response?.status || 500 }
        );
      }
      
      if (typeof apiError === 'object' && apiError !== null && 'message' in apiError && typeof (apiError as ApiError).message === 'string') {
        return NextResponse.json(
          { success: false, message: 'Server error', error: (apiError as ApiError).message },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: false,
        message: 'Error connecting to authentication service',
        error: (apiError as ApiError).message
      }, { status: 503 });
    }

  } catch (error: unknown) {
    console.error('API Error:', error);
    console.error('Error details:', {
      message: typeof error === 'object' && error !== null && 'message' in error ? String((error as ApiError).message) : 'Unknown error',
      response: typeof error === 'object' && error !== null && 'response' in error ? (error as ApiError).response?.data : undefined,
      status: typeof error === 'object' && error !== null && 'response' in error ? (error as ApiError).response?.status : undefined
    });
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to process forgot password request.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as ApiError).message === 'string') {
      errorMessage = (error as ApiError).message;
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
