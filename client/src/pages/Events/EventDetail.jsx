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
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSuccess from "../../components/ButtonSuccess";
import { useAuthContext } from "../../hooks/useAuthContext";
import DateOnlyConverter from "../../components/DateOnlyConverter";
import TimeConverter from "../../components/TimeConverter";

const EventDetail = () => {
  const [eventData, setEventData] = useState("");
  const [startDate, setStartDate] = useState(new Date(eventData.startDate));
  const [endDate, setEndDate] = useState(new Date(eventData.endDate));
  const [joined, setJoined] = useState([]);
  const [partners, setPartners] = useState([]);

  const { user } = useAuthContext();
  const role = user.user.role;
  const { eventId } = useParams();

  const checkIfJoined = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/check?id=${eventId}`,
        {
          credentials: "include",
        }
      );
      const getApplicationData = await response.json();
      setJoined(getApplicationData);
      // console.log(getApplicationData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEventPartners = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/partners?id=${eventId}`,
        {
          credentials: "include",
        }
      );
      const getEventRes = await response.json();
      setPartners(getEventRes);
      // console.log(getEducRes)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/events/details?id=${eventId}`,
          {
            credentials: "include",
          }
        );
        const getEventRes = await response.json();
        setStartDate(getEventRes.startDate);
        setEndDate(getEventRes.endDate);
        setEventData(getEventRes);
        // console.log(getEducRes)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventDetails();
    fetchEventPartners();
    checkIfJoined();
  }, []);

  const handleJoinEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/events/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: eventId }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      } else {
        console.log("Event Joined");
        fetchEventPartners();
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3 overflow-auto">
            <div className="w-full bg-white h-fit min-h-80 p-5 rounded-xl mb-20 flex flex-col">
              <div className="w-full flex flex-row justify-between">
                <div className="font-semibold text-2xl">
                  {eventData.eventName}
                </div>
                {role.roleName == "admin" && (
                  <button
                    className="font-thin underline"
                    onClick={() =>
                      document.getElementById(eventData.id).showModal()
                    }
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="mt-2">
                <div className="flex flex-row gap-2">
                  <p className="font-normal">Date:</p>
                  <span className="font-thin">
                    {<DateOnlyConverter isoString={eventData.startDate} />}
                  </span>
                </div>

                <div className="flex flex-row gap-1">
                  <p className="font-normal">Time:</p>
                  <span className="font-thin">
                    {" "}
                    {<TimeConverter isoString={eventData.startDate} />}
                  </span>
                  <span className="font-thin"> -</span>
                  <span className="font-thin">
                    {" "}
                    {<TimeConverter isoString={eventData.endDate} />}
                  </span>
                </div>

                <div className="flex flex-row gap-1">
                  <p className="font-normal">Location:</p>
                  <p className="font-thin">{eventData.eventLocation}</p>
                </div>
              </div>
              {/* {console.log(eventData)} */}
              {eventData && <EventEdit eventData={eventData} />}

              <div className="font-thin flex flex-col mt-3">
                <p className="font-normal">Details</p>
                <ul className="ml-6">
                  {eventData.eventDesc &&
                    eventData.eventDesc.split("\r\n").map((line, index) => (
                      <li key={index} className="mt-2">
                        {line}
                      </li>
                    ))}
                </ul>
              </div>

              

              {partners &&
                partners.companyEvents &&
                partners.companyEvents.length != 0 && (
                  <p className="font-normal mt-3">Partner Companies</p>
                )}
              <ul className="list-disc ml-5 font-thin">
                {partners &&
                  partners.companyEvents &&
                  partners.companyEvents.map((item) => (
                    <li key={item.id}>{item.company.companyName}</li>
                  
                  ))}
              </ul>

              {role.roleName === "company" && joined.length == 0 && (
                <div className="w-full flex justify-end">
                  <ButtonPrimary onClick={handleJoinEvent} text={"Join"} />
                </div>
              )}

              {joined.length != 0 && role.roleName === "company" && (
                <div className="w-full flex justify-end">
                  <ButtonSuccess text={"Pending"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
