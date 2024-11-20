import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layouts/layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import CategoryList from "./pages/CategoriesListPage";
import EventsListPage from "./pages/EventsListPage";
import { EventPage } from "./pages/EventPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginModalProvider } from "./context/LoginModalContext";

function App() {
  return (
    <AuthProvider>
      <LoginModalProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              {/* <Route path="/register" element={<RegisterPage />} /> */}
              <Route path="/" element={<CategoryList />} />
              <Route path="/events" element={<EventsListPage />} />
              <Route path="/event/:id" element={<EventPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Route>
          </Routes>
        </Router>
      </LoginModalProvider>
    </AuthProvider>
  );
}

export default App;
