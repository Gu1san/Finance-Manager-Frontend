import axios from "axios";

const baseURL = import.meta.env?.VITE_API_URL;

if (!baseURL) {
  console.warn("VITE_API_URL não definida, verifique o .env");
}

const api = axios.create({
  baseURL,
});

export default api;
