// src/api/api.ts
import axios from "axios";
// axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Set base URL for your local server
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// add the token to the reqwest if exist.
api.interceptors.request.use(
  (cnofig) => {
    const token = localStorage.getItem("token");
    if (token) {
      cnofig.headers["Authorization"] = `Bearer ${token}`;
    }
    return cnofig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    // if res OK return res
    return res;
  },
  (error) => {
    // if unauthrised redirct to login and remove token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise;
  }
);

export default api;
