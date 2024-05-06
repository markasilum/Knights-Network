import React, { useEffect, useState, useRef, useCallback } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from "react-router-dom";


const CalendarPage = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [eventsData, setEventsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const sevenAM = new Date();
  sevenAM.setHours(7, 0, 0, 0);
  const elevenPM = new Date();
  elevenPM.setHours(23, 0, 0, 0);
  const navigate = useNavigate()

  // const handleEventClick = (event) => {
  //   // Set the selected date to the start date of the clicked event
  //   setSelectedDate(new Date(event.start));
  // };

  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    
    console.log(calEvent)
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      navigate(`/eventdetails/${calEvent.id}`)
    }, 250)
  }, [])

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(buildMessage(calEvent, 'onDoubleClickEvent'))
    }, 250)
  }, [])

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/events/index", {
          credentials: "include",
        });
        const getEventRes = await response.json();
        const eventDataWithDateObjects = getEventRes.map(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            return {
              ...event,
              startDate,
              endDate
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
          <div className="pt-2 pr-2 h-screen">
            <div className="w-full bg-white h-fit min-h-80 p-3 rounded-xl mb-20 flex flex-col">
              <Calendar
                localizer={localizer}
                events={eventsData}
                startAccessor="startDate"
                endAccessor="endDate"
                titleAccessor="eventName"
                resourceAccessor="eventLocation"
                onSelectEvent={onSelectEvent} // Handle event click
                defaultDate={selectedDate} // Set the date prop to the selected date
                onView={() => setSelectedDate(null)} 
                style={{ height: 500 }}
                min={sevenAM}
                max={elevenPM}
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
