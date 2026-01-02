import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // Getting search parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as string;
    const subCategory = searchParams.get("subCategory") as string;

    // Running checks for missing parameter
    if (!category && !subCategory) {
      return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

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
      category
    )}&subCategory=${encodeURIComponent(subCategory)}`;

    const response = await axios.get(apiUrl);
    console.log(response.data);
    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Error occurred fetching data" },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData = error.response.data || {};
        return NextResponse.json(
          {
            error:
              errorData.message ||
              errorData.error ||
              "Error from search service",
            statusCode: error.response.status,
            details:
              errorData.details ||
              "An error occurred while processing your search",
          },
          { status: error.response.status }
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        return NextResponse.json(
          {
            error: "No response from server",
            message:
              "The search service is not responding. Please try again later.",
          },
          { status: 503 }
        );
      } else {
        console.error("Request setup error:", error.message);
        return NextResponse.json(
          {
            error: "Internal server error",
            message:
              "An unexpected error occurred while processing your search",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "An unexpected error occurred while processing your search",
      },
      { status: 500 }
    );
  }
};