import SuccessResponse from "./api_success";


export interface createNoteSuccessResponse extends SuccessResponse {
    data: { _id: string, title: string};
}

export interface getNoteSuccessResponse extends SuccessResponse {
    data: { title: string,content:string,variables:{ [key: string]: number[] }};
}

export interface getNoteVariablesSuccessResponse extends SuccessResponse {
    data: {variables:{ [key: string]: number[] }};
}

export interface  GetNote{
    id: string;
}

export interface  UpdateNote{
    id: string;
    title:string,
    content:string,
    variables: {
        [key: string]: number[];
    };
    brief:string
}
