import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SEARCH_SUGGESTIONS_API_URL = process.env.NEXT_PUBLIC_SEARCH_SUGGESTIONS_API_URL;
const API_AUTH_TOKEN = process.env.NEXT_PUBLIC_API_AUTH_TOKEN;

interface SuggestionItem {
  name: string;
  [key: string]: unknown;
}

interface AxiosError {
  code?: string;
  response?: {
    status: number;
    data: {
      message?: string;
    };
  };
  request?: unknown;
  message?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Query parameter is required' },
        { status: 400 }
      );
    }
    
    if (!SEARCH_SUGGESTIONS_API_URL || !API_AUTH_TOKEN) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { success: false, message: 'Search service is not configured' },
        { status: 500 }
      );
    }

    const response = await axios.get(SEARCH_SUGGESTIONS_API_URL, {
      params: { q: query.trim() },
      headers: {
        'Authorization': `Bearer ${API_AUTH_TOKEN}`,
        'User-Agent': 'Bisame-Web-Client/1.0',
      },
      timeout: 8000,
    });
    
    // Filter suggestions to only those that start with the query (case-insensitive)
    const trimmedQuery = query.trim().toLowerCase();
    const filteredSuggestions = response.data.filter((item: SuggestionItem) =>
      typeof item.name === 'string' && item.name.trim().toLowerCase().startsWith(trimmedQuery)
    ).map((item: SuggestionItem) => ({
      ...item,
      name: item.name.trim(),
    }));

    return NextResponse.json({
      success: true,
      suggestions: filteredSuggestions,
      query: query.trim(),
      count: filteredSuggestions.length,
    });
  
  } catch (error: unknown) {
    let message = 'Internal server error';
    let status = 500;
    if (typeof error === 'object' && error !== null) {
      // Axios error
      if ('code' in error && typeof (error as AxiosError).code === 'string' && (error as AxiosError).code === 'ECONNABORTED') {
        message = 'Request timeout - please try again';
        status = 408;
      } else if ('response' in error && (error as AxiosError).response) {
        const { status: respStatus, data } = (error as AxiosError).response!;
        message = data?.message || 'Failed to fetch suggestions';
        status = respStatus >= 500 ? 503 : respStatus;
      } else if ('request' in error && (error as AxiosError).request) {
        message = 'Unable to reach suggestions service';
        status = 503;
      } else if ('message' in error && typeof (error as AxiosError).message === 'string') {
        message = (error as AxiosError).message || message;
      }
    }
    console.error('Search suggestions error:', message);
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}