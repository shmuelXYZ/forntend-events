import React, { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(`userMenu: ${user?.firstName} ${user?.role}`);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-white hover:text-purple-400 focus:outline-none"
      >
        <User className="h-5 w-5" />
        <span className="font-medium">{`Welcome ${user?.firstName}`}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-900 rounded-lg shadow-xl border border-slate-800">
          <button
            onClick={() => {
              navigate(user?.role === "admin" ? "/admin" : "/"),
                setIsMenuOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-slate-800"
          >
            <User className="h-4 w-4 mr-2" />
            {user?.role === "user" || user?.role === "producer"
              ? "Profile"
              : "Admin Dashboard"}
          </button>
          <button
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
