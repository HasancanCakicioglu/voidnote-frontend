import SuccessResponse from "./api_success";
import { IdsInterface } from "./common";


export interface getTodoListSuccessResponse extends SuccessResponse {
    data: { userID:string,title: string,completedJobs:number,totalJobs:number,todos:[subTodo]};
}
export interface subTodo{
    _id:string;
    content:string,
    completed:boolean,
    priority:number,
    updatedAt?:Date,
    createdAt?:Date
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

export interface addSubTodoListSuccessResponse extends SuccessResponse {
    data: subTodo;
}

export interface addSubTodoData{
    content:string,
    completed:boolean,
    priority:number,
    id:string,
}

export interface  UpdateSubTodo extends IdsInterface{
    content:string,
    priority:number,
    completed:boolean,
}