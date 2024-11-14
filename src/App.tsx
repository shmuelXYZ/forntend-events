import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layouts/layout";
import { AuthProvider } from "./context/AuthContext";
import CategoryList from "./pages/CategoriesListPage";
import EventList from "./pages/EventsListPage";
import { EventPage } from "./pages/EventPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CategoryList />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/event/:id" element={<EventPage />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
