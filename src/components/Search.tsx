import React from "react";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="justify-self-center border-white rounded-md my-1 bg-slate-600 focus:outline-none"
      type="text"
      placeholder="Search Events..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
