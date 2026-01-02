import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "@/app/utils/auth";

interface ApiError {
  message: string;
  response?: {
    data?: unknown;
    status?: number;
  };
}

interface RequestBody {
  userid: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    console.log("Received request at /api/auth/changepassword");

    // Parse the request body
    const requestText = await request.text();
    console.log("Raw request body:", requestText);

    let body: RequestBody;
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

    const { password } = body;

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
    const resetUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD;

    const apiUrl = `${baseUrl}${resetUrl}`;

    if (!apiUrl) {
      console.error("RESET PASSWORD API URL is not defined");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Missing API URL",
        },
        { status: 500 }
      );
    }

    console.log("Change Password API URL:", apiUrl);

    const requestData = {
      password,
    };

    console.log("Sending request to external API:", requestData);

    const token = getAuthToken(request);

    console.log("My token is " + token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN || ""}`,
      Accept: "application/json",
    };

    console.log("Request headers:", headers);

    try {
      const response = await axios({
        method: "POST",
        url: apiUrl,
        headers,
        data: requestData,
        timeout: 10000, // 10 second timeout
      });

      console.log("External API Response:", {
        status: response.status,
        data: response.data,
      });

      return NextResponse.json({
        success: true,
        message: "Password changed successfully",
        data: response.data,
      });
    } catch (apiError: unknown) {
      console.error("External API Error:", apiError);

      if (axios.isAxiosError(apiError)) {
        return NextResponse.json(
          {
            success: false,
            message:
              apiError.response?.data?.message || "Failed to change password.",
            error: apiError.response?.data || apiError.message,
          },
          { status: apiError.response?.status || 500 }
        );
      }

      if (
        typeof apiError === "object" &&
        apiError !== null &&
        "message" in apiError &&
        typeof (apiError as ApiError).message === "string"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: (apiError as ApiError).message,
            error:
              (apiError as ApiError).response?.data ||
              (apiError as ApiError).message,
          },
          { status: (apiError as ApiError).response?.status || 500 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Error connecting to authentication service",
          error: (apiError as ApiError).message,
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    console.error("API Error:", error);
    console.error("Error details:", {
      message:
        typeof error === "object" && error !== null && "message" in error
          ? String((error as ApiError).message)
          : "Unknown error",
      response:
        typeof error === "object" && error !== null && "response" in error
          ? (error as ApiError).response?.data
          : undefined,
      status:
        typeof error === "object" && error !== null && "response" in error
          ? (error as ApiError).response?.status
          : undefined,
    });

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            (error as AxiosError<{ message?: string }>).response?.data
              ?.message || "Failed to change password.",
          error:
            (error as AxiosError<{ message?: string }>).response?.data ||
            (error as AxiosError<{ message?: string }>).message,
        },
        { status: (error as AxiosError<unknown>).response?.status || 500 }
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
