import ErrorResponse from "@/entities/api_error";

// Ortak hata işleme yardımcı fonksiyonu
export function handleApiError(error: any): ErrorResponse {
    if (error.response && error.response.data) {
      const { success, status, message, data,validation } = error.response.data;
      return {
        success: success || false,
        message: message || "Unknown error occurred",
        status: status || 500,
        data: data || new Map<string, any>(),
        validation: validation || new Map<string, any>(),
      };
    } else {
      return {
        success: false,
        message: "Failed to communicate with the server",
        status: 500,
        data: new Map<string, any>(),
        validation: new Map<string, any>(),
      };
    }
  }