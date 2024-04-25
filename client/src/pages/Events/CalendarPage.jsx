import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const CalendarPage = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [eventsData, setEventsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEventClick = (event) => {
    // Set the selected date to the start date of the clicked event
    setSelectedDate(new Date(event.start));
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/events/index", {
          credentials: "include",
        });
        const getEventRes = await response.json();
        const eventDataWithDateObjects = getEventRes.map(event => {
            const eventDateTime = new Date(event.eventDateTime);
            const eventEndDateTime = new Date(event.eventDateTime);
            eventEndDateTime.setHours(eventEndDateTime.getHours() + 6); // Adding 6 hours to eventDateTime
            return {
              ...event,
              eventDateTime,
              eventEndDateTime
            };
          });
        setEventsData(eventDataWithDateObjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEventsData();
  }, []);

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
        {console.log(eventsData)}
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 h-screen">
            <div className="w-full bg-white h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col">
              <Calendar
                localizer={localizer}
                events={eventsData}
                startAccessor="eventDateTime"
                endAccessor="eventEndDateTime"
                titleAccessor="eventName"
                resourceAccessor="eventLocation"
                onSelectEvent={handleEventClick} // Handle event click
                defaultDate={selectedDate} // Set the date prop to the selected date
                onView={() => setSelectedDate(null)} 
                style={{ height: 500 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
