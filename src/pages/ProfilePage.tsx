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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user) return;
        const response = await api.get(`/profile/${user?.id}`);
        setEvents(response.data.data);
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
  currentDate.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => new Date(event.date) > currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((event) => new Date(event.date) <= currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Helper function to compare dates without time
  const isSameDay = (first: Date, second: Date) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  };

  const getTileClassName = ({ date, view }) => {
    // Only mark days in month view
    if (view !== "month") return "";

    const tileDate = new Date(date);
    tileDate.setHours(0, 0, 0, 0);

    // Check if this date has an upcoming event
    const hasUpcomingEvent = upcomingEvents.some((event) =>
      isSameDay(new Date(event.date), tileDate)
    );

    // Check if this date has a past event
    const hasPastEvent = pastEvents.some((event) =>
      isSameDay(new Date(event.date), tileDate)
    );

    if (hasUpcomingEvent) {
      return "has-upcoming-event";
    }
    if (hasPastEvent) {
      return "has-past-event";
    }

    return "";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar Section */}
        <div className="mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <Calendar
              value={null}
              defaultActiveStartDate={new Date()}
              tileClassName={getTileClassName}
              className="!bg-transparent !border-0 w-full text-white"
            />
          </div>
        </div>

        {/* Events Sections */}
        <div className="space-y-8">
          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
              <CalendarDays className="w-6 h-6 mr-2" />
              Upcoming Events ({upcomingEvents.length})
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex-none w-72">
                      <EventCard
                        event={event}
                        size="small"
                        showPurchaseButton={false}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-slate-300">No upcoming events</p>
                )}
              </div>
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
              <CalendarDays className="w-6 h-6 mr-2" />
              Past Events ({pastEvents.length})
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {pastEvents.length > 0 ? (
                  pastEvents.map((event) => (
                    <div key={event.id} className="flex-none w-72">
                      <EventCard
                        event={event}
                        size="small"
                        showPurchaseButton={false}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-slate-300">No past events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .react-calendar {
            background-color: transparent;
            border: none;
            width: 100%;
            color: white;
          }

          .react-calendar__navigation button {
            color: white;
            min-width: 44px;
            background: transparent;
          }

          .react-calendar__navigation button:hover {
            background-color: #374151;
          }

          .react-calendar__month-view__weekdays {
            color: #9ca3af;
            font-weight: normal;
          }

          .react-calendar__month-view__weekdays abbr {
            text-decoration: none;
          }

          .react-calendar__tile {
            padding: 0.75rem;
            text-align: center;
            position: relative;
          }

          .react-calendar__tile:enabled:hover {
            background-color: #374151;
          }

          /* Specific styles for event dates */
          .has-upcoming-event {
            background-color: #7C3AED !important;
            color: white !important;
            border-radius: 9999px;
          }

          .has-upcoming-event:hover {
            background-color: #6D28D9 !important;
          }

          .has-past-event {
            background-color: #4B5563 !important;
            color: #D1D5DB !important;
            border-radius: 9999px;
          }

          .has-past-event:hover {
            background-color: #374151 !important;
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
