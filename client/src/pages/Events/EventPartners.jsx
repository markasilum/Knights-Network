import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import DateConverter from "../../components/DateConverter";
import TimeConverter from "../../components/TimeConverter";

const EventPartners = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const fetchEventPartners = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/partners?id=${eventId}`,{
          credentials:'include'
        }
      );
      const getEventRes = await response.json();
      setEventData(getEventRes);
      // console.log(getEducRes)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEventPartners();
  }, []);

  const handleStatusChange = async (compEventId, status) => {
    // console.log(appId+ " "+status)

    const formData = new FormData();

    formData.append("id", compEventId);
    formData.append("status", status);

    try {
      const response = await fetch("http://localhost:3000/events/set-status", {
        method: "PUT",
        body: formData,
        credentials:'include'
      });

      fetchEventPartners()
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral ">
          <div className="pt-5 pr-5 pl-3">
            <div className="w-full bg-white h-full min-h-80 p-3 rounded-xl mb-20 flex flex-col">
              {/* {eventData.companyEvents?.map((item) => console.log(item))} */}
              {console.log(eventData)}
              <div className="font-semibold text-2xl">
                {eventData.eventName}
              </div>
              <div className="font-normal">{eventData.eventLocation}</div>
              <div className="flex flex-row gap-2">
              <span className="font-thin">
                {<DateConverter isoString={eventData.startDate}/>}
              </span>
              <span>-</span>
              <span className="font-thin">
              {<TimeConverter isoString={eventData.endDate}/>}
              </span>
              </div>


              <div className="w-full h-full flex flex-col">
                <h1 className="h-5 font-normal w-full text-center text-lg mb-3 mt-2">
                  Partner Companies
                </h1>

                <div className="border border-b border-info mt-3"></div>

                <table className="table bg-white rounded-xl mb-3">
                  
                  <tbody>
                    {eventData.companyEvents?.map((companyEventsItem) => (
                      <tr
                        key={companyEventsItem.id}
                        className="p-2  w-full align-center items-center hover"
                      >
                        <td>{companyEventsItem.company.companyName}</td>
                        <td className="flex flex-row justify-end">
                          {companyEventsItem.status == "pending" && (
                            <select
                              className="select select-bordered select-xs w-24 mt-2 max-w-xs font-thin"
                              defaultValue={companyEventsItem.status}
                              onChange={(e) => {
                                handleStatusChange(
                                  companyEventsItem.id,
                                  e.target.value
                                );
                              }}
                            >
                              <option value={companyEventsItem.status}>
                                {companyEventsItem.status}
                              </option>
                              <option value="accepted">accepted</option>
                              <option value="rejected">rejected</option>
                            </select>
                          )}
                          {companyEventsItem.status != "pending" && (
                            <select
                              disabled
                              className="select select-bordered select-xs w-24 mt-2 max-w-xs font-thin "
                              defaultValue={companyEventsItem.status}
                              onChange={(e) => {
                                handleStatusChange(
                                    companyEventsItem.id,
                                  e.target.value
                                );
                              }}
                            >
                              <option value={companyEventsItem.status}>
                                {companyEventsItem.status}
                              </option>
                              {companyEventsItem.status == "accepted" && (
                                <option value="rejected">rejected</option>
                              )}
                              {companyEventsItem.status == "rejected" && (
                                <option value="accepted">accepted</option>
                              )}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPartners;
