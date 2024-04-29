import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DateOnlyConverter from "./DateOnlyConverter";
import TimeConverter from "./TimeConverter";

const EventCard = ({ eventData, filter }) => {
  // Filter events based on the filter value
  const filteredEvents = filter === "upcoming"
    ? eventData.filter(event => new Date(event.startDate) > new Date())
    : eventData.filter(event => new Date(event.startDate) < new Date());

  return (
    <div className="overflow-auto-y w-full bg-white h-fit flex flex-col rounded-xl mb-20 gap-3">
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="bg-neutral h-fit w-full rounded-lg p-3 flex flex-row items-center justify-between"
        >
          <div className="flex flex-col">
            <h1 className="font-semibold">{event.eventName}</h1>
            <div className="mt-2">
              <div className="flex flex-row gap-2">
                <p className="font-normal">Date:</p>
                <span className="font-thin">
                  <DateOnlyConverter isoString={event.startDate} />
                </span>
              </div>

              <div className="flex flex-row gap-1">
                <p className="font-normal">Time:</p>
                <span className="font-thin">
                  <TimeConverter isoString={event.startDate} />
                </span>
                <span className="font-thin"> -</span>
                <span className="font-thin">
                  <TimeConverter isoString={event.endDate} />
                </span>
              </div>

              <div className="flex flex-row gap-1">
                <p className="font-normal">Location:</p>
                <p className="font-thin">{event.eventLocation}</p>
              </div>
            </div>
          </div>

          <Link className="underline" to={`/eventdetails/${event.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
