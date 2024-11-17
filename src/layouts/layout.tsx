import React from "react";
import Navbar from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
