import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Route path="/events/:category" element={<EventList />} />
            <Route path="/event/:id" element={<EventPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
