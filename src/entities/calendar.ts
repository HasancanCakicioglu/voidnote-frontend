import SuccessResponse from "./api_success";
import { IdInterface } from "./common";

export interface SubCalendar{
    title:string,
    content:string,
    date:Date,
    createdAt?:Date,
    updatedAt?:Date
}

export interface Calendar{
    id:string,
    title:string,
    calendars:[{date:Date,title:string}],
    notes:[SubCalendar]

}

export interface getCalendarSuccessResponse extends SuccessResponse {
    data: Calendar;
}

export interface createSubCalendar extends IdInterface{
    date:Date,
}