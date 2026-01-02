import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  try {
    // Parse JSON body
    const body = await request.json();

    if (!body || !body.accessToken) {
      console.error("Missing accessToken in request body");
      return NextResponse.json(
        {
          success: false,
          error: "Missing accessToken parameter",
        },
        { status: 400 }
      );
    }

    console.log("Received accessToken for Apple Auth");

    const data = {
      accessToken: body.accessToken,
      fcmToken: body.fcmToken || null,
      referralCode: body.referralCode || null,
    };

    // Configure apiUrl
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const authUrl = process.env.NEXT_PUBLIC_APPLE_LOGIN_API_URL;

    // Run checks for missing url
    if (!baseUrl || !authUrl) {
      console.error("Missing environment variables");
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Concatenate urls
    const apiUrl = `${baseUrl}${authUrl}`;

    console.log("Calling backend API for Apple Auth...");

    // Make request to backend with proper headers
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000, // 30 second timeout
    });

    console.log("Backend API response received");

    if (!response.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Empty response from authentication service",
        },
        { status: 500 }
      );
    }

    // Check if token is present in the data
    const token = response.data?.data?.token;

    if (!token) {
      console.error("No token in response");
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed - no token received",
        },
        { status: 401 }
      );
    }

    // Get origin from request
    const origin = request.headers.get("origin");
    const allowedOrigin =
      origin ||
      (process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_APP_URL
        : "http://localhost:3000");

    // Create response with proper CORS headers
    const jsonResponse = NextResponse.json(
      {
        success: true,
        data: response.data.data,
        message: "Authentication successful",
      },
      { status: 200 }
    );

    // Set secure cookie with the token
    jsonResponse.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Add CORS headers
    jsonResponse.headers.set(
      "Access-Control-Allow-Origin",
      allowedOrigin as string
    );
    jsonResponse.headers.set("Access-Control-Allow-Credentials", "true");
    jsonResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    jsonResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    )
    
    jsonResponse.headers.set(
      "Cross-Origin-Opener-Policy",
      "same-origin-allow-popups"
    );
    jsonResponse.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

    return jsonResponse;
  } catch (error) {
    console.error("Apple Auth API Error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const errorData = error.response?.data;

      console.error("Backend API Error:", {
        status,
        data: errorData,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          message: errorData?.message || "Authentication failed",
          error: errorData || error.message,
        },
        { status }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Unexpected error:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: "Server error during authentication",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
};

// Handle OPTIONS request for CORS preflight
export const OPTIONS = async (request: NextRequest) => {
  const origin = request.headers.get("origin");
  const allowedOrigin =
    origin ||
    (process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL
      : "http://localhost:3000");

  const response = new NextResponse(null, { status: 200 });

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin as string);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Add COOP headers for OPTIONS too
  response.headers.set(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

  return response;
};
