import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import InputFields from "../../components/InputFields";
import TextAreaInput from "../../components/TextAreaInput";
import DateTime from "react-datetime";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SidebarAdmin from "../../components/SidebarAdmin";
import EventEdit from "./EventEdit";
import DateToWords from "../../components/DateFormatter";
import DateConverter from "../../components/DateConverter";
import { RoleContext } from "../../App";

const EventDetail = () => {
  const [eventData, setEventData] = useState("");
  const [date, setDate] = useState(new Date(eventData.eventDateTime));
  const [date2, setDate2] = useState("");

  const{role} = useContext(RoleContext)
  const { eventId } = useParams();

  useEffect(() => {
   
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/events/details?id=${eventId}`
        );
        const getEventRes = await response.json();
        setDate(getEventRes.eventDateTime)
        setEventData(getEventRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventDetails();
    // setDate2(date.getFullYear())
  }, []);
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
       <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-auto">
            <div className="w-full bg-white h-fit min-h-80 p-5 rounded-xl mb-20 flex flex-col">
                <div className="w-full flex flex-row justify-between">
                <div className="font-semibold text-2xl">{eventData.eventName}</div>
                {role.roleName=="admin"&&(
                    <button className='font-thin underline' onClick={()=>document.getElementById(eventData.id).showModal()}>Edit</button>
                )}
                </div>
                {/* {console.log(eventData)} */}
                {eventData &&(
                  <EventEdit eventData={eventData}/>
                ) }

                
                <div className="font-thin flex flex-col mt-3">
                <p className="font-semibold">Event Details</p>
                <ul className="ml-6">
                  {eventData.eventDesc &&
                    eventData.eventDesc
                      .split("\r\n")
                      .map((line, index) => <li key={index} className="mt-2">{line}</li>)}
                </ul>
              </div>

              <div className="mt-5">
                <p className="font-semibold">Event Location</p>
                <p className="font-thin">{eventData.eventLocation}</p>
              </div>

              <div className="mt-5">
                <p className="font-semibold">Event Time</p>
                <span className="font-thin">{<DateConverter isoString={eventData.eventDateTime}/>}</span>
              </div>
               


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
