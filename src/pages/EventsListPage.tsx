import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import { Event } from "../types/eventTypes";
import api from "../api/api";

const EventsListPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasmore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
          `/events?category=${category}&page=${page}`
        );
        console.log(category);
        const newEvents = response.data.data;
        if (page === 0) {
          setEvents(response.data.data);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        }
        setHasmore(newEvents.length === 8);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, page]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (hasMore) {
          console.log("loading ...", hasMore);
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div
      ref={containerRef}
      style={{ height: "calc(100vh - 160px)" }}
      className="bg-slate-600 overflow-y-auto"
    >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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

export default EventsListPage;
