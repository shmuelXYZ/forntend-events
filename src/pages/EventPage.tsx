import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { PurchaseButton } from "../components/PurchaseButton";

// import React from 'react'

export const EventPage = () => {
  const { state } = useLocation();

  const [event, setEvent] = useState(state?.event);

  // Fallback fetch in case user directly navigates to URL
  //   useEffect(() => {
  //     if (!event) {
  //       // Fetch event data using id
  //       fetchEventData(id);
  //     }
  //   }, [id, event]);

  //   const fetchEventData = async (eventId) => {
  //     try {
  //       // Replace with your actual API call
  //       const response = await api(`/events/${eventId}`);
  //       // const data = await response.json();
  //       setEvent(response);
  //     } catch (error) {
  //       console.error("Error fetching event:", error);
  //     }
  //   };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 mb-4">{event.date}</p>

        {/* Event Image */}
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full rounded-lg mb-6 max-h-96 object-cover"
          />
        )}

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <p className="mb-4">{event.description}</p>

            <div className="space-y-2">
              <p>
                <strong>Category:</strong> {event.category}
              </p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong> {event.startTime}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
            </div>
            <PurchaseButton event={event} variant="page" />
          </div>

          {/* Google Maps Integration */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="h-64 bg-gray-100 rounded-lg">
              {/* Add your Google Maps component here */}
              {/* Example: <GoogleMap address={event.address} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
