
export interface  GetUserData {
    type: string;
}

export interface UserNotes {
    _id: string;
    title: string;
    brief: string;
    updatedAt: Date;
}

export interface UserTreeNotes {
    _id: string;
    title: string;
    parent_id?: string;
    brief: string;
    updatedAt: Date;
}

export interface UserTodoList{
    _id:string;
    title:string;
    completedJobs:number;
    totalJobs:number;
    updatedAt:Date;
}