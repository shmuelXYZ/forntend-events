import React from "react";
import { EventCardProps } from "../types/eventTypes";
import { useNavigate } from "react-router-dom";
import { LucideShoppingCart } from "lucide-react";

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
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
      <div className="">
        <button
          className="relative inline-flex items-center justify-center overflow-hidden 
                     rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 
                     font-medium text-gray-900 hover:text-white focus:outline-none 
                     focus:ring-2 focus:ring-purple-200 dark:text-white 
                     dark:focus:ring-purple-800"
        >
          <span
            className="relative rounded-md bg-white px-4 py-2 transition-all 
                          duration-75 ease-in dark:bg-gray-900 group-hover:bg-opacity-0"
          >
            Take It
          </span>
          <span>
            <LucideShoppingCart className="text-purple-200" />
          </span>
        </button>
      </div>
    </a>
  );
};

export default EventCard;
