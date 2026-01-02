import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

interface ProfileResponse {
  code: number;
  data: {
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
  message: string;
}

// Axios instance for external API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  headers: {
    "accept": "*/*",
  },
});

export async function GET(request: NextRequest) {
  try {
    // Extract the Authorization token using the same method as other routes
    const token = getAuthToken(request);
    
    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Make external API request
    const response = await apiClient.get<ProfileResponse>(
      process.env.NEXT_PUBLIC_PROFILE_API_URL || "/api/authentication/profile",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    
    // Log the response for debugging
    console.log('Profile API response:', response.data);
    
    // Validate response structure
    if (!response.data) {
      return NextResponse.json(
        { message: "Invalid response from external API" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Profile API error:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Failed to fetch profile";
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