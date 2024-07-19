"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import { cookies } from "next/headers";
import SuccessResponse from "@/entities/api_success";
import { handleApiError } from "./api";
import { createSuccessResponse, IdInterface, IdsInterface } from "@/entities/common";
import { getTodoListSuccessResponse ,addSubTodoListSuccessResponse,addSubTodoData, UpdateSubTodo, UpdateTodoList} from "@/entities/todo";

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

  export async function updateTodoList(
    data: UpdateTodoList
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

      const response = await apiClient.post<SuccessResponse>(
        `/todo/update/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      return response.data;
    }
    catch (error: any) {
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
  

  
export async function createSubTodoList(
  data:addSubTodoData
): Promise<
addSubTodoListSuccessResponse | ErrorResponse
> {
try {
  console.log(data)
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

  const response = await apiClient.post<addSubTodoListSuccessResponse>(
    `/todo/create/subtodo/${data.id}`,
    data,
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


export async function deleteSubTodo(
  data: IdsInterface
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
      `/todo/delete/subtodo/${data.id_first}/${data.id_second}`,
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

export async function updateSubTodo(
  data: UpdateSubTodo
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

    const response = await apiClient.post<SuccessResponse>(
      `/todo/update/subtodo/${data.id_first}/${data.id_second}`,
      data,
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
