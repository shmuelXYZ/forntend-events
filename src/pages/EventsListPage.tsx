import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import { Event } from "../types/eventTypes";

const EventList = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);

  // useEffect(() => {
  // const fetchEvents = async () => {
  //   try {
  //     const response = await api.get(`/events?category=${category}`);
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // fetchEvents()
  // ,[]};
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/all_events.json");
        console.log(res);
        if (!res.ok) {
          throw new Error("bad conection");
        }
        const jsonRes = await res.json();
        console.log(jsonRes.Sports.length);
        const allEvents: Event[] = Object.values(jsonRes).flat();
        const filteredEvents: Event[] = allEvents.filter(
          (event) =>
            event.category
              .toLowerCase()
              .includes(category?.toLowerCase() || "") ||
            event.genre.toLowerCase().includes(category?.toLowerCase() || "")
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
