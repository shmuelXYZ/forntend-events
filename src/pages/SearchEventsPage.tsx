import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import EventCard from "../components/EventCard";
import { Event } from "../types/eventTypes";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
];

export const SearchEvents = () => {
  const location = useLocation();
  const { searchParams, events } = location.state || {};
  const carouselRef = useRef<HTMLDivElement>(null);

  // Header animations
  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Carousel drag configuration
  const { scrollX } = useScroll({
    container: carouselRef,
  });

  // Smooth scroll spring
  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const smoothScrollX = useSpring(scrollX, springConfig);

  return (
    <div className="min-h-screen bg-slate-950 pt-16 pb-24 overflow-hidden">
      {/* Animated Header */}
      <motion.div
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Events in{" "}
          {COUNTRIES.find((c) => c.code === searchParams?.country)?.name}
        </h1>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="h-5 w-5" />
          <span>
            {new Date(searchParams?.startDate).toLocaleDateString()} -
            {new Date(searchParams?.endDate).toLocaleDateString()}
          </span>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <motion.div
          ref={carouselRef}
          className="flex gap-8 px-[calc(50vw-180px)] overflow-x-auto no-scrollbar"
          drag="x"
          dragConstraints={{
            left: -(events.length * 360), // adjust based on card width
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Duplicate events for infinite scroll effect */}
          {[...events, ...events, ...events].map((event, index) => (
            <motion.div
              key={`${event.id}-${index}`}
              className="w-[320px] shrink-0"
              style={{
                scale: useTransform(
                  smoothScrollX,
                  [(index - 1) * 360, index * 360, (index + 1) * 360],
                  [0.9, 1.1, 0.9]
                ),
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile friendly grid view */}
      <div className="mt-16 px-6 md:hidden">
        <div className="grid grid-cols-1 gap-6">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS
const globalStyles = `
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
`;
