import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Layout } from "./layouts/layout";
import { AuthProvider } from "./context/AuthContext";
// import CategoryList from "./pages/CategoriesListPage";
import EventsListPage from "./pages/EventsListPage";
import { EventPage } from "./pages/EventPage";
import AdminPage from "./pages/AdminPage";
import { LoginModalProvider } from "./context/LoginModalContext";
import CategoryList from "./components/Home";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >
      <AuthProvider>
        <LoginModalProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
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
    </PayPalScriptProvider>
  );
}

export default App;
