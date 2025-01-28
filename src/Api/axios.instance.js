import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://prerogative-store-server.ayanshukla.repl.co"
});
