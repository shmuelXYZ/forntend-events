import React from "react";
import { EventCardProps } from "../types/eventTypes";

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border rounded shadow p-4 m-2 w-48 h-64">
      <h3 className="font-bold text-lg">{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </div>
  );
};

export default EventCard;
