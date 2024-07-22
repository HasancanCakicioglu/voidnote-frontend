"use server";
import apiClient from "@lib/axios";
import ErrorResponse from "@/entities/api_error";
import { cookies } from "next/headers";
import {
  createNoteSuccessResponse,
  GetNote,
  getNoteSuccessResponse,
  getNoteVariablesSuccessResponse,
  UpdateNote,
} from "@/entities/note";
import SuccessResponse from "@/entities/api_success";
import { handleApiError } from "./api";

export async function createNote(): Promise<
  createNoteSuccessResponse | ErrorResponse
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

    const response = await apiClient.post<createNoteSuccessResponse>(
      "/note/create",
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

export async function getNote(
  data: GetNote
): Promise<getNoteSuccessResponse | ErrorResponse> {
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

    const response = await apiClient.get<getNoteSuccessResponse>(
      `/note/get/${data.id}`,
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

export async function updateNote(
  data: UpdateNote
): Promise<createNoteSuccessResponse | ErrorResponse> {
  try {
    const token = cookies().get("access_token");
    console.log(data);
    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }

    const response = await apiClient.post<createNoteSuccessResponse>(
      `/note/update/${data.id}`,
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

export async function deleteNote(
  data: GetNote
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
      `/note/delete/${data.id}`,
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


export async function getNoteVariables(
  data: GetNote
): Promise<getNoteVariablesSuccessResponse | ErrorResponse> {
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

    const response = await apiClient.get<getNoteVariablesSuccessResponse>(
      `/note/get/variable/${data.id}`,
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