"use client"
import React, { useState, useEffect } from 'react';
import SmallHeader from '@/components/smallHeader';
import { createSubCalendars, getCalendar } from '@/actions/calendar';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/entities/calendar';
import { useRouter } from "next/navigation";


const CalendarPage= ({ params }: { params: { id: string } }) => {

  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
            console.log(response)
            setCalendar(response.data);
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
  }, []);

  const handleDateClick = async(date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    let response = await createSubCalendars({
        id: params.id,
        date: date,
    })
    console.log(response)
    if (response.success) {
        router.push(`/dashboard/calendar/${params.id}/${response.data._id}`);
    }
  };

  const renderHeader = () => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return (
      <div className="flex justify-between items-center p-4 bg-gray-700 text-white rounded-lg mb-4 border border-gray-500">
        <button
          className="p-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">{currentDate.toLocaleDateString('en-US', dateOptions)}</h2>
        <button
          className="p-2 bg-gray-500 text-white rounded-lg"
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
      <div className="grid grid-cols-7 text-center bg-gray-800 text-white rounded-lg py-2 mb-4 border border-gray-500">
        {days.map(day => (
          <div key={day} className="py-2 font-bold">{day}</div>
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
      dates.push(<div key={`empty-${i}`} className="py-4"></div>);
    }

    for (let day = 1; day <= endDay; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const note = calendar?.calendars.find(note => new Date(note.date).toDateString() === date.toDateString());
      const isToday = date.toDateString() === today.toDateString();

      dates.push(
        <div
          key={day}
          className={`py-4 cursor-pointer ${selectedDate?.getTime() === date.getTime() ? 'bg-blue-200' : 'bg-gray-100'} ${note ? 'bg-blue-300 border border-blue-500' : 'border border-gray-300'} ${isToday ? 'bg-red-200' : ''} rounded-lg m-1`}
          onClick={() => handleDateClick(date)}
        >
          {isToday ? 'Today' : day}
          {note && <div className="text-xs text-blue-500">{note.title}</div>}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 text-center border border-gray-500 rounded-lg p-2">
        {dates}
      </div>
    );
  };

  if (!calendar) return <p>Loading...</p>;

  return (
    <div className='sm:gap-4 sm:py-4 sm:pl-14'>
      <SmallHeader />
      <div className="flex flex-col min-h-screen max-w-[90vw] p-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4">{calendar.title}</h1>
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderDates()}
      </div>
    </div>
  );
};

export default CalendarPage;
