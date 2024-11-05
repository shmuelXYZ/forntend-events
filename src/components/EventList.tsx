import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import { Event } from "../types/eventTypes";

const mockEvents: Event[] = [
  {
    id: "G5dIZb8kECzK3",
    name: "San Antonio Spurs vs Phoenix Suns",
    venueName: "Moody Center ATX",
    location: "2001 Robert Dedman Drive, Austin",
    date: "2025-02-20",
    startTime: "20:30:00",
    endTime: "2025-02-21T03:30:00Z",
    ticketLimit: 1364,
    price: "102 - 2371 USD",
    category: "Sports",
    genre: "Basketball",
    imageUrl:
      "https://s1.ticketm.net/dam/a/455/612b13a2-822a-4cda-9920-098692170455_TABLET_LANDSCAPE_16_9.jpg",
    status: "onsale",
    performers: "San Antonio Spurs, Phoenix Suns",
    description: "No description available",
    eventUrl:
      "https://www.ticketmaster.com/san-antonio-spurs-vs-phoenix-suns-austin-texas-02-20-2025/event/3A006101A73B84D2",
  },
  {
    id: "vvG1YZb8D7odpz",
    name: "NBA Cup: Oklahoma City Thunder v Phoenix Suns",
    venueName: "Paycom Center",
    location: "100 West Reno, Oklahoma City",
    date: "2024-11-15",
    startTime: "19:00:00",
    endTime: "2024-11-16T02:00:00Z",
    ticketLimit: 1780,
    price: "58 - 1893 USD",
    category: "Sports",
    genre: "Basketball",
    imageUrl:
      "https://s1.ticketm.net/dam/a/5c2/4fa5fa3d-dd6e-426a-a689-dfd2a7b765c2_EVENT_DETAIL_PAGE_16_9.jpg",
    status: "onsale",
    performers: "Oklahoma City Thunder, Phoenix Suns, Emirates NBA Cup",
    description:
      "Tickets for the 2024-25 season through the December 31, 2024, game will be available directly from the team starting Thursday, September 19 at 10 a.m. Can't wait to purchase tickets? You can purchase tickets from other fans and prices are determined by the seller and not the team. A 20% service fee for all resale tickets will be added to the cost of each ticket at checkout. Full contactless mobile ticketing has been implemented for guests to use self-serve ticket scanners at all arena entrances. Mobile tickets for Thunder games can be seamlessly accessed or transferred via the Ticketmaster app. Children 3 years and older require a ticket.",
    eventUrl:
      "https://www.ticketmaster.com/nba-cup-oklahoma-city-thunder-v-oklahoma-city-oklahoma-11-15-2024/event/0C00610EC44435B8",
  },
  {
    id: "1A_Zk7FGkdNuKhG",
    name: "Phoenix Suns vs. Portland Trail Blazers",
    venueName: "Footprint Center",
    location: "201 East Jefferson Street, Phoenix",
    date: "2024-11-02",
    startTime: "19:00:00",
    endTime: "2024-11-03T04:00:00Z",
    ticketLimit: 2327,
    price: "27 - 3300 USD",
    category: "Sports",
    genre: "Basketball",
    imageUrl:
      "https://s1.ticketm.net/dam/a/c62/0636ff21-e369-4b8c-bee4-214ea0a81c62_1339761_CUSTOM.jpg",
    status: "onsale",
    performers: "Phoenix Suns, Portland Trail Blazers",
    description:
      "Footprint Center is now a cashless environment. Please plan on using Visa, Mastercard, American Express or Discover during your visit. Don't have a credit/debit card? Convert cash into a preloaded Mastercard by visiting one of our reverse ATMs located near the Ticket Office or Section 218! When you purchase a ticket to a Footprint Center event, you can ride the Valley Metro Light Rail at no cost for four (4) hours prior to the event through the end of the transit day. With an increased focus on secure, contactless entry, mobile tickets will be required. All tickets will be delivered electronically with no exceptions, therefore will call is no longer available. All tickets are available via the Ticketmaster app or the Suns-Mercury-Footprint Center app. Standard ticket limit is six (6). Presales and first day of general on sale ticket limit is four (4). To purchase more tickets, please call 602.379.SUNS to find out about group tickets.",
    eventUrl:
      "https://www.ticketmaster.com/phoenix-suns-vs-portland-trail-blazers-phoenix-arizona-11-02-2024/event/19006108E33536CC",
  },
];

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
  // };
  //

  // useEffect(() => {
  //   const fetchEvents = () => {
  //     setTimeout(() => {
  //       // Mimic filtering events by category if needed
  //       const filteredEvents = mockEvents.filter((event) =>
  //         event.category.toLowerCase().includes(category?.toLowerCase() || "")
  //       );
  //       setEvents(filteredEvents);
  //     }, 1000);
  //   };
  //   fetchEvents();
  // }, [category]);

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
        const allEvents = Object.values(jsonRes).flat();
        const filteredEvents = allEvents.filter(
          (event: Event) =>
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
