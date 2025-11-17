import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // ajuste conforme seu backend
});

export default api;
