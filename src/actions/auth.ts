"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import SuccessResponse from "@/entities/api_success";
import { cookies } from "next/headers";
import { LoginData, VerifyRegisterData,RegisterData, loginSuccessResponse } from "@/entities/auth";
import { handleApiError } from "./api";
import { IdInterface, IdsInterface } from '@/entities/common';


export async function register(
  data: RegisterData
): Promise<SuccessResponse | ErrorResponse> {
  try {
    const response = await apiClient.post<SuccessResponse>(
      "/auth/signup",
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { success, status, message, validation } = error.response.data;
      return {
        success: success || false,
        message: message || "Unknown error occurred",
        status: status || 500,
        validation: validation || new Map<string, any>(),
      };
    } else {
      return {
        success: false,
        message: "Failed to communicate with the server",
        status: 500,
        validation: new Map<string, any>(),
      };
    }
  }
}

export const verifyEmail = async (
  data: VerifyRegisterData
): Promise<SuccessResponse | ErrorResponse> => {
  try {

    const response = await apiClient.post<SuccessResponse>(
      "/auth/verify",
      data,
      { withCredentials: true }
    );
    const cookiesArray = response.headers["set-cookie"]; // cookiesArray: string[] | undefined

    if (cookiesArray && cookiesArray.length > 0) {
      const cookiesString = cookiesArray.join("; "); // Join array elements with '; '
      const token = cookiesString.split("; ")[0].split("=")[1]; // Extract token from the string
      cookies().set("access_token", token,{
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly:cookiesString.includes("HttpOnly"),
        secure:cookiesString.includes("Secure"),
        sameSite:cookiesString.includes("SameSite"),

      }); // Set the token as a cookie
      
    }
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { success, status, message, validation } = error.response.data;
      return {
        success: success || false,
        message: message || "Unknown error occurred",
        status: status || 500,
        validation: validation || new Map<string, any>(),
      };
    } else {
      return {
        success: false,
        message: "Failed to communicate with the server",
        status: 500,
        validation: new Map<string, any>(),
      };
    }
  }
};


export const login = async (
  data: LoginData
): Promise<loginSuccessResponse | ErrorResponse> => {
  try {

    const response = await apiClient.post<loginSuccessResponse>(
      "/auth/signin",
      data,
      { withCredentials: true }
    );
    const cookiesArray = response.headers["set-cookie"]; // cookiesArray: string[] | undefined

    if (cookiesArray && cookiesArray.length > 0) {
      const cookiesString = cookiesArray.join("; "); // Join array elements with '; '
      const token = cookiesString.split("; ")[0].split("=")[1]; // Extract token from the string
      cookies().set("access_token", token,{
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly:cookiesString.includes("HttpOnly"),
        secure:cookiesString.includes("Secure"),
        sameSite:cookiesString.includes("SameSite"),

      }); // Set the token as a cookie
      
    }
    return response.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};


export const deleteAccessToken = async (): Promise<boolean> => {
  try {
    cookies().delete('access_token');
    return true;
  } catch (error: any) {
    return false;
  }
}



export const google = async (data:IdInterface): Promise<loginSuccessResponse | ErrorResponse> => {

  try {
    const response = await apiClient.post<loginSuccessResponse>(
      "/auth/google",[],
      {
        headers: {
          Authorization: `Bearer ${data.id}`,
        },
      }
    );
    const cookiesArray = response.headers["set-cookie"]; // cookiesArray: string[] | undefined

    if (cookiesArray && cookiesArray.length > 0) {
      const cookiesString = cookiesArray.join("; "); // Join array elements with '; '
      const token = cookiesString.split("; ")[0].split("=")[1]; // Extract token from the string
      cookies().set("access_token", token,{
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly:cookiesString.includes("HttpOnly"),
        secure:cookiesString.includes("Secure"),
        sameSite:cookiesString.includes("SameSite"),

      }); // Set the token as a cookie
      
    }
    return response.data;
  } catch (error: any) {
    return handleApiError(error);
  }
}
