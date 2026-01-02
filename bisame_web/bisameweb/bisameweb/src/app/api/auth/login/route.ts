import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs"; // Ensure Node.js runtime
export const dynamic = "force-dynamic"; // Disable static optimization

export async function POST(request: Request) {
  try {
    console.log("Received request at /api/auth/login");

    // Parse the request body
    const requestText = await request.text();
    console.log("Raw request body:", requestText);

    let body;
    try {
      body = JSON.parse(requestText);
    } catch (e) {
      console.error("Failed to parse request body as JSON:", e);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    console.log("Parsed request body:", body);

    const { phoneNumber, password, countryShortName } = body;

    // Validate required fields
    if (!phoneNumber) {
      console.error("Missing phoneNumber in request");
      return NextResponse.json(
        {
          success: false,
          message: "Missing required field: phoneNumber",
        },
        { status: 400 }
      );
    }

    if (!password) {
      console.error("Missing password in request");
      return NextResponse.json(
        {
          success: false,
          message: "Missing required field: password",
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const loginPath = process.env.NEXT_PUBLIC_LOGIN_API_URL;

    if (!baseUrl || !loginPath) {
      console.error(
        "NEXT_PUBLIC_AUTH_API_BASE_URL or NEXT_PUBLIC_LOGIN_API_URL is not defined"
      );
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Missing API URL",
        },
        { status: 500 }
      );
    }

    // Combine base URL and login path
    const apiUrl = `${baseUrl.replace(/\/$/, "")}${loginPath}`;

    console.log("Login API URL:", apiUrl);

    // Format the phone number to ensure it's in the expected format
    let formattedPhone = phoneNumber.replace(/\D/g, "");

    // If it starts with 0, replace with country code (233 for Ghana)
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "233" + formattedPhone.substring(1);
    }
    // If it doesn't start with country code, add it
    else if (!formattedPhone.startsWith("233")) {
      formattedPhone = "233" + formattedPhone;
    }

    // Request data with new structure
    const requestData = {
      phoneNumber: formattedPhone,
      password,
      countryShortName: countryShortName || "GH",
    };

    console.log("Sending request to external API:", requestData);

    try {
      const response = await axios({
        method: "POST",
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: requestData,
        timeout: 10000, // 10 second timeout
      });

      console.log("External API Response:", {
        status: response.status,
        data: response.data,
      });

      // Get origin from request
      const origin = request.headers.get("origin");
      const allowedOrigin =
        origin ||
        (process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_APP_URL
          : "http://localhost:3000");

      // Create response with proper headers
      const jsonResponse = NextResponse.json(response.data, { status: 200 });

      // Set auth-token cookie if token is present in response
      const token = response.data.data?.token;
      if (token) {
        jsonResponse.cookies.set({
          name: "auth-token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      }

      // Add security headers
      jsonResponse.headers.set(
        "Access-Control-Allow-Origin",
        allowedOrigin as string
      );
      jsonResponse.headers.set("Access-Control-Allow-Credentials", "true");
      jsonResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      jsonResponse.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      jsonResponse.headers.set(
        "Cross-Origin-Opener-Policy",
        "same-origin-allow-popups"
      );
      jsonResponse.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

      return jsonResponse;
    } catch (apiError: unknown) {
      console.error("External API Error:", apiError);

      // Log the complete error response for debugging
      if (axios.isAxiosError(apiError)) {
        console.error("Error Response Data:", apiError.response?.data);
        console.error("Error Response Status:", apiError.response?.status);
        console.error("Error Response Headers:", apiError.response?.headers);
      }

      if (
        axios.isAxiosError(apiError) &&
        (apiError.code === "ECONNREFUSED" ||
          apiError.code === "ETIMEDOUT" ||
          apiError.code === "ENOTFOUND")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to connect to the authentication service. Please try again later.",
            error: apiError.message,
          },
          { status: 503 }
        );
      }

      if (axios.isAxiosError(apiError) && apiError.response) {
        // If the API returns a specific error message, pass it through
        const errorMessage =
          apiError.response.data?.message ||
          apiError.response.data?.error ||
          "Login failed. Please check your credentials.";

        return NextResponse.json(
          {
            success: false,
            message: errorMessage,
            error: apiError.response.data,
          },
          { status: apiError.response.status || 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Error connecting to authentication service",
          error: apiError instanceof Error ? apiError.message : "Unknown error",
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    console.error("API Error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
    });

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Failed to login.",
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

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: Request) {
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
  response.headers.set(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

  return response;
}
