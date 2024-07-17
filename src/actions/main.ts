"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import { cookies } from "next/headers";

import { handleApiError } from "./api";
import { homeSuccessResponse } from "@/entities/home";

export async function home(): Promise<
homeSuccessResponse | ErrorResponse
> {
  try {
    const token = cookies().get("access_token");

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }

    const response = await apiClient.get<homeSuccessResponse>(
      "/main/home",
    );

    return response.data;
  } catch (error: any) {
    return handleApiError(error);
  }
}