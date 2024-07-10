import SuccessResponse from "./api_success";


export interface createTodoListSuccessResponse extends SuccessResponse {
    data: { _id: string, title: string};
}

export interface getTodoListSuccessResponse extends SuccessResponse {
    data: { title: string,content:string};
}

export interface  GetTodoList{
    id: string;
}

export interface  UpdateTodoList{
    id: string;
    title:string,
    content:string,
    brief:string
}
