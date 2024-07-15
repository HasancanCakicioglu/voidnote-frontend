
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
    children_id:string[];
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

export interface UserCalendar{
    _id:string;
    title:string;
    content:string;
    date:Date;
    updatedAt:Date;
    createdAt:Date;
}