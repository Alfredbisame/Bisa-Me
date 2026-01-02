import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const popularApiEndPoint = process.env.NEXT_PUBLIC_POPULAR_SEARCH;

    if (!BASE_URL || !popularApiEndPoint) {
      console.error("Missing required environment variables");

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 200 }
      );
    }

    const fullUrl = `${BASE_URL}${popularApiEndPoint}`;

    const response = await axios.get(fullUrl, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    if (!response.data || response.status !== 200) {
      console.error("Invalid response received");
      return NextResponse.json(
        { error: "Invalid response received" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
  }
};
