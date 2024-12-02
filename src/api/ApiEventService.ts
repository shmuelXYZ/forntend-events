import axios from "axios";
const ticketmasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2",
  timeout: 5000,
});

export default ticketmasterApi;
