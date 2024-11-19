import React, { useState } from "react";
import PurchaseModal from "./PurchaseModal";
import { EventCardProps } from "../types/eventTypes";
import { useNavigate } from "react-router-dom";
import { LucideShoppingCart } from "lucide-react";
import { PurchaseButton } from "./PurchaseButton";

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <>
      <a href="#" className="group shadow-2xl rounded-lg ">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg  bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={event.imageUrl}
            alt={event.name}
            onClick={handleClick}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 ml-2 text-sm text-slate-300">{event.name}</h3>
        <p className="mt-4 ml-2 text-sm text-slate-300">{event.venueName}</p>
        <p className="inline mt-1 ml-2 text-lg font-medium text-purple-400">
          {event.price}
        </p>
        <p>
          <PurchaseButton event={event} variant="card" />
        </p>
      </a>
    </>
  );
};

export default EventCard;
