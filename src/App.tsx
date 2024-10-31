import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/layout";
import AuthWrapper from "./components/AuthWrapper";
import CategoryList from "./components/CategoryList";
import EventList from "./components/EventList";

function App() {
  return (
    <Router>
      <AuthWrapper />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CategoryList />} />
          <Route path="/events/:category" element={<EventList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
