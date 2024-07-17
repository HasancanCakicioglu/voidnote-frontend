import SuccessResponse from "./api_success";

export interface homeSuccessResponse extends SuccessResponse {
    data: [{ collection: string, count: number, storageSize:number}]
}