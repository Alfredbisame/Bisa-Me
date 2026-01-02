import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    console.log('Received request at /api/auth/logout');
    
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const logoutPath = process.env.NEXT_PUBLIC_LOGOUT_API_URL;
    
    if (!baseUrl || !logoutPath) {
      console.error('NEXT_PUBLIC_AUTH_API_BASE_URL or NEXT_PUBLIC_LOGOUT_API_URL is not defined');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: Missing API URL',
      }, { status: 500 });
    }
    
    // Combine base URL and logout path
    const apiUrl = `${baseUrl.replace(/\/$/, '')}${logoutPath}`;
    
    console.log('Logout API URL:', apiUrl);
    
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return NextResponse.json({
        success: false,
        message: 'Missing or invalid authorization token',
      }, { status: 401 });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      // Make the request to the external API
      const response = await axios({
        method: 'POST',
        url: apiUrl,
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
        data: {}, // Empty body as specified in the curl request
        timeout: 10000 // 10 second timeout
      });
      
      console.log('External API Response:', {
        status: response.status,
        data: response.data
      });
      
      // Clear the auth-token cookie
      const headers = {
        'Set-Cookie': 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure'
      };
      
      // Return the response as-is from the external API
      return NextResponse.json(response.data, { headers });
    } catch (apiError: unknown) {
      console.error('External API Error:', apiError);
      
      // Log the complete error response for debugging
      if (axios.isAxiosError(apiError)) {
        console.error('Error Response Data:', apiError.response?.data);
        console.error('Error Response Status:', apiError.response?.status);
        console.error('Error Response Headers:', apiError.response?.headers);
      }
      
      // Even if the external API fails, we still want to clear the local auth state
      // Clear the auth-token cookie
      const headers = {
        'Set-Cookie': 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure'
      };
      
      if (axios.isAxiosError(apiError) && (apiError.code === 'ECONNREFUSED' || apiError.code === 'ETIMEDOUT' || apiError.code === 'ENOTFOUND')) {
        return NextResponse.json({
          success: false,
          message: 'Unable to connect to the authentication service. Please try again later.',
          error: apiError.message
        }, { status: 503, headers });
      }
      
      if (axios.isAxiosError(apiError) && apiError.response) {
        // If the API returns a specific error message, pass it through
        const errorMessage = apiError.response.data?.message ||
                            apiError.response.data?.error ||
                            'Logout failed.';
                            
        // Return the error response but still clear the cookie
        return NextResponse.json({
          code: apiError.response.status,
          success: false,
          message: errorMessage,
          error: apiError.response.data
        }, { status: apiError.response.status || 400, headers });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Error connecting to authentication service',
        error: apiError instanceof Error ? apiError.message : 'Unknown error'
      }, { status: 503, headers });
    }

  } catch (error: unknown) {
    console.error('API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
      status: axios.isAxiosError(error) ? error.response?.status : undefined
    });
    
    // Even if there's a server error, clear the cookie
    const headers = {
      'Set-Cookie': 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure'
    };
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to logout.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500, headers }
      );
    }
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500, headers }
    );
  }
}