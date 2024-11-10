import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
