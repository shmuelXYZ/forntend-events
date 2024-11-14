import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import { Event } from "../types/eventTypes";
import api from "../api/api";

const EventList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasmore] = useState(true);

  // Reset pagination when category changes
  useEffect(() => {
    setPage(0);
    setHasmore(true);
  }, [category]);

  // fetch the data and send page number.
  // triger when the user 100px from the buttom of page.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/events?category=${category}&?page=${page}`
        );
        console.log(category);
        const newEvents = response.data.data;
        if (page === 0) {
          setEvents(response.data.data);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        }
        setHasmore(newEvents.length === 5);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="bg-slate-600">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="sr-only">Products</h2> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {!hasMore && <p>no more events</p>}
        </div>
      </div>
    </div>
  );
};

export default EventList;
