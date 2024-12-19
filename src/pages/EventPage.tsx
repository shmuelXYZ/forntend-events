import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PurchaseButton } from "../components/PurchaseButton";
import { MapComponent } from "../components/MapGoogle";
import api from "../api/api";

export const EventPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!state?.event);
  const [event, setEvent] = useState(state?.event);

  // Fallback fetch in case user directly navigates to URL
  useEffect(() => {
    const fetchEventData = async () => {
      if (!event && id) {
        try {
          setIsLoading(true);
          const response = await api.get(`/events/${id}`);
          setEvent(response.data.data);
        } catch (error) {
          console.error("Error fetching event:", error);
          setError("Failed to load event details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEventData();
  }, [id, event]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Event not found</div>
      </div>
    );
  }

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
              {/* Google Maps component */}
              <MapComponent address={event.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
