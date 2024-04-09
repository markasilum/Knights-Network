import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateToWords from "./DateFormatter";
const EventCard = ({ eventData }) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit flex flex-col rounded-xl mb-20 gap-3">
      {eventData.map((event) => (
        <div
          key={event.id}
          className="bg-neutral h-fit w-full rounded-lg p-3 flex flex-row items-center justify-between"
        >
          <div className="flex flex-col">
            <h1 className="font-semibold">{event.eventName}</h1>
            <h2 className="font-normal">{event.eventLocation}</h2>
            <span className="font-thin">
              {<DateToWords dateString={event.eventDateTime} />}
            </span>
          </div>

          <Link className="underline" to={`/eventdetails/${event.id}`}>
            View Details
          </Link>
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default EventCard;
