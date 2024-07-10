"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import { cookies } from "next/headers";
import SuccessResponse from "@/entities/api_success";
import { handleApiError } from "./api";
import { createSuccessResponse, IdInterface } from "@/entities/common";
import { getTodoListSuccessResponse } from "@/entities/todo";

export async function createTodoList(): Promise<
  createSuccessResponse | ErrorResponse
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

    const response = await apiClient.post<createSuccessResponse>(
      "/todo/create",
      [],
      {
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
export async function getTodoList(
    data: IdInterface
  ): Promise<getTodoListSuccessResponse | ErrorResponse> {
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
  
      const response = await apiClient.get<getTodoListSuccessResponse>(
        `/todo/get/${data.id}`,
        {
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
  
  
  export async function deleteTodoList(
    data: IdInterface
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const token = cookies().get("access_token");
  
      if (!token) {
        return {
          success: false,
          message: "Access token not found",
          status: 401,
          validation: new Map<string, any>(),
        };
      }
  
      const response = await apiClient.delete<SuccessResponse>(
        `/todo/delete/${data.id}`,
        {
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
  