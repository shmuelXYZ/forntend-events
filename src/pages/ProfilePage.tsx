import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { CalendarDays } from "lucide-react";
import EventCard from "../components/EventCard";
import "react-calendar/dist/Calendar.css";
import { Event } from "../types/eventTypes";
import { useAuth } from "../context/AuthProvider";
import api from "../api/api";

const ProfilePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log("1", user);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user) return;
        const response = await api.get(`/profile/${user?.id}`);
        console.log("2", user);
        setEvents(response.data.data);
        console.log(events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  const currentDate = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events
    .filter((event) => new Date(event.date) <= currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const defaultMonth =
    upcomingEvents.length > 0 ? new Date(upcomingEvents[0].date) : new Date();

  const getTileClassName = ({ date }) => {
    const dateString = date.toDateString();
    const isUpcomingEvent = upcomingEvents.some(
      (event) => new Date(event.date).toDateString() === dateString
    );
    const isPastEvent = pastEvents.some(
      (event) => new Date(event.date).toDateString() === dateString
    );

    let classes = "rounded-full hover:bg-gray-700 transition-colors";

    if (isUpcomingEvent) {
      classes += " bg-purple-600 text-white";
    } else if (isPastEvent) {
      classes += " bg-gray-700 text-gray-300";
    } else {
      classes += " text-gray-400";
    }

    return classes;
  };

  // Custom styles for react-calendar
  const calendarStyles = {
    ".react-calendar": {
      backgroundColor: "transparent",
      border: "none",
      width: "100%",
      color: "white",
    },
    ".react-calendar__navigation button": {
      color: "white",
      minWidth: "44px",
      background: "transparent",
    },
    ".react-calendar__navigation button:hover": {
      backgroundColor: "#374151",
    },
    ".react-calendar__month-view__weekdays": {
      color: "#9ca3af",
      fontWeight: "normal",
    },
    ".react-calendar__month-view__weekdays abbr": {
      textDecoration: "none",
    },
    ".react-calendar__tile": {
      padding: "0.75rem",
      textAlign: "center",
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events Sections */}
          <div className="lg:col-span-2">
            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
                <CalendarDays className="w-6 h-6 mr-2" />
                Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-300">No upcoming events</p>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
                <CalendarDays className="w-6 h-6 mr-2" />
                Past Events
              </h2>
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-300">No past events</p>
              )}
            </div>
          </div>

          {/* Calendar Section */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <style>
                {Object.entries(calendarStyles)
                  .map(
                    ([selector, styles]) =>
                      `${selector} { ${Object.entries(styles)
                        .map(
                          ([prop, value]) =>
                            `${prop
                              .replace(/([A-Z])/g, "-$1")
                              .toLowerCase()}: ${value};`
                        )
                        .join(" ")} }`
                  )
                  .join("\n")}
              </style>
              <Calendar
                defaultActiveStartDate={defaultMonth}
                tileClassName={getTileClassName}
                className="!bg-transparent !border-0 w-full text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
