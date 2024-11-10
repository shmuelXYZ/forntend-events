import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="relative max-xl:hidden">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        className="pl-10 pr-4 py-2 w-64 bg-slate-800 text-white rounded-lg 
                   border border-slate-700 focus:border-purple-500 focus:ring-1 
                   focus:ring-purple-500 focus:outline-none placeholder:text-gray-400"
        type="text"
        placeholder="Search Events..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
    </div>
  );
};

export default Search;
