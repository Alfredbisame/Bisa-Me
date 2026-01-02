import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "@/app/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const regionUrl = process.env.NEXT_PUBLIC_RANKED_REGIONS_API_URL;

    const apiUrl = `${baseUrl}${regionUrl}`;

    console.log(apiUrl);
    if (!apiUrl) {
      return NextResponse.json(
        { error: "Location API URL not configured", code: "CONFIG_ERROR" },
        { status: 500 }
      );
    }

    const authToken = getAuthToken(request);
    if (!authToken?.trim()) {
      return NextResponse.json(
        { error: "Authentication token required", code: "AUTH_TOKEN_MISSING" },
        { status: 401 }
      );
    }

    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "User-Agent": "BiSameWeb/1.0",
      },
      timeout: 30000,
    });

    console.log(data);

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=300" },
    });
  } catch (error) {
    console.error("Location API error:", error);

    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (error.code === "ECONNABORTED") {
        return NextResponse.json(
          { error: "Request timeout", code: "REQUEST_TIMEOUT" },
          { status: 504 }
        );
      }

      if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
        return NextResponse.json(
          {
            error: "Location service unavailable",
            code: "SERVICE_UNAVAILABLE",
          },
          { status: 503 }
        );
      }

      if (status) {
        const errorMessages: Record<number, string> = {
          401: "Authentication failed",
          403: "Access denied",
          404: "Endpoint not found",
          429: "Rate limited",
          500: "External server error",
        };

        return NextResponse.json(
          {
            error: errorMessages[status] || "External API error",
            code: status >= 500 ? "EXTERNAL_SERVER_ERROR" : "CLIENT_ERROR",
          },
          { status: status >= 500 ? 502 : status }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { getAuthToken } from '@/app/utils/auth';

// export async function GET(request: NextRequest) {
//   const apiUrl = process.env.NEXT_PUBLIC_POSTFORM_LOCATION_API_URL;
//   if (!apiUrl) {
//     return NextResponse.json({ error: 'Location API URL not configured' }, { status: 500 });
//   }

//   // Get auth token from cookies
//   const authToken = getAuthToken(request);
//   if (!authToken) {
//     return NextResponse.json({ error: 'Authentication token not found.' }, { status: 401 });
//   }

//   try {
//     const res = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}`,
//       },
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: `External API error: ${res.statusText}` },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();

//     // Log the response for debugging
//     console.log('Location API response:', data);

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error('Location API Error:', error);
//     return NextResponse.json({ error: 'Failed to connect to external API' }, { status: 502 });
//   }
// }
