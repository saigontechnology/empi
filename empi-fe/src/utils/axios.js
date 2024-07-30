import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    "ngrok-skip-browser-warning": "true", // Set the header value
  },
});

export default instance;
