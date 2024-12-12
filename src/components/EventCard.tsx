// import React, { useState } from "react";
// import { EventCardProps } from "../types/eventTypes";
// import { useNavigate } from "react-router-dom";
// import { PurchaseButton } from "./PurchaseButton";

// const EventCard: React.FC<EventCardProps> = ({ event }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/event/${event.id}`, { state: { event } });
//   };

//   return (
//     <>
//       <a href="#" className="group shadow-2xl rounded-lg ">
//         <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg  bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//           <img
//             src={event.imageUrl}
//             alt={event.name}
//             onClick={handleClick}
//             className="h-full w-full object-cover object-center group-hover:opacity-75"
//           />
//         </div>
//         <h3 className="mt-4 ml-2 text-sm text-slate-300">{event.name}</h3>
//         <p className="mt-4 ml-2 text-sm text-slate-300">{event.venueName}</p>
//         <p className="mt-4 ml-2 text-sm text-slate-300">Date: {event.date}</p>
//         <p className="inline mt-1 ml-2 text-lg font-medium text-purple-400">
//           {event.price}
//         </p>

//         <PurchaseButton event={event} variant="card" />
//       </a>
//     </>
//   );
// };

// export default EventCard;

import React from "react";
import { EventCardProps } from "../types/eventTypes";
import { useNavigate } from "react-router-dom";
import { PurchaseButton } from "./PurchaseButton";
import { ShoppingCart } from "lucide-react";

interface EnhancedEventCardProps extends EventCardProps {
  size?: "small" | "medium" | "large";
  showPurchaseButton?: boolean;
}

const EventCard: React.FC<EnhancedEventCardProps> = ({
  event,
  size = "medium",
  showPurchaseButton = true,
}) => {
  const navigate = useNavigate();

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/event/${event.id}`, { state: { event } });
  };

  const sizeStyles = {
    small: {
      card: "max-w-xs",
      image: "h-40",
      title: "text-sm",
      text: "text-xs",
      price: "text-sm",
    },
    medium: {
      card: "max-w-sm",
      image: "h-48",
      title: "text-sm",
      text: "text-sm",
      price: "text-lg",
    },
    large: {
      card: "max-w-md",
      image: "h-56",
      title: "text-base",
      text: "text-sm",
      price: "text-xl",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={`group relative shadow-2xl rounded-lg bg-gray-800 flex flex-col ${styles.card}`}
    >
      {/* Image section with hover effect */}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
        <img
          src={event.imageUrl}
          alt={event.name}
          onClick={handleImageClick}
          className={`${styles.image}min-h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105 cursor-pointer`}
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className={`${styles.title} text-slate-300 line-clamp-1`}>
            {event.name}
          </h3>
          <p className={`mt-2 ${styles.text} text-slate-300 line-clamp-2`}>
            {event.venueName}
          </p>
          <p className={`mt-2 ${styles.text} text-slate-300`}>
            Date: {event.date}
          </p>
          <p className={`mt-2 ${styles.price} font-medium text-purple-400`}>
            {event.price}
          </p>
        </div>

        {/* Bottom section with purchase button and cart icon */}
        <div className="mt-4 flex justify-between items-center">
          {showPurchaseButton && (
            <div className="flex-grow">
              <PurchaseButton event={event} variant="card" />
            </div>
          )}
          {showPurchaseButton && (
            <div className="ml-2">
              <ShoppingCart
                className="text-purple-400 h-5 w-5 hover:text-purple-300 transition-colors duration-200 cursor-pointer"
                // onClick={() => setIsModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
