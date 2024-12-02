// src/api/api.ts
import axios from "axios";
// axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/", // Set base URL for your local server
  withCredentials: true, // Enable cookies to be sent with requests
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export default api;
