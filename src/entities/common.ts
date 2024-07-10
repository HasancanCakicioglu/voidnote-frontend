import SuccessResponse from "./api_success";

export interface  IdInterface{
    id: string;
}

export interface createSuccessResponse extends SuccessResponse {
    data: { _id: string, title: string};
}