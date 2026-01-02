import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    //Get search parameters needed
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group") as string;
    const category = searchParams.get("category") as string;
    const subCategory = searchParams.get("subCategory") as string;

    // Run checks for missing parameter
    if (!group) {
      return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    //Capitalize group name
    const capitalizedGroup = group[0].toUpperCase() + group.slice(1);

    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const formOptionUrl = process.env.NEXT_PUBLIC_FORM_OPTIONS;

    //Run checks for missing url
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Base Url is missing" },
        { status: 400 }
      );
    } else if (!formOptionUrl) {
      return NextResponse.json(
        {
          error: "Form option url is missing, check it out",
        },
        { status: 200 }
      );
    }

    //Merge url to obtain full api url
    let apiUrl;
    if (capitalizedGroup == "Health" || capitalizedGroup == "Job Seekers") {
      apiUrl = `${baseUrl}${formOptionUrl}?category=${encodeURIComponent(
        category
      )}&group=${encodeURIComponent(capitalizedGroup)}`;
    } else if (capitalizedGroup == "Buy and Sell") {
      apiUrl = `${baseUrl}${formOptionUrl}?category=${encodeURIComponent(
        category
      )}&subCategory=${encodeURIComponent(
        subCategory
      )}&group=${encodeURIComponent(capitalizedGroup)}`;
    } else
      apiUrl = `${baseUrl}${formOptionUrl}?group=${encodeURIComponent(
        capitalizedGroup
      )}`;

    console.log(apiUrl);

    const response = await axios.get(apiUrl);
    if (!response.data) {
      return NextResponse.json("Error occurred while fetching data");
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured data:", error);

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
