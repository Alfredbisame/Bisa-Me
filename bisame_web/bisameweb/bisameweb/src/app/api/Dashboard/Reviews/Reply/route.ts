import { NextResponse } from "next/server";
import axios from "axios";

interface ApiError {
  message: string;
}
import { getAuthToken } from "@/app/utils/auth";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const replyUrl = process.env.NEXT_PUBLIC_REVIEWS_REPLY_API_URL?.replace(
      "{id}",
      id as string
    );

    const apiUrl = `${baseUrl}${replyUrl}`;
    console.log(apiUrl);

    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: "Reviews Reply API URL not configured." },
        { status: 500 }
      );
    }

    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.message || "Failed to reply to review.",
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = "Unknown error";
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as ApiError).message === "string"
    ) {
      errorMessage = (error as ApiError).message;
    }
    return NextResponse.json(
      { success: false, message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}
