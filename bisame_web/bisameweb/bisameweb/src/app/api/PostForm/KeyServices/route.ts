import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "@/app/utils/auth";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const main = searchParams.get("main") as string;
    const sub = searchParams.get("sub") as string;
    const child = searchParams.get("child") as string;

    // Configuring API URL
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const serviceOptionsUrl = process.env.NEXT_PUBLIC_SERVICE_OPTIONS;

    // Running checks for missing env variables
    if (!baseUrl) {
      return NextResponse.json({ error: "Missing base url" }, { status: 500 });
    }
    if (!serviceOptionsUrl) {
      return NextResponse.json(
        { error: "Missing api endpoint" },
        { status: 500 }
      );
    }

    //Merge urls
    const apiUrl = `${baseUrl}${serviceOptionsUrl}?category=${encodeURIComponent(
      main
    )}&subCategory=${encodeURIComponent(sub)}`;

    if (!apiUrl) {
      return NextResponse.json(
        { error: "Key Services API URL not configured", code: "CONFIG_ERROR" },
        { status: 500 }
      );
    }

    console.log("Environment API URL:", apiUrl);

    // Validate required parameters
    if (!main || !sub || !child) {
      return NextResponse.json(
        {
          error: "Missing required parameters: main, sub, child",
          code: "MISSING_PARAMETERS",
        },
        { status: 400 }
      );
    }

    const authToken = getAuthToken(request);
    if (!authToken?.trim()) {
      return NextResponse.json(
        { error: "Authentication token required", code: "AUTH_TOKEN_MISSING" },
        { status: 401 }
      );
    }

    // Build the target URL by replacing template placeholders
    let targetUrl = apiUrl
      .replace("{category}", encodeURIComponent(main))
      .replace("{subcategory}", encodeURIComponent(sub));

    // Handle the child parameter - it might be missing the placeholder
    if (targetUrl.includes("child=")) {
      // If child= exists but is empty, replace it with the value
      targetUrl = targetUrl.replace(
        "child=",
        "child=" + encodeURIComponent(child)
      );
    } else {
      // If child parameter is missing entirely, add it
      const separator = targetUrl.includes("?") ? "&" : "?";
      targetUrl += `${separator}child=${encodeURIComponent(child)}`;
    }

    // Validate that all parameters are present in the final URL
    // Validate using URL object for accurate parameter checking
    const parsedUrl = new URL(targetUrl);
    const hasMain = parsedUrl.searchParams.has("main");
    const hasSub = parsedUrl.searchParams.has("sub");
    const hasChild = parsedUrl.searchParams.has("child");

    if (!hasMain || !hasSub || !hasChild) {
      console.error("Invalid URL construction:", {
        hasMain,
        hasSub,
        hasChild,
        targetUrl,
      });
      return NextResponse.json(
        { error: "Invalid URL construction", code: "URL_CONSTRUCTION_ERROR" },
        { status: 500 }
      );
    }

    console.log("Key Services API Request:", {
      originalApiUrl: apiUrl,
      targetUrl,
      main,
      sub,
      child,
      encodedMain: encodeURIComponent(main),
      encodedSub: encodeURIComponent(sub),
      encodedChild: encodeURIComponent(child),
      authToken: authToken ? "present" : "missing",
      timestamp: new Date().toISOString(),
    });

    try {
      const { data } = await axios.get(targetUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "User-Agent": "BiSameWeb/1.0",
        },
        timeout: 30000,
      });

      return NextResponse.json(data, {
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      });
    } catch (axiosError) {
      // Always throw the error to ensure we get real API data
      throw axiosError;
    }
  } catch (error) {
    console.error("Key Services API error:", error);

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      console.log("Key Services API Error Details:", {
        status,
        responseData,
        errorCode: error.code,
        errorMessage: error.message,
        responseHeaders: error.response?.headers,
        requestUrl: error.config?.url,
      });

      if (error.code === "ECONNABORTED") {
        return NextResponse.json(
          { error: "Request timeout", code: "REQUEST_TIMEOUT" },
          { status: 504 }
        );
      }

      if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
        console.error("Key Services API is unavailable:", error.message);
        return NextResponse.json(
          {
            error:
              "Key Services API is currently unavailable. Please try again later.",
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
            details: responseData || "No additional details available",
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