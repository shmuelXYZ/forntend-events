import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
