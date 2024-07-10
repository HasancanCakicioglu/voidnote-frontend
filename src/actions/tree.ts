"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import { cookies } from "next/headers";
import {createTreeNoteSuccessResponse, GetTreeNote , getTreeNoteSuccessResponse, UpdateTreeNote} from "@/entities/tree";
import SuccessResponse from "@/entities/api_success";
import { handleApiError } from "./api";



export async function createTreeNote(): Promise<createTreeNoteSuccessResponse | ErrorResponse> {
  try {
    const token = cookies().get("access_token")

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }

    
    const response = await apiClient.post<createTreeNoteSuccessResponse>(
      "/tree/create",[],{
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



export async function getTreeNote(data: GetTreeNote): Promise<getTreeNoteSuccessResponse | ErrorResponse> {

  try {
    const token = cookies().get("access_token")

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }

    const response = await apiClient.get<getTreeNoteSuccessResponse>(
      `/tree/get/${data.id}`,{
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


export async function updateTreeNote(data: UpdateTreeNote): Promise<createTreeNoteSuccessResponse | ErrorResponse> {
  try {
    const token = cookies().get("access_token")

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }


    const response = await apiClient.post<createTreeNoteSuccessResponse>(
      `/tree/update/${data.id}`,data,{
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


export async function deleteTreeNote(data: GetTreeNote): Promise<SuccessResponse | ErrorResponse> {
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

    const response = await apiClient.delete<SuccessResponse>(
      `/tree/delete/${data.id}`,{
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



