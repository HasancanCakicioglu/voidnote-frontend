import SuccessResponse from "./api_success";


export interface createTreeNoteSuccessResponse extends SuccessResponse {
    data: { _id: string, title: string};
}

export interface getTreeNoteSuccessResponse extends SuccessResponse {
    data: { title: string,content:string};
}

export interface getTreeNoteVariableSuccessResponse extends SuccessResponse {
    data: {variables:{ [key: string]: number[] }};
}

export interface  GetTreeNote{
    id: string;
}

export interface  UpdateTreeNote{
    id: string;
    title:string,
    content:string,
    variables: {
        [key: string]: number[];
    };
    brief:string
}

export interface createTreeNoteData{
    parent_id?:string;
}