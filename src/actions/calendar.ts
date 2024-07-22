"use server";
import apiClient from "@/lib/axios";
import { cookies } from "next/headers";
import { handleApiError } from "./api";
import { getCalendarSuccessResponse,createSubCalendar, Calendar, SubCalendar, updateSubCalendar , getCalendarVariablesSuccessResponse} from "@/entities/calendar";
import ErrorResponse from "@/entities/api_error";
import { IdInterface, IdsInterface } from "@/entities/common";
import SuccessResponse from "@/entities/api_success";


export async function createCalendar(): Promise<SuccessResponse | ErrorResponse> {
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
      const response = await apiClient.post<SuccessResponse>(
        "/calendar/create/",[],{
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          }
      );
  
    
      return response.data;
    } catch (error: any) {
        console.log(error)
      return handleApiError(error);
    }
  }


export async function getCalendar(data: IdInterface): Promise<getCalendarSuccessResponse | ErrorResponse> {

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
  
      const response = await apiClient.get<getCalendarSuccessResponse>(
        `/calendar/get/${data.id}`,{
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

  export async function deleteCalendar(
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
        `/calendar/delete/${data.id}`,
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
  

  export async function createSubCalendars(data:createSubCalendar): Promise<SuccessResponse | ErrorResponse> {
    try {
      const token = cookies().get("access_token")
      console.log(data)
  
      if (!token) {
        return {
          success: false,
          message: "Access token not found",
          status: 401,
          data: new Map<string, any>(),
          validation: new Map<string, any>(),
        };
      }
      const response = await apiClient.post<SuccessResponse>(
        `/calendar/create/sub/${data.id}`,data,{
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


  
export async function getSubCalendar(data: IdsInterface): Promise<getCalendarSuccessResponse | ErrorResponse> {

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

    const response = await apiClient.get<getCalendarSuccessResponse>(
      `/calendar/get/sub/${data.id_first}/${data.id_second}`,{
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


export async function updateSubCalendars(data:updateSubCalendar): Promise<SuccessResponse | ErrorResponse> {
  try {
    const token = cookies().get("access_token")
    console.log(data)

    if (!token) {
      return {
        success: false,
        message: "Access token not found",
        status: 401,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }
    const response = await apiClient.post<SuccessResponse>(
      `/calendar/update/sub/${data.id_first}/${data.id_second}`,data,{
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        }
    );

  
    return response.data;
  } catch (error: any) {
      console.log(error)
    return handleApiError(error);
  }
}


export async function deleteSubCalendars(data:IdsInterface): Promise<SuccessResponse | ErrorResponse> {
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
    const response = await apiClient.delete<SuccessResponse>(
      `/calendar/delete/sub/${data.id_first}/${data.id_second}`,{
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        }
    );

  
    return response.data;
  } catch (error: any) {
      console.log(error)
    return handleApiError(error);
  }
}



export async function getCalendarVariables(data: IdInterface): Promise<getCalendarVariablesSuccessResponse | ErrorResponse> {

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

    const response = await apiClient.get<getCalendarVariablesSuccessResponse>(
      `/calendar/get/variable/${data.id}`,{
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