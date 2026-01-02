import { NextResponse } from "next/server";
import axios from "axios";
import { getAuthToken } from "@/app/utils/auth";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get("deleteId");

    if (!deleteId) {
      return NextResponse.json({ error: "Missing deletedId" }, { status: 400 });
    }

    const BASEURL = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const DELETEURL = process.env.NEXT_PUBLIC_DELETE_SAVE_API_URL?.replace(
      "{listingId}",
      deleteId as string
    );
    const apiUrl = `${BASEURL}${DELETEURL}`;

    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: "Delete Save API URL not configured." },
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

    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.message || "Failed to delete saved item.",
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
      typeof (error as { message?: string }).message === "string"
    ) {
      errorMessage = (error as { message?: string }).message || "";
    }
    return NextResponse.json(
      { success: false, message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}