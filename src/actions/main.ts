"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";

import { handleApiError } from "./api";
import { homeSuccessResponse } from "@/entities/home";

export async function home(): Promise<
homeSuccessResponse | ErrorResponse
> {
  try {

    const response = await apiClient.get<homeSuccessResponse>(
      "/main/home",
    );

    return response.data;
  } catch (error: any) {
    return handleApiError(error);
  }
}