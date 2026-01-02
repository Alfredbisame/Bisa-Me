import { NextResponse } from "next/server";
import axios from "axios";
import { NextRequest } from "next/server";
import { getAuthToken } from "@/app/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Get the base URL and API endpoint from environment variables
    const listingsBaseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const latestListingsApiUrl = process.env.NEXT_PUBLIC_LISTINGS_API_URL;

    // Check if environment variables are set
    if (!listingsBaseUrl || !latestListingsApiUrl) {
      return NextResponse.json(
        { error: "API configuration is missing" },
        { status: 500 }
      );
    }

    // Get token if it exists
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 }
      );
    }

    // Concatenate urls
    const apiUrl = `${listingsBaseUrl}${latestListingsApiUrl}`;

    console.log(`Submitting latest listings data from: ${apiUrl}`);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      return NextResponse.json(
        { error: "Error occurred posting data" },
        { status: 400 }
      );
    }

    console.log(
      `Latest listings API responded with status: ${response.status}`
    );

    console.log(response.data);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    console.error("Error fetching latest listings data:", error);

    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            `API responded with status ${
              error.response.status
            }: ${JSON.stringify(error.response.data)}`
          );
          return NextResponse.json(
            { error: error.response.data.message || "Error from external API" },
            { status: error.response.status }
          );
        } else if (error.request) {
          console.error("No response received from server");
          return NextResponse.json(
            { error: "No response received from server" },
            { status: 503 }
          );
        } else {
          console.error(`Request setup error: ${error.message}`);
          return NextResponse.json(
            { error: "Error setting up request" },
            { status: 500 }
          );
        }
      }
    }

    // Fallback error response
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
