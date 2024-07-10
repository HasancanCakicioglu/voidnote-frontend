import SuccessResponse from "./api_success";


export interface getTodoListSuccessResponse extends SuccessResponse {
    data: { userID:string,title: string,completedJobs:number,totalJobs:number,todos:[subTodo]};
}
interface subTodo{
    content:string,
    completed:boolean,
    priority:number,
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
