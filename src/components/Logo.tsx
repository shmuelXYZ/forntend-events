import React from "react";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src="src/assets/logo.webp" className="h-8 me-3" alt="Logo" />
      <span className="text-2xl font-semibold dark:text-white">Tickets</span>
    </div>
  );
};
