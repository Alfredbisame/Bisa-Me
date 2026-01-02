import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { getAuthToken } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_POSTFORM_FRAGRANCE_API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Fragrance API URL not configured', code: 'CONFIG_ERROR' }, 
        { status: 500 }
      );
    }

    const authToken = getAuthToken(request);
    if (!authToken?.trim()) {
      return NextResponse.json(
        { error: 'Authentication token required', code: 'AUTH_TOKEN_MISSING' }, 
        { status: 401 }
      );
    }

    const { data } = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'User-Agent': 'BiSameWeb/1.0',
      },
      timeout: 30000,
    });

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=300' }
    });

  } catch (error) {
    console.error('Fragrance API error:', error);

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Request timeout', code: 'REQUEST_TIMEOUT' }, 
          { status: 504 }
        );
      }

      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { error: 'Fragrance service unavailable', code: 'SERVICE_UNAVAILABLE' }, 
          { status: 503 }
        );
      }

      if (status) {
        const errorMessages: Record<number, string> = {
          401: 'Authentication failed',
          403: 'Access denied',
          404: 'Endpoint not found',
          429: 'Rate limited',
          500: 'External server error',
        };

        return NextResponse.json(
          { 
            error: errorMessages[status] || 'External API error', 
            code: status >= 500 ? 'EXTERNAL_SERVER_ERROR' : 'CLIENT_ERROR' 
          }, 
          { status: status >= 500 ? 502 : status }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' }, 
      { status: 500 }
    );
  }
}