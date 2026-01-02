import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SELLER_INFO_API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: 'Seller Info API URL not configured.' },
        { status: 500 }
      );
    }

    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch seller info.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: string }).message === 'string') {
      errorMessage = (error as { message?: string }).message || '';
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}