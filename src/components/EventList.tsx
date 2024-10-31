import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import axios from "axios";
import EventCard from "./EventCard";
import { Event } from "../types/eventTypes";

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Yoga Workshop",
    date: "2024-11-15",
    location: "Community Center",
  },
  {
    id: "2",
    name: "Cooking Class",
    date: "2024-12-01",
    location: "Local Kitchen",
  },
  {
    id: "3",
    name: "Concert Night",
    date: "2024-11-25",
    location: "Downtown Park",
  },
  {
    id: "4",
    name: "Sports Meetup",
    date: "2024-11-30",
    location: "City Stadium",
  },
];

const EventList = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // const fetchEvents = async () => {
    //   try {
    //     const response = await api.get(`/events?category=${category}`);
    //     setEvents(response.data);
    //   } catch (error) {
    //     console.error("Error fetching events:", error);
    //   }
    // };
    const fetchEvents = () => {
      setTimeout(() => {
        // Mimic filtering events by category if needed
        const filteredEvents = mockEvents.filter((event) =>
          event.name.toLowerCase().includes(category?.toLowerCase() || "")
        );
        setEvents(filteredEvents);
      }, 1000);
    };
    fetchEvents();
  }, [category]);

  return (
    <div className="flex flex-wrap justify-center">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
