import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Search, X, Calendar } from "lucide-react";
import { Event } from "../types/eventTypes";

import ticketmasterApi from "../api/ApiEventService";

interface SearchDropDownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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

const SearchDropDown: React.FC<SearchDropDownProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [country, setCountry] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClear = () => {
    setCountry("");
    setStartDate("");
    setEndDate("");
  };

  const handleSearch = async () => {
    // Validate inputs
    if (!country || !startDate || !endDate) {
      toast.error("Please fill in all search fields");
      return;
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
      const response = await ticketmasterApi.get(
        `/events.json?` +
          `apikey=${apiKey}&` +
          `countryCode=${country}&` +
          `startDateTime=${startDate}T00:00:00Z&` +
          `endDateTime=${endDate}T23:59:59Z&` +
          `size=20`
      );

      // Check if we have events
      if (response.data._embedded?.events) {
        const transformedEvents = await response.data._embedded.events.map(
          (apiEvent: any): Event => ({
            id: apiEvent.id,
            name: apiEvent.name,
            venueName: apiEvent._embedded?.venues?.[0]?.name || "Venue TBA",
            location: `${apiEvent._embedded?.venues?.[0]?.city?.name || ""}, ${
              apiEvent._embedded?.venues?.[0]?.country?.name || ""
            }`,
            date: new Date(apiEvent.dates.start.localDate).toLocaleDateString(),
            startTime: apiEvent.dates.start.localTime || "TBA",
            endTime: apiEvent.dates.end?.localTime || "TBA",
            ticketLimit: parseInt(apiEvent.ticketLimit?.info) || 0,
            price: apiEvent.priceRanges
              ? `$${apiEvent.priceRanges[0].min} - $${apiEvent.priceRanges[0].max}`
              : "Price TBA",
            category: apiEvent.classifications?.[0]?.segment?.name || "General",
            status: apiEvent.dates?.status?.code || "Unknown",
            genre: apiEvent.classifications?.[0]?.genre?.name || "Various",
            imageUrl:
              apiEvent.images?.find((img: any) => img.ratio === "16_9")?.url ||
              apiEvent.images?.[0]?.url ||
              "/api/placeholder/400/300",
            performers: apiEvent._embedded?.attractions
              ?.map((attr: any) => attr.name)
              .join(", "),
            description: apiEvent.info || "No description available",
            eventUrl: apiEvent.url,
          })
        );

        navigate("search-events", {
          state: {
            searchParams: { country, startDate, endDate },
            events: transformedEvents,
          },
        });
      } else {
        toast.error("No events found for the selected criteria");
      }
    } catch (error) {
      toast.error("Error searching for events. Please try again.");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
      >
        <Search className="text-white h-6 w-6" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                       w-80 bg-slate-800 rounded-lg shadow-lg border border-slate-700 
                       overflow-hidden z-50"
        >
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-white">Search Events</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Form */}
            <div className="space-y-3">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 text-white rounded-md 
                         border border-slate-700 focus:border-purple-500 focus:ring-1 
                         focus:ring-purple-500 focus:outline-none text-sm"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 text-white rounded-md 
                             border border-slate-700 focus:border-purple-500 focus:ring-1 
                             focus:ring-purple-500 focus:outline-none text-sm"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 text-white rounded-md 
                             border border-slate-700 focus:border-purple-500 focus:ring-1 
                             focus:ring-purple-500 focus:outline-none text-sm"
                    min={startDate}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="flex-1 text-sm h-8 bg-slate-600 border-slate-700 rounded-lg 
                       hover:bg-slate-700 text-white "
              >
                Clear
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex-1 text-sm h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchDropDown;
