import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Layout } from "./layouts/layout";
import { AuthContextProvider } from "./context/AuthProvider";
// import CategoryList from "./pages/CategoriesListPage";
import EventsListPage from "./pages/EventsListPage";
import { EventPage } from "./pages/EventPage";
import AdminPage from "./pages/AdminPage";
import { ModalContextProvider } from "./context/ModalProvider";
import CategoryList from "./components/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        intent: "capture",
        components: "buttons",
        debug: true, // This will help show any PayPal errors in console
      }}
    >
      <AuthContextProvider>
        <ModalContextProvider>
          <Toaster position="top-right" />
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<CategoryList />} />
                <Route path="/events" element={<EventsListPage />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </ModalContextProvider>
      </AuthContextProvider>
    </PayPalScriptProvider>
  );
}

export default App;
