import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const image = await request.formData();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") as string;

    const files = image.getAll("file");

    const uploadFormData = new FormData();

    for (const file of files) {
      uploadFormData.append("file", file);
    }

    uploadFormData.append("applyWaterMark", "true");
    uploadFormData.append("waterMarkText", `${name} Posted on Bisame`);

    if (!files) {
      return NextResponse.json(
        { error: "No image found from the request" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_UPLOAD;

    const apiUrl = `${baseUrl}${imageUrl}`;
    console.log(apiUrl);

    if (!apiUrl) {
      return NextResponse.json(
        { error: "Invalid API URL configuration" },
        { status: 400 }
      );
    }

    const response = await axios.post(apiUrl, uploadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AXIOS ERROR:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config,
      });

      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Failed to upload image.",
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error("NON-AXIOS ERROR:", {
      errorType: typeof error,
      errorInstance: error instanceof Error,
      fullError: error,
    });

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
};
