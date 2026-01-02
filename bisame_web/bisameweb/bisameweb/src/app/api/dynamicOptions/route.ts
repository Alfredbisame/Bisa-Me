import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // Get all search parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const attributeKey = searchParams.get("attributeKey");
    const attributeValue = searchParams.get("attributeValue");
    const optionKey = searchParams.get("optionKey");
    const group = searchParams.get("group");

    // Run checks for missing parameter
    if (
      !category ||
      !subCategory ||
      !attributeKey ||
      !attributeValue ||
      !optionKey ||
      !group
    ) {
      return NextResponse.json(
        { error: "Missing search parameter" },
        { status: 400 }
      );
    }

    // Configure apiUrl
    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const dropdownOptionsUrl =
      process.env.NEXT_PUBLIC_CATEGORY_DROPDOWN_OPTIONS;

    if (!baseUrl || !dropdownOptionsUrl) {
      return NextResponse.json(
        { error: "Incorrect API url configuration" },
        { status: 500 }
      );
    }

    // Concatenate baseurl, dropdownOptionsUrl and search params to get full apiUrl
    const apiUrl = `${baseUrl}${dropdownOptionsUrl}?category=${encodeURIComponent(
      category
    )}&subCategory=${encodeURIComponent(
      subCategory
    )}&attributeKey=${encodeURIComponent(
      attributeKey
    )}&attributeValue=${encodeURIComponent(
      attributeValue
    )}&optionKey=${optionKey}&group=${encodeURIComponent(group)}`;


    const response = await axios.get(apiUrl);

    if (!response.data) {
      return NextResponse.json(
        { error: "Error occurred fetching data" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching dynamic form data:", error);

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
};
