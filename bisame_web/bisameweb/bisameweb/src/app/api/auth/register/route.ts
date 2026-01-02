import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface RegisterRequestBody {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  refecode: string;
  countryname: string;
  countryiso2: string;
  countrycode: string;
  choose: string;
  type: string;
}

// Updated interface to match the external API response
interface ExternalApiResponse {
  code: number;
  data: {
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

// Axios instance for external API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequestBody = await request.json();
    
    // Validate required fields
    if (!body.first || !body.last || !body.phone || !body.password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Transform the request body to match the external API format
    const externalPayload = {
      firstName: body.first,
      lastName: body.last,
      otherNames: "string",
      phoneNumber: body.phone.replace('+', ''), // Remove '+' if present
      countryShortName: body.countryiso2 || process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "GH",
      password: body.password,
      referralType: null,
      countryCode: body.countrycode.replace('+', ''), // Remove '+' if present
      countryName: body.countryname,
      referralCode: body.refecode || null,
      email: body.email || null
    };

    // Make external API request
    const response = await apiClient.post<ExternalApiResponse>(
      process.env.NEXT_PUBLIC_SIGNUP_API_URL || "/api/authentication/signup", 
      externalPayload
    );
    
    // Log the response for debugging
    console.log('External API response:', response.data);
    
    // Validate response structure
    if (!response.data) {
      return NextResponse.json(
        { message: "Invalid response from external API" },
        { status: 500 }
      );
    }
    
    // Return the response data to the frontend
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Registration API error:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      return NextResponse.json(
        { message: errorMessage },
        { status: error.response?.status || 500 }
      );
    }
    
    // Handle network or other errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}