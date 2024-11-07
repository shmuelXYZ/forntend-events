import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/layout";
import AuthWrapper from "./components/AuthWrapper";
import CategoryList from "./pages/CategoriesListPage";
import EventList from "./pages/EventsListPage";
import { EventPage } from "./pages/EventPage";

function App() {
  return (
    <Router>
      <AuthWrapper />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CategoryList />} />
          <Route path="/events/:category" element={<EventList />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
