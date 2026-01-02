import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const streamUrl = url.searchParams.get("url");
  if (!streamUrl) {
    return NextResponse.json(
      { error: "Stream URL is required" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.head(streamUrl);
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({ success: true, status: response.status });
    } else {
      return NextResponse.json({
        success: false,
        status: response.status,
        message: response.statusText,
      });
    }
  } catch (err: unknown) {
    console.error("Error fetching stream URL:", (err as { message?: string }).message || 'Unknown error');
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching the stream URL",
      },
      { status: 500 }
    );
  }
};