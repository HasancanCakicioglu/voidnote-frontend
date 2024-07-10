"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import SuccessResponse from "@/entities/api_success";
import { cookies } from "next/headers";
import { handleApiError } from "./api";
import { GetUserData } from "@/entities/user";


export async function getUser(
  data: GetUserData
): Promise<SuccessResponse | ErrorResponse> {
  try {
    const token = cookies().get("access_token")

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        validation: new Map<string, any>(),
      };
    }


    const response = await apiClient.post<SuccessResponse>(
      "/user/get",
      data,{
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        }
    );

  
    return response.data;
  } catch (error: any) {
    return handleApiError(error);
  }
}


