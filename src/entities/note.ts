import SuccessResponse from "./api_success";

export interface UserNotes {
    _id: string;
    title: string;
    brief: string;
    updatedAt: Date;
}

export interface createNoteSuccessResponse extends SuccessResponse {
    data: { _id: string, title: string};
}

export interface getNoteSuccessResponse extends SuccessResponse {
    data: { title: string,content:string};
}

export interface  GetNote{
    id: string;
}

export interface  UpdateNote{
    id: string;
    title:string,
    content:string,
    brief:string
}
