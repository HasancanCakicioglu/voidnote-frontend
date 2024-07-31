"use client";

import React, { useState, useEffect } from 'react';
import SmallHeader from '@/components/smallHeader';
import { createSubCalendars, deleteSubCalendars, getCalendar, updateCalendar } from '@/actions/calendar';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/entities/calendar';
import { CircleX, Save } from 'lucide-react'; // Import the CircleX icon from Lucid React
import { useRouter } from '@/navigations';
import { useTranslations } from 'next-intl';

const CalendarPage = ({ params }: { params: { id: string } }) => {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const t = useTranslations("common");

  const [changed, setChanged] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const fetchCalendar = async () => {
        try {
          const response = await getCalendar({ id: params.id });
          if (response.success === false) {
            toast({
              variant: "destructive",
              title: "Something went wrong.",
              description: response.message,
            });
          } else {
            setCalendar(response.data);
            setTitle(response.data.title);
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: error.message || "Error fetching calendar",
          });
        }
      };
      fetchCalendar();
    }
  }, [params.id]);

  const handleDateClick = async (date: Date, calendarId: string | undefined) => {
    setSelectedDate(date);
    const variables = calendar?.variables.join(',');

    if (calendarId) {
      let url = `/calendar/${params.id}/${calendarId}`;
      if(variables){
        url = url+`?variables=${encodeURIComponent(variables)}`;
        
      }
      router.push(url);
      return;
    }

    let response = await createSubCalendars({
      id: params.id,
      date: date,
    });
    
    if (response.success) {
      let url = `/calendar/${params.id}/${response.data._id}`
      if(variables){
        url = url+`?variables=${encodeURIComponent(variables)}`;
      }
      router.push(url);
    }
  };

  const handleDeleteClick = async (calendarId: string | undefined) => {
    if (calendarId) {
      try {
        const response = await deleteSubCalendars({
          id_first: params.id,
          id_second: calendarId,
        });
        if (response.success === false) {
          toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: response.message,
          });
        } else {
          setCalendar((prevCalendar) => {
            if (!prevCalendar) return prevCalendar;
            return {
              ...prevCalendar,
              calendars: prevCalendar.calendars.filter((note) => note._id !== calendarId),
            };
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.message || "Error deleting calendar entry",
        });
      }
    }
  };

  const renderHeader = () => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return (
      <div className="flex justify-between items-center p-3 bg-gray-800 text-white rounded-lg mb-4 border border-gray-600">
        <button
          className="p-2 bg-gray-600 text-white rounded-lg text-sm md:text-base"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        >
          &lt;
        </button>
        <h2 className="text-base md:text-lg font-bold">{currentDate.toLocaleDateString('en-US', dateOptions)}</h2>
        <button
          className="p-2 bg-gray-600 text-white rounded-lg text-sm md:text-base"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 text-center bg-gray-700 text-white rounded-lg py-1 mb-4 border border-gray-600">
        {days.map(day => (
          <div key={day} className="py-1 text-xs md:text-sm font-bold">{day}</div>
        ))}
      </div>
    );
  };

  const renderDates = () => {
    const dates = [];
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startDate.getDay();
    const endDay = endDate.getDate();
    const today = new Date();
  
    for (let i = 0; i < startDay; i++) {
      dates.push(<div key={`empty-${i}`} className="py-2"></div>);
    }
  
    for (let day = 1; day <= endDay; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const note = calendar?.calendars.find(note => note.date && new Date(note.date).toDateString() === date.toDateString());
      const isToday = date.toDateString() === today.toDateString();
  
      dates.push(
        <div
          key={day}
          className={`min-h-[10vh] text-black relative py-2 cursor-pointer  ${note ? 'bg-blue-400' : 'border bg-gray-200 border-gray-300'} ${isToday ? 'bg-red-400' : ''} rounded-lg m-1 text-xs md:text-sm`}
          onClick={() => handleDateClick(date, note?._id)}
        >
          {isToday ? t("today") : day}
          {note?._id && (
            <div className="absolute top-1 right-1">
              <button
                className="text-xs text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(note._id);
                }}
              >
                <CircleX className="h-4 w-4" /> {/* Using Lucid React CircleX icon */}
              </button>
            </div>
          )}
          {note && <div className="text-xs text-white">{note.title}</div>}
        </div>
      );
    }

  
  
    return (
    
      <div className="grid grid-cols-7 text-center border border-gray-600 rounded-lg p-1">
        {dates}
      </div>
    );
  };
  const saveTitle = async () => {
    let response = await updateCalendar({
      id: params.id,
      title: title ?? undefined,
    });

    if (response && response.success) {
      setChanged(false);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      });
    }
  };

  if (!calendar) return <p className="text-gray-600">{t("loading")}</p>;

  return (
    <div className="sm:gap-4 sm:py-4 md:px-8 max-w-full min-w-full">
      <SmallHeader/>
      <div className="flex flex-col max-w-[90vw] p-4 mx-auto">
      <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-1">
          <input
            type="text"
            value={title || "Untitled"}
            onChange={(e) => {
              setChanged(true);
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="border p-2 rounded-md border-gray-700 mr-2 flex-grow sm:flex-grow-0"
          />
          <button
            disabled={!changed}
            onClick={saveTitle}
            className={`border p-2 py-2 px-4 rounded-md ${
              changed ? "bg-primary text-primary-foreground" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            <Save />
          </button>
        </div>
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderDates()}
      </div>
    </div>
  );
};

export default CalendarPage;
