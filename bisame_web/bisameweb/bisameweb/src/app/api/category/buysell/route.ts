import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const listingsBaseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const categoriesApiUrl = process.env.NEXT_PUBLIC_CATEGORIES_API_URL;

    if (!listingsBaseUrl || !categoriesApiUrl) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    //check for valid search parameter
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group");

    if (!group) {
      return NextResponse.json({ error: "Missing parameter" }, { status: 200 });
    }

    const fullUrl = `${listingsBaseUrl}${categoriesApiUrl}?page=1&pageSize=10&group=${encodeURIComponent(
      group
    )}`;
    console.log(fullUrl);
    console.log(fullUrl);
    console.log(fullUrl);

    const response = await axios({
      method: "GET",
      url: fullUrl,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
      timeout: 10000,
    });

    // Validate response data
    if (!response.data || response.data.code !== 200) {
      return NextResponse.json(
        { error: "Invalid response data received" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.message ||
            "Failed to fetch buysell category data.",
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}
