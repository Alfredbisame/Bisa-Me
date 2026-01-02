import { NextResponse } from 'next/server';
import axios from 'axios';

interface ApiCity {
  city: string;
  totalListings: number;
}

interface RegionData {
  totalListings: number;
  cities: ApiCity[];
  region: string;
}

interface ApiResponse {
  code: number;
  data: RegionData[];
  message: string;
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const apiUrl = `${baseUrl}${process.env.NEXT_PUBLIC_REGIONS_API_URL}`;
    
    const response = await axios.get<ApiResponse>(apiUrl, {
      headers: {
        'accept': '*/*',
      },
      timeout: 10000,
    });
    
    const transformedData = response.data.data.map(region => ({
      region: region.region,
      ads: region.totalListings,
      cities: region.cities.map(city => ({
        name: city.city,
        ads: city.totalListings
      }))
    }));

    return NextResponse.json(transformedData, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch locations.',
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