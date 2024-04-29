import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import JobPostCard from "../../components/JobPostCard";
import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";
const EventsAll = () => {
  const [eventsData, setEventsData] = useState([]);
  const [eventFilter, setEventFilter] = useState("upcoming");

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/events/index", {
          credentials: "include",
        });
        const getEventRes = await response.json();
        setEventsData(getEventRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEventsData();
  }, []);
  return (
    <div className="w-9/12 bg-neutral h-screen flex flex-col shadow-xl bg">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
        <div className="w-full bg-white h-screen p-5 pt-0 overflow-y-auto">
                <div className="pt-3 pb-3 flex flex-row gap-2">
              <button
                value={"upcoming"}
                className={`hover:text-accent ${eventFilter === 'upcoming' ? 'text-accent'  : ''} active:text-info`}
                onClick={(e) => setEventFilter(e.target.value)}
              >
                Upcoming
              </button>
              <button
                value={"past"}
                className={`hover:text-accent ${eventFilter === 'past' ? 'text-accent' : ''} active:text-info`}
                onClick={(e) => setEventFilter(e.target.value)}
              >
                Past Events
              </button>
              {/* <div className="font-thin"><Link to={'/home'} className="underline decoration-1	text-accent font-semibold">Upcoming</Link></div> */}
              {/* <div className="font-thin"><Link to={'/home/recommendation'} className="underline decoration-1	font-semibold">Past Events</Link></div> */}
            </div>
              <EventCard eventData={eventsData} filter={eventFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAll;
