import { NextResponse } from 'next/server';
import axios from 'axios';

interface ApiError {
  message: string;
}

interface RequestBody {
  verificationCode: string;
  authToken: string;
}

interface VerifyOtpResponse {
  code: number;
  data: {
    token: string;
    user: {
      id: string;
      email: string | null;
      phoneNumber: string;
      countryCode: string;
      countryName: string;
      countryShortName: string;
      profilePicture: string | null;
      referralCode: string;
      userReferralCode: string;
      referralType: string;
      status: string;
      role: string;
      lastName: string;
      firstName: string;
      otherNames: string;
      authenticated: boolean;
      dateOfBirth: string | null;
    };
  };
  message: string;
}

export async function POST(request: Request) {
  try {
    console.log('Received request at /api/auth/verify');
    
    // Log the raw request
    const requestText = await request.text();
    console.log('Raw request body:', requestText);
    
    // Parse the request body
    let body: RequestBody;
    try {
      body = JSON.parse(requestText);
    } catch (e) {
      console.error('Failed to parse request body as JSON:', e);
      return NextResponse.json({
        success: false,
        data: null,
        message: 'Invalid JSON in request body',
        error: 'Invalid JSON in request body',
      }, { status: 400 });
    }
    
    console.log('Parsed request body:', body);
    
    const { verificationCode, authToken } = body;
    
    // Validate required fields
    if (!verificationCode) {
      console.error('Missing verificationCode in request');
      return NextResponse.json({
        success: false,
        data: null,
        message: 'Missing required field: verificationCode',
        error: 'Missing required field: verificationCode',
      }, { status: 400 });
    }
    
    // Validate auth token
    if (!authToken) {
      console.error('Missing authToken in request');
      return NextResponse.json({
        success: false,
        data: null,
        message: 'Missing required field: authToken',
        error: 'Missing required field: authToken',
      }, { status: 400 });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const verifyOtpPath = process.env.NEXT_PUBLIC_VERIFY_OTP_URL;
    
    if (!baseUrl || !verifyOtpPath) {
      console.error('NEXT_PUBLIC_AUTH_API_BASE_URL or NEXT_PUBLIC_VERIFY_OTP_URL is not defined');
      return NextResponse.json({
        success: false,
        data: null,
        message: 'Server configuration error: Missing API URL',
        error: 'Server configuration error: Missing API URL',
      }, { status: 500 });
    }
    
    // Combine base URL and verify OTP path
    const apiUrl = `${baseUrl.replace(/\/$/, '')}${verifyOtpPath}`;
    
    console.log('Verification API URL:', apiUrl);
    
    const requestData = { 
      verificationCode
    };
    
    console.log('Sending request to external API:', requestData);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      'Accept': '*/*'
    };
    
    console.log('Request headers (token hidden):', { ...headers, Authorization: 'Bearer [HIDDEN]' });
   
    const response = await axios<VerifyOtpResponse>({
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

    return NextResponse.json(response.data);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: error.response?.data?.message || 'Failed to verify account.',
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
      { success: false, data: null, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
