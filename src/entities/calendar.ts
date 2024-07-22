import SuccessResponse from "./api_success";
import { IdInterface, IdsInterface } from "./common";

export interface SubCalendar{
    _id?:string,
    title:string,
    content:string,
    date?:Date,
    variables?:{ [key: string]: number[] },
    createdAt?:Date,
    updatedAt?:Date
}

export interface Calendar{
    id:string,
    title:string,
    calendars:SubCalendar[],
    variables:string[],

}

export interface getCalendarSuccessResponse extends SuccessResponse {
    data: Calendar;
}

export interface createSubCalendar extends IdInterface{
    date:Date,
}

export interface updateSubCalendar extends IdsInterface, SubCalendar {

}

export interface getCalendarVariablesSuccessResponse extends SuccessResponse
{
    data: {
        date: string;
        variables: {
            [key: string]: number[];
        };
    }[];
}
