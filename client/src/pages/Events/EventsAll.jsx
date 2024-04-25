import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import JobPostCard from "../../components/JobPostCard";
import EventCard from "../../components/EventCard";
const EventsAll = () => {
    const[eventsData,setEventsData] = useState([])

    useEffect(()=>{
          const fetchEventsData = async () => {
              try {
                const response = await fetch("http://localhost:3000/events/index",{
                  credentials:'include'
                });
                const getEventRes = await response.json();
                setEventsData(getEventRes);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
            fetchEventsData()
       },[])
  return (
    <div className="w-9/12 bg-neutral h-screen flex flex-col shadow-xl bg">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
            <div className="pt-5 pr-5 pl-3 ">
                <div className="w-full bg-white h-screen p-5 rounded-xl mb-20 overflow-y-auto">
                    <EventCard eventData={eventsData}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EventsAll